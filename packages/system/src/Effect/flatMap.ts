import type { Effect } from "@effect-ts/system/Effect"
import { IFlatMap } from "@effect-ts/system/Effect/instruction"

declare module "@effect-ts/system/Effect/type" {
  interface EffectOps {
    /**
     * @ets_method flatMap from "@effect-ts/system/Effect/flatMap"
     */
    flatMap<R, E, A, R1, E1, B>(
      this: Effect<R, E, A>,
      f: (a: A) => Effect<R1, E1, B>
    ): Effect<R & R1, E | E1, B>
  }
}

/**
 * @ets_module "@effect-ts/system/Effect/flatMap"
 */
export function flatMap<R, E, A, R1, E1, B>(
  self: Effect<R, E, A>,
  f: (a: A) => Effect<R1, E1, B>
): Effect<R & R1, E | E1, B> {
  // @ts-expect-error
  return new IFlatMap(self, f)
}
