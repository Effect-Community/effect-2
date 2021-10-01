/**
 * @ets_optimize identity
 */
export function unsafeCoerce<A>(value: unknown): A {
  // @ts-expect-error
  return value
}
