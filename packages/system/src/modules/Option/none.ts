import { unsafeCoerce } from "../Utils/coerce"
import { INone } from "./instruction"
import type { $OptionStaticOps } from "./type"
import { registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static none from "@effect-ts/system/modules/Option/none"
     */
    none: $Option<never>
  }
}

export const none: $OptionStaticOps["none"] = new INone()

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionStaticOp("none")(none)
}
