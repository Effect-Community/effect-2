import * as fs from "fs"
import * as path from "path"
import * as ts from "typescript"

function normalize(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path) // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path
  }

  return path.replace(/\\/g, "/")
}

export default function bundle(
  _program: ts.Program,
  _opts: {
    modules?: [{ src: string; module: string }]
  } = {}
) {
  const checker = _program.getTypeChecker()

  const root = path.join(_program.getCompilerOptions().configFilePath!.toString(), "..")

  const moduleMaps =
    _opts.modules?.map(({ module, src }) => ({
      module,
      base: path.join(root, src)
    })) || []

  return {
    before(ctx: ts.TransformationContext) {
      const factory = ctx.factory

      return (sourceFile: ts.SourceFile) => {
        const matchingModules = moduleMaps.filter(({ base }) =>
          sourceFile.fileName.startsWith(base)
        )

        const relativeTo =
          matchingModules.length > 0
            ? path.join(
                matchingModules[matchingModules.length - 1].module,
                sourceFile.fileName.slice(
                  matchingModules[matchingModules.length - 1].base.length
                ),
                ".."
              )
            : undefined

        if (!relativeTo) {
          throw new Error(`module config not found`)
        }

        const fileParts = sourceFile.fileName.split("/")
        const fileName = fileParts[fileParts.length - 1].replace(/\.(ts|tsx)$/, "")
        const localModule =
          fileName === "index" ? relativeTo : `${relativeTo}/${fileName}`

        const exported: Map<string, ts.Identifier> = getExported(
          sourceFile,
          `"${localModule}"`,
          factory
        )

        const modules: Map<string, ts.Identifier> = new Map()

        const filePathId = factory.createUniqueName("__ets_file_name")

        let shouldAddTraceVar = false

        function getTrace(node: ts.Node) {
          shouldAddTraceVar = true
          const nodeEnd = sourceFile.getLineAndCharacterOfPosition(node.getEnd())
          return factory.createBinaryExpression(
            filePathId,
            ts.SyntaxKind.PlusToken,
            factory.createStringLiteral(`:${nodeEnd.line + 1}:${nodeEnd.character + 1}`)
          )
        }

        function processNode(inTracingRegion: boolean) {
          return function (node: ts.Node): ts.Node {
            if (
              ts.isFunctionExpression(node) ||
              ts.isVariableStatement(node) ||
              ts.isFunctionDeclaration(node)
            ) {
              if (
                ts.getAllJSDocTags(
                  node,
                  (_): _ is ts.JSDocTag =>
                    _.tagName.escapedText === "ets_trace" && _.comment === "off"
                ).length > 0
              ) {
                return ts.visitEachChild(node, processNode(false), ctx)
              }
            }
            if (ts.isCallExpression(node) && inTracingRegion) {
              const sig = checker.getResolvedSignature(node)
              const tags = sig?.getJsDocTags() || []

              let ets_prepend_trace = false

              tags.forEach((tag) => {
                if (tag.name === "ets_prepend_trace") {
                  ets_prepend_trace = true
                }
              })

              if (ets_prepend_trace) {
                node = factory.updateCallExpression(
                  node,
                  node.expression,
                  [],
                  [getTrace(node.expression), ...node.arguments]
                )
              } else if (
                sig &&
                node.arguments.length === sig.parameters.length - 1 &&
                sig.parameters[sig.parameters.length - 1].name === "__ets_trace"
              ) {
                node = factory.updateCallExpression(
                  node,
                  node.expression,
                  [],
                  [...node.arguments, getTrace(node.expression)]
                )
              }
            }

            if (
              ts.isCallExpression(node) &&
              ts.isCallExpression(node.expression) &&
              node.arguments.length === 1
            ) {
              const tags =
                checker.getResolvedSignature(node.expression)?.getJsDocTags() || []

              let ets_static: string | undefined
              let ets_unpipe: string | undefined

              tags.forEach((tag) => {
                if (tag.name === "ets_static" && tag.text) {
                  ets_static = tag.text.map((_) => _.text).join(" ")
                }
                if (tag.name === "ets_unpipe" && tag.text) {
                  ets_unpipe = tag.text.map((_) => _.text).join(" ")
                }
              })

              if (ets_static && ets_unpipe && !ets_unpipe.includes(" from ")) {
                const [, , module] = ets_static.match(/^(.*?) from "(.*?)"$/)!

                ets_unpipe = `${ets_unpipe} from "${module}"`
              }

              if (ets_unpipe) {
                const sig = checker.getResolvedSignature(node.expression)
                let expr = node.expression

                if (
                  sig &&
                  inTracingRegion &&
                  expr.arguments.length === sig.parameters.length - 1 &&
                  sig.parameters[sig.parameters.length - 1].name === "__ets_trace"
                ) {
                  expr = factory.updateCallExpression(
                    expr,
                    expr.expression,
                    [],
                    [...expr.arguments, getTrace(expr.expression)]
                  )
                }

                if (exported.has(ets_unpipe)) {
                  const method = exported.get(ets_unpipe)!

                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        method,
                        factory.createIdentifier("call")
                      ),
                      [],
                      [...node.arguments, ...expr.arguments]
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                } else {
                  const [, fn, module] = ets_unpipe.match(/^(.*?) from "(.*?)"$/)!
                  let id: ts.Identifier
                  if (modules.has(module)) {
                    id = modules.get(module)!
                  } else {
                    id = factory.createUniqueName("module")
                    modules.set(module, id)
                  }
                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createPropertyAccessExpression(id, fn),
                        factory.createIdentifier("call")
                      ),
                      [],
                      [...node.arguments, ...expr.arguments]
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                }
              }
            }

            if (
              ts.isCallExpression(node) &&
              (ts.isPropertyAccessExpression(node.expression) ||
                ts.isElementAccessExpression(node.expression))
            ) {
              const tags = checker.getResolvedSignature(node)?.getJsDocTags() || []
              let ets_method: string | undefined

              tags.forEach((tag) => {
                if (tag.name === "ets_method" && tag.text) {
                  ets_method = tag.text.map((_) => _.text).join(" ")
                }
              })

              if (ets_method === "pipe") {
                return ts.visitNode(
                  node.arguments.reduce(
                    (x, f) => factory.createCallExpression(f, [], [x]),
                    node.expression.expression
                  ),
                  processNode(inTracingRegion)
                )
              }

              if (ets_method) {
                if (exported.has(ets_method)) {
                  const method = exported.get(ets_method)!

                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        method,
                        factory.createIdentifier("call")
                      ),
                      [],
                      [node.expression.expression, ...node.arguments]
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                } else {
                  const [, fn, module] = ets_method.match(/^(.*?) from "(.*?)"$/)!
                  let id: ts.Identifier
                  if (modules.has(module)) {
                    id = modules.get(module)!
                  } else {
                    id = factory.createUniqueName("module")
                    modules.set(module, id)
                  }
                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createPropertyAccessExpression(id, fn),
                        factory.createIdentifier("call")
                      ),
                      [],
                      [node.expression.expression, ...node.arguments]
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                }
              }
            }

            if (ts.isBlock(node)) {
              return ts.visitEachChild(
                factory.updateBlock(
                  node,
                  node.statements.filter((statement) => {
                    if (
                      ts.isExpressionStatement(statement) &&
                      ts.isCallExpression(statement.expression)
                    ) {
                      const tags =
                        checker
                          .getResolvedSignature(statement.expression)
                          ?.getJsDocTags() || []

                      let ets_optimize: string | undefined

                      tags.forEach((tag) => {
                        if (tag.name === "ets_optimize" && tag.text) {
                          ets_optimize = tag.text.map((_) => _.text).join(" ")
                        }
                      })

                      if (ets_optimize && ets_optimize === "remove") {
                        return false
                      }
                    }
                    return true
                  })
                ),
                processNode(inTracingRegion),
                ctx
              )
            }

            if (ts.isCallExpression(node)) {
              const tags = checker.getResolvedSignature(node)?.getJsDocTags() || []
              let ets_static: string | undefined
              let ets_optimize: string | undefined

              tags.forEach((tag) => {
                if (tag.name === "ets_static" && tag.text) {
                  ets_static = tag.text.map((_) => _.text).join(" ")
                }
                if (tag.name === "ets_optimize" && tag.text) {
                  ets_optimize = tag.text.map((_) => _.text).join(" ")
                }
              })

              if (ets_optimize === "identity") {
                const created = ts.visitNode(
                  node.arguments[0],
                  processNode(inTracingRegion)
                )

                if (ts.isCallExpression(created)) {
                  return factory.updateCallExpression(
                    node,
                    created.expression,
                    created.typeArguments,
                    created.arguments
                  )
                }

                return created
              }

              if (ets_optimize === "pipe") {
                const created = ts.visitNode(
                  node.arguments.reduce((x, f) =>
                    factory.createCallExpression(f, [], [x])
                  ),
                  processNode(inTracingRegion)
                )

                if (ts.isCallExpression(created)) {
                  return factory.updateCallExpression(
                    node,
                    created.expression,
                    created.typeArguments,
                    created.arguments
                  )
                }

                return created
              }

              if (ets_static) {
                if (exported.has(ets_static)) {
                  const method = exported.get(ets_static)!

                  return ts.visitEachChild(
                    factory.updateCallExpression(node, method, [], node.arguments),
                    processNode(inTracingRegion),
                    ctx
                  )
                } else {
                  const [, fn, module] = ets_static.match(/^(.*?) from "(.*?)"$/)!
                  let id: ts.Identifier
                  if (modules.has(module)) {
                    id = modules.get(module)!
                  } else {
                    id = factory.createUniqueName("module")
                    modules.set(module, id)
                  }
                  return ts.visitEachChild(
                    factory.updateCallExpression(
                      node,
                      factory.createPropertyAccessExpression(id, fn),
                      [],
                      node.arguments
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                }
              }
            }

            if (ts.isCallExpression(node)) {
              const tags =
                checker.getSymbolAtLocation(node.expression)?.getJsDocTags() || []

              let ets_static: string | undefined
              let ets_unpipe: string | undefined

              tags.forEach((tag) => {
                if (tag.name === "ets_static" && tag.text) {
                  ets_static = tag.text.map((_) => _.text).join(" ")
                }
                if (tag.name === "ets_unpipe" && tag.text) {
                  ets_unpipe = tag.text.map((_) => _.text).join(" ")
                }
              })

              if (ets_static && ets_unpipe && !ets_unpipe.includes(" from ")) {
                const [, , module] = ets_static.match(/^(.*?) from "(.*?)"$/)!

                ets_unpipe = `${ets_unpipe} from "${module}"`
              }

              if (ets_unpipe) {
                if (exported.has(ets_unpipe)) {
                  const method = exported.get(ets_unpipe)!

                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        method,
                        factory.createIdentifier("call")
                      ),
                      [],
                      node.arguments
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                } else {
                  const [, fn, module] = ets_unpipe.match(/^(.*?) from "(.*?)"$/)!
                  let id: ts.Identifier
                  if (modules.has(module)) {
                    id = modules.get(module)!
                  } else {
                    id = factory.createUniqueName("module")
                    modules.set(module, id)
                  }
                  return ts.visitEachChild(
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        factory.createPropertyAccessExpression(id, fn),
                        factory.createIdentifier("call")
                      ),
                      [],
                      node.arguments
                    ),
                    processNode(inTracingRegion),
                    ctx
                  )
                }
              }
            }

            if (
              ts.isPropertyAccessExpression(node) ||
              ts.isElementAccessExpression(node)
            ) {
              const tags =
                checker
                  .getSymbolAtLocation(
                    ts.isPropertyAccessExpression(node) ? node : node.argumentExpression
                  )
                  ?.getJsDocTags() || []

              let ets_static: string | undefined

              tags.forEach((tag) => {
                if (tag.name === "ets_static" && tag.text) {
                  ets_static = tag.text.map((_) => _.text).join(" ")
                }
              })

              if (
                ets_static &&
                !(
                  ts.isBinaryExpression(node.parent) &&
                  node.parent.left === node &&
                  node.parent.operatorToken.getText() === "="
                )
              ) {
                if (exported.has(ets_static)) {
                  const method = exported.get(ets_static)!

                  return method
                } else {
                  const [, fn, module] = ets_static.match(/^(.*?) from "(.*?)"$/)!
                  let id: ts.Identifier
                  if (modules.has(module)) {
                    id = modules.get(module)!
                  } else {
                    id = factory.createUniqueName("module")
                    modules.set(module, id)
                  }
                  return ts.visitEachChild(
                    factory.createPropertyAccessExpression(id, fn),
                    processNode(inTracingRegion),
                    ctx
                  )
                }
              }
            }

            return ts.visitEachChild(node, processNode(inTracingRegion), ctx)
          }
        }

        let processed = ts.visitNode(sourceFile, processNode(true))

        const imports: ts.ImportDeclaration[] = []

        modules.forEach((id, mod) => {
          let localPath = mod
          if (mod.startsWith(matchingModules[matchingModules.length - 1].module)) {
            const modulePath = `${
              matchingModules[matchingModules.length - 1].base
            }${mod.substr(matchingModules[matchingModules.length - 1].module.length)}`

            const filePath = `${modulePath}.ts`
            const filePathTsx = `${modulePath}.tsx`
            const indexPath = `${modulePath}/index.ts`
            const indexPathTsx = `${modulePath}/index.tsx`

            if (fs.existsSync(filePath)) {
              localPath = path.relative(
                path.join(sourceFile.fileName, "../"),
                `${modulePath}.js`
              )
              if (!localPath.startsWith(".")) {
                localPath = `./${localPath}`
              }
            }
            if (fs.existsSync(filePathTsx)) {
              localPath = path.relative(
                path.join(sourceFile.fileName, "../"),
                `${modulePath}.jsx`
              )
              if (!localPath.startsWith(".")) {
                localPath = `./${localPath}`
              }
            } else if (fs.existsSync(indexPath)) {
              localPath = path.relative(
                path.join(sourceFile.fileName, "../"),
                `${modulePath}/index.js`
              )
              if (!localPath.startsWith(".")) {
                localPath = `./${localPath}`
              }
            } else if (fs.existsSync(indexPathTsx)) {
              localPath = path.relative(
                path.join(sourceFile.fileName, "../"),
                `${modulePath}/index.jsx`
              )
              if (!localPath.startsWith(".")) {
                localPath = `./${localPath}`
              }
            }
          }
          imports.push(
            factory.createImportDeclaration(
              undefined,
              undefined,
              factory.createImportClause(
                false,
                undefined,
                factory.createNamespaceImport(id)
              ),
              factory.createStringLiteral(localPath)
            )
          )
        })

        const globals = [] as ts.Statement[]

        if (shouldAddTraceVar) {
          globals.push(
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [
                  factory.createVariableDeclaration(
                    filePathId,
                    undefined,
                    undefined,
                    factory.createStringLiteral(
                      `${
                        matchingModules[matchingModules.length - 1].module
                      }: ${normalize(
                        sourceFile.fileName.slice(
                          matchingModules[matchingModules.length - 1].base.length
                        )
                      )}`
                    )
                  )
                ],
                ts.NodeFlags.Const
              )
            )
          )
        }

        processed = factory.updateSourceFile(
          processed,
          [...imports, ...globals, ...processed.statements],
          processed.isDeclarationFile,
          processed.referencedFiles,
          processed.typeReferenceDirectives,
          processed.hasNoDefaultLib,
          processed.libReferenceDirectives
        )

        return processed
      }
    }
  }
}

function getExported(
  sourceFile: ts.SourceFile,
  module: string,
  factory: ts.NodeFactory
) {
  const exported: Map<string, ts.Identifier> = new Map()
  sourceFile.statements.forEach((node) => {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.modifiers &&
      node.modifiers?.length > 0 &&
      node.modifiers.findIndex(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
      ) !== -1
    ) {
      exported.set(exportId(module, node.name.text), node.name)
    }
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.length === 1 &&
      node.declarationList.declarations[0].name &&
      node.modifiers &&
      node.modifiers?.length > 0 &&
      node.modifiers.findIndex(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
      ) !== -1
    ) {
      const name = node.declarationList.declarations[0].name.getText()
      exported.set(exportId(module, name), factory.createIdentifier(name))
    }
  })
  return exported
}

function exportId(module: string, fn: string): string {
  return `${fn} from ${module}`
}
