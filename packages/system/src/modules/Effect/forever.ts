import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method forever_ from "@effect-ts/system/modules/Effect/forever"
     */
    forever<R, E, A>(this: $Effect<R, E, A>, __ets_trace?: string): $Effect<R, E, never>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static forever from "@effect-ts/system/modules/Effect/forever"
     * @ets_unpipe forever_
     */
    forever<R, E, A>(self: $Effect<R, E, A>, __ets_trace?: string): $Effect<R, E, never>
  }
}

/**
 * @ets_trace off
 */
export const forever_: $EffectOps["forever"] = function (trace) {
  return this.flatMap(() => this.forever(trace), trace)
}

/**
 * @ets_trace off
 */
export const forever: $EffectStaticOps["forever"] = function (self, trace) {
  return self.forever(trace)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("forever")(forever_)
  registerEffectStaticOp("forever")(forever)
}
