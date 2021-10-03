import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method zipRight_ from "@effect-ts/system/modules/Effect/zipRight"
     */
    zipRight<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): $Effect<R & R1, E | E1, B>
    /**
     * @ets_method zipRight_ from "@effect-ts/system/modules/Effect/zipRight"
     */
    "*>"<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): $Effect<R & R1, E | E1, B>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static zipRight from "@effect-ts/system/modules/Effect/zipRight"
     * @ets_unpipe zipRight_
     */
    zipRight<R1, E1, B>(
      that: $Effect<R1, E1, B>,
      __ets_trace?: string
    ): <R, E, A>(self: $Effect<R, E, A>) => $Effect<R & R1, E | E1, B>
  }
}

/**
 * @ets_trace off
 */
export const zipRight_: $EffectOps["zipRight"] = function (f, trace) {
  return this.flatMap(() => f, trace)
}

/**
 * @ets_trace off
 */
export const zipRight: $EffectStaticOps["zipRight"] = function (f, trace) {
  return (self) => self.zipRight(f, trace)
}

if (shouldPolyfill) {
  registerEffectOp("zipRight")(zipRight_)
  registerEffectOp("*>")(zipRight_)
  registerEffectStaticOp("zipRight")(zipRight)
}
