export interface Pipe {
  /**
   * @ets_method pipe
   */
  pipe<A, B>(this: A, ab: (a: A) => B): B
  /**
   * @ets_method pipe
   */
  pipe<A, B, C>(this: A, ab: (a: A) => B, bc: (a: B) => C): C
  /**
   * @ets_method pipe
   */
  pipe<A, B, C, D>(this: A, ab: (a: A) => B, bc: (a: B) => C, cd: (c: C) => D): D
}

export function __pipe(this: any): any {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  let x = this
  for (let i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    x = arguments[i](x)
  }
  return x
}

/**
 * @ets_optimize pipe
 */
export function pipe<A, B>(a: A, ab: (a: A) => B): B
/**
 * @ets_optimize pipe
 */
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (a: B) => C): C
/**
 * @ets_optimize pipe
 */
export function pipe<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (a: B) => C,
  cd: (c: C) => D
): D
export function pipe() {
  // eslint-disable-next-line prefer-rest-params
  let x = arguments[0]
  for (let i = 1; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    x = arguments[i](x)
  }
  return x
}
