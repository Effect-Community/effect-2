import * as path from "path"
import * as ts from "typescript"

export default function bundle(
  _program: ts.Program,
  _opts: { modules?: [{ src: string; module: string }] } = {}
) {
  const checker = _program.getTypeChecker()

  const root = path.join(_program.getCompilerOptions().configFilePath.toString(), "..")

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

        const exported: Map<string, ts.Identifier> = new Map()

        sourceFile.statements.forEach((node) => {
          if (
            ts.isFunctionDeclaration(node) &&
            node.name &&
            node.modifiers?.length > 0 &&
            node.modifiers.findIndex(
              (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
            ) !== -1
          ) {
            const tags = ts.getJSDocTags(node)
            let module: string | undefined
            tags.forEach((tag) => {
              if (tag.tagName.text === "ets_module") {
                module = tag.comment.toString()
              }
            })
            if (module) {
              exported.set(exportId(module, node.name.text), node.name)
            }
          }
          if (
            ts.isVariableStatement(node) &&
            node.declarationList.declarations.length === 1 &&
            node.declarationList.declarations[0].name &&
            node.modifiers?.length > 0 &&
            node.modifiers.findIndex(
              (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
            ) !== -1
          ) {
            const tags = ts.getJSDocTags(node)
            let module: string | undefined
            tags.forEach((tag) => {
              if (tag.tagName.text === "ets_module") {
                module = tag.comment.toString()
              }
            })
            if (module) {
              const name = node.declarationList.declarations[0].name.getText()
              exported.set(exportId(module, name), factory.createIdentifier(name))
            }
          }
        })

        const modules: Map<string, ts.Identifier> = new Map()

        function rewriteMethods(node: ts.Node): ts.Node {
          if (
            relativeTo &&
            ts.isImportDeclaration(node) &&
            !node.importClause.isTypeOnly &&
            node.moduleSpecifier &&
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text.startsWith(".")
          ) {
            return ts.visitEachChild(
              factory.updateImportDeclaration(
                node,
                node.decorators,
                node.modifiers,
                node.importClause,
                factory.createStringLiteral(
                  path.join(relativeTo, node.moduleSpecifier.text)
                )
              ),
              rewriteMethods,
              ctx
            )
          }
          if (
            relativeTo &&
            ts.isExportDeclaration(node) &&
            node.moduleSpecifier &&
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text.startsWith(".") &&
            !node.isTypeOnly
          ) {
            return ts.visitEachChild(
              factory.updateExportDeclaration(
                node,
                node.decorators,
                node.modifiers,
                node.isTypeOnly,
                node.exportClause,
                factory.createStringLiteral(
                  path.join(relativeTo, node.moduleSpecifier.text)
                )
              ),
              rewriteMethods,
              ctx
            )
          }
          if (ts.isPropertyAccessExpression(node)) {
            const tags = checker.getSymbolAtLocation(node).getJsDocTags()

            let ets_static: string | undefined

            tags.forEach((tag) => {
              if (tag.name === "ets_static") {
                ets_static = tag.text.map((_) => _.text).join(" ")
              }
            })

            if (ets_static) {
              if (exported.has(ets_static)) {
                const method = exported.get(ets_static)

                return method
              } else {
                const [, fn, module] = ets_static.match(/^(.*?) from "(.*?)"$/)
                let id: ts.Identifier
                if (modules.has(module)) {
                  id = modules.get(module)
                } else {
                  id = factory.createUniqueName("module")
                  modules.set(module, id)
                }
                return factory.createPropertyAccessExpression(id, fn)
              }
            }
          }
          if (
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression)
          ) {
            const tags = checker.getResolvedSignature(node).getJsDocTags()

            let ets_method: string | undefined
            let ets_static: string | undefined

            tags.forEach((tag) => {
              if (tag.name === "ets_method") {
                ets_method = tag.text.map((_) => _.text).join(" ")
              }
              if (tag.name === "ets_static") {
                ets_static = tag.text.map((_) => _.text).join(" ")
              }
            })

            if (ets_static) {
              if (exported.has(ets_static)) {
                const method = exported.get(ets_static)

                return factory.updateCallExpression(
                  node,
                  method,
                  node.typeArguments,
                  ts.visitNodes(node.arguments, rewriteMethods)
                )
              } else {
                const [, fn, module] = ets_static.match(/^(.*?) from "(.*?)"$/)
                let id: ts.Identifier
                if (modules.has(module)) {
                  id = modules.get(module)
                } else {
                  id = factory.createUniqueName("module")
                  modules.set(module, id)
                }
                return factory.updateCallExpression(
                  node,
                  factory.createPropertyAccessExpression(id, fn),
                  node.typeArguments,
                  ts.visitNodes(node.arguments, rewriteMethods)
                )
              }
            }

            if (ets_method) {
              if (exported.has(ets_method)) {
                const method = exported.get(ets_method)

                return factory.updateCallExpression(node, method, node.typeArguments, [
                  ts.visitNode(node.expression.expression, rewriteMethods),
                  ...ts.visitNodes(node.arguments, rewriteMethods)
                ])
              } else {
                const [, fn, module] = ets_method.match(/^(.*?) from "(.*?)"$/)
                let id: ts.Identifier
                if (modules.has(module)) {
                  id = modules.get(module)
                } else {
                  id = factory.createUniqueName("module")
                  modules.set(module, id)
                }
                return factory.updateCallExpression(
                  node,
                  factory.createPropertyAccessExpression(
                    id,
                    factory.createIdentifier(fn)
                  ),
                  node.typeArguments,
                  [
                    ts.visitNode(node.expression.expression, rewriteMethods),
                    ...ts.visitNodes(node.arguments, rewriteMethods)
                  ]
                )
              }
            }
          }

          return ts.visitEachChild(node, rewriteMethods, ctx)
        }

        let processed = ts.visitNode(sourceFile, rewriteMethods)

        const imports: ts.ImportDeclaration[] = []

        modules.forEach((id, mod) => {
          imports.push(
            factory.createImportDeclaration(
              undefined,
              undefined,
              factory.createImportClause(
                false,
                undefined,
                factory.createNamespaceImport(id)
              ),
              factory.createStringLiteral(mod)
            )
          )
        })

        processed = factory.updateSourceFile(
          processed,
          [...imports, ...processed.statements],
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

function exportId(module: string, fn: string): string {
  return `${fn} from ${module}`
}

function prefix(str: string): string {
  return `$__ets__${str}`
}
