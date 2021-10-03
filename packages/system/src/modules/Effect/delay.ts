import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { $Effect, registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method delay_ from "@effect-ts/system/modules/Effect/delay"
     */
    delay<R, E, A>(
      this: $Effect<R, E, A>,
      ms: number,
      __ets_trace?: string
    ): $Effect<R, E, never>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static delay from "@effect-ts/system/modules/Effect/delay"
     * @ets_unpipe delay_
     */
    delay(
      ms: number,
      __ets_trace?: string
    ): <R, E, A>(self: $Effect<R, E, A>) => $Effect<R, E, never>
  }
}

/**
 * @ets_trace off
 */
export const delay_: $EffectOps["delay"] = function (_ms) {
  return $Effect.die(() => new Error("NotImplemented"))
}

/**
 * @ets_trace off
 */
export const delay: $EffectStaticOps["delay"] = function (ms) {
  return (self) => self.delay(ms)
}

if (shouldPolyfill) {
  registerEffectOp("delay")(delay_)
  registerEffectStaticOp("delay")(delay)
}
