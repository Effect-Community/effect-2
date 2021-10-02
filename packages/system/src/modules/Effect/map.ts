import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { $Effect, registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method map_ from "@effect-ts/system/modules/Effect/map"
     */
    map<R, E, A, B>(this: $Effect<R, E, A>, f: (a: A) => B): $Effect<R, E, B>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static map from "@effect-ts/system/modules/Effect/map"
     * @ets_unpipe map_
     */
    map<A, B>(f: (a: A) => B): <R, E>(self: $Effect<R, E, A>) => $Effect<R, E, B>
  }
}

export const map_: $EffectOps["map"] = function (f) {
  return this.flatMap((a) => $Effect.succeed(() => f(a)))
}

export const map: $EffectStaticOps["map"] = function (f) {
  return (self) => self.map(f)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("map")(map_)
  registerEffectStaticOp("map")(map)
}
