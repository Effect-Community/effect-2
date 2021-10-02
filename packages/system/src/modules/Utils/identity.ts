/**
 * @ets_optimize identity
 */
export function identity<A>(a: A): A {
  return a
}

export type Id<A> = A
