// @ets_relative "@effect-ts/system/Effect"

import type { Effect } from "./type"

declare module "./type" {
  interface EffectOps {
    /**
     * @ets_method forever from "@effect-ts/system/Effect/forever"
     */
    forever<R, E, A>(this: Effect<R, E, A>): Effect<R, E, never>
  }
}

/**
 * @ets_module "@effect-ts/system/Effect/forever"
 */
export function forever<R, E, A>(self: Effect<R, E, A>): Effect<R, E, never> {
  return self.flatMap(() => self.forever())
}
