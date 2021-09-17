export function proxyAccess<T>(target: T): T {
  // @ts-expect-error
  return new Proxy(target, {
    get(target, p) {
      if (p in target) {
        return target[p]
      }
      throw new Error(
        `You shouldn't be here, check the compiler plugin. (access ${p.toString()} in ${JSON.stringify(
          target
        )})`
      )
    }
  })
}
