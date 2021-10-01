export function polyfiller<O>(...instructions: any[]) {
  return <K extends keyof O & string>(k: K) =>
    (impl: O[K]) => {
      instructions.forEach((ins) => {
        ins[k] = impl
      })
    }
}
