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
  $Effect.succeed(() => ({}), void 0)

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerEffectStaticOp("do")(do_)
}
