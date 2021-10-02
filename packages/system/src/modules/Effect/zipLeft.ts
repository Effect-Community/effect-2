import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method zipLeft_ from "@effect-ts/system/modules/Effect/zipLeft"
     */
    zipLeft<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): $Effect<R & R1, E | E1, A>
    /**
     * @ets_method zipLeft_ from "@effect-ts/system/modules/Effect/zipLeft"
     */
    "<*"<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): $Effect<R & R1, E | E1, A>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static zipLeft from "@effect-ts/system/modules/Effect/zipLeft"
     * @ets_unpipe zipLeft_
     */
    zipLeft<R1, E1, B>(
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): <R, E, A>(self: $Effect<R, E, A>) => $Effect<R & R1, E | E1, A>
  }
}

/**
 * @ets_trace off
 */
export const zipLeft_: $EffectOps["zipLeft"] = function (f, trace) {
  return this.flatMap((a) => f.map(() => a), trace)
}

/**
 * @ets_trace off
 */
export const zipLeft: $EffectStaticOps["zipLeft"] = function (f, trace) {
  return (self) => self.zipLeft(f, trace)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("zipLeft")(zipLeft_)
  registerEffectOp("<*")(zipLeft_)
  registerEffectStaticOp("zipLeft")(zipLeft)
}
