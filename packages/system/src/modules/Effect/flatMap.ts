import { unsafeCoerce } from "../Utils/coerce"
import { IFlatMap } from "./instruction"
import type { $EffectOps, $EffectStaticOps } from "./type"
import { registerEffectOp, registerEffectStaticOp } from "./type"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method flatMap_ from "@effect-ts/system/modules/Effect/flatMap"
     */
    flatMap<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      f: (a: A) => $Effect<R1, E1, B>
    ): $Effect<R & R1, E | E1, B>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static flatMap from "@effect-ts/system/modules/Effect/flatMap"
     * @ets_unpipe flatMap_
     */
    flatMap<A, R1, E1, B>(
      f: (a: A) => $Effect<R1, E1, B>
    ): <R, E>(self: $Effect<R, E, A>) => $Effect<R & R1, E | E1, B>
  }
}

export const flatMap_: $EffectOps["flatMap"] = function (f) {
  return unsafeCoerce(new IFlatMap(unsafeCoerce(this), unsafeCoerce(f)))
}

export const flatMap: $EffectStaticOps["flatMap"] = function (f) {
  return (self) => self.flatMap(f)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("flatMap")(flatMap_)
  registerEffectStaticOp("flatMap")(flatMap)
}
