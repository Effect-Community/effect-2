import type { $OptionStaticOps } from "./type.js"
import { $Option, registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static emptyOf from "@effect-ts/system/modules/Option/emptyOf"
     */
    emptyOf<A>(): $Option<A>
  }
}

export const emptyOf: $OptionStaticOps["emptyOf"] = () => $Option.none

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerOptionStaticOp("emptyOf")(emptyOf)
}
