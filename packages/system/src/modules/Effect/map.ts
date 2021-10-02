import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { $Effect, registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method map_ from "@effect-ts/system/modules/Effect/map"
     */
    map<R, E, A, B>(
      this: $Effect<R, E, A>,
      f: (a: A) => B,
      __ets_trace?: string | undefined
    ): $Effect<R, E, B>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static map from "@effect-ts/system/modules/Effect/map"
     * @ets_unpipe map_
     */
    map<A, B>(
      f: (a: A) => B,
      __ets_trace?: string | undefined
    ): <R, E>(self: $Effect<R, E, A>) => $Effect<R, E, B>
  }
}

/**
 * @ets_trace off
 */
export const map_: $EffectOps["map"] = function (f, trace) {
  return this.flatMap((a) => $Effect.succeed(() => f(a)), trace)
}

/**
 * @ets_trace off
 */
export const map: $EffectStaticOps["map"] = function (f, trace) {
  return (self) => self.map(f, trace)
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerEffectOp("map")(map_)
  registerEffectStaticOp("map")(map)
}
