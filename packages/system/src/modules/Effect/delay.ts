import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method delay_ from "@effect-ts/system/modules/Effect/delay"
     */
    delay<R, E, A>(this: $Effect<R, E, A>, ms: number): $Effect<R, E, never>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static delay from "@effect-ts/system/modules/Effect/delay"
     * @ets_unpipe delay_
     */
    delay(ms: number): <R, E, A>(self: $Effect<R, E, A>) => $Effect<R, E, never>
  }
}

export const delay_: $EffectOps["delay"] = function (_ms) {
  throw new Error("NotImplemented")
}

export const delay: $EffectStaticOps["delay"] = function (ms) {
  return (self) => self.delay(ms)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("delay")(delay_)
  registerEffectStaticOp("delay")(delay)
}
