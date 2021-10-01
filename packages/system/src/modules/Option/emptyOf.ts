import type { $OptionStaticOps } from "./type"
import { $Option, registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static emptyOf from "@effect-ts/system/modules/Option/emptyOf"
     */
    emptyOf<A>(): $Option<A>
  }
}

export const emptyOf: $OptionStaticOps["emptyOf"] = () => $Option.none

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionStaticOp("emptyOf")(emptyOf)
}
