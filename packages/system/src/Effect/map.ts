// @ets_relative "@effect-ts/system/Effect"

import { Effect } from "./type"

declare module "./type" {
  interface EffectOps {
    /**
     * @ets_method map from "@effect-ts/system/Effect/map"
     */
    map<R, E, A, B>(this: Effect<R, E, A>, f: (a: A) => B): Effect<R, E, B>
  }
}

export function map<R, E, A, B>(
  self: Effect<R, E, A>,
  f: (a: A) => B
): Effect<R, E, B> {
  return self.flatMap((a) => Effect.succeed(() => f(a)))
}
