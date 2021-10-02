import { INone } from "./instruction.js"
import type { $OptionStaticOps } from "./type.js"
import { registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static none from "@effect-ts/system/modules/Option/none"
     */
    none: $Option<never>
  }
}

export const none: $OptionStaticOps["none"] = new INone()

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerOptionStaticOp("none")(none)
}
