import type { Effect } from "@effect-ts/system/Effect"

declare module "@effect-ts/system/Effect/type" {
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
