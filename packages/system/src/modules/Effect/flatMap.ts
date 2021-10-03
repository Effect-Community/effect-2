import { unsafeCoerce } from "../Utils/coerce.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { IFlatMap } from "./instruction.js"
import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method flatMap_ from "@effect-ts/system/modules/Effect/flatMap"
     */
    flatMap<R, E, A, R1, E1, B>(
      this: $Effect<R, E, A>,
      f: (a: A) => $Effect<R1, E1, B>,
      __ets_trace?: string | undefined
    ): $Effect<R & R1, E | E1, B>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static flatMap from "@effect-ts/system/modules/Effect/flatMap"
     * @ets_unpipe flatMap_
     */
    flatMap<A, R1, E1, B>(
      f: (a: A) => $Effect<R1, E1, B>,
      __ets_trace?: string | undefined
    ): <R, E>(self: $Effect<R, E, A>) => $Effect<R & R1, E | E1, B>
  }
}

/**
 * @ets_trace off
 */
export const flatMap_: $EffectOps["flatMap"] = function (f, trace) {
  console.log(trace)
  return unsafeCoerce(new IFlatMap(unsafeCoerce(this), unsafeCoerce(f), trace))
}

/**
 * @ets_trace off
 */
export const flatMap: $EffectStaticOps["flatMap"] = function (f, trace) {
  return (self) => self.flatMap(f, trace)
}

if (shouldPolyfill) {
  registerEffectOp("flatMap")(flatMap_)
  registerEffectStaticOp("flatMap")(flatMap)
}
