import type { $EffectStaticOps } from "./type.js"
import { $Effect, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static do_ from "@effect-ts/system/modules/Effect/do"
     */
    do: $Effect.IO<{}>
  }
}

export const do_: $EffectStaticOps["do"] =
  /* #__PURE__ */
  $Effect.succeed(() => ({}))

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectStaticOp("do")(do_)
}
