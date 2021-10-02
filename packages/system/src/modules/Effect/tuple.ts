import type { $Array } from "../Array/type.js"
import { $Effect, registerEffectStaticOp } from "../Effect/type.js"
import type { $Tuple } from "../Tuple/type.js"
import { traceFrom } from "../Utils/traceFrom.js"
import type { $EffectStaticOps } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static tuple from "@effect-ts/system/modules/Effect/tuple"
     * @ets_prepend_trace
     */
    tuple<Effects extends $Array<$Effect<any, any, any>>>(
      ...effects: Effects
    ): $Effect<
      $Effect._R<Effects[number]>,
      $Effect._E<Effects[number]>,
      // @ts-expect-error
      $Tuple<{ [k in keyof Effects]: $Effect._A<Effects[k]> }>
    >
    /**
     * @ets_static tuple from "@effect-ts/system/modules/Effect/tuple"
     */
    tuple<Effects extends $Array<$Effect<any, any, any>>>(
      __trace: string | undefined,
      ...effects: Effects
    ): $Effect<
      $Effect._R<Effects[number]>,
      $Effect._E<Effects[number]>,
      // @ts-expect-error
      $Tuple<{ [k in keyof Effects]: $Effect._A<Effects[k]> }>
    >
  }
}

export const tuple: $EffectStaticOps["tuple"] = function (...args) {
  const [trace, effects] = traceFrom(args)
  console.log(trace)
  return $Effect.die(() => new Error("Not Implemented"))
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectStaticOp("tuple")(tuple)
}
