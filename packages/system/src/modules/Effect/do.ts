import type { $EffectStaticOps } from "./type.js"
import { $Effect, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static do_ from "@effect-ts/system/modules/Effect/do"
     */
    do(__ets_trace?: string): $Effect.IO<{}>
  }
}

/**
 * @ets_trace off
 */
export const do_: $EffectStaticOps["do"] = function (trace) {
  return $Effect.succeed(() => ({}), trace)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectStaticOp("do")(do_)
}
