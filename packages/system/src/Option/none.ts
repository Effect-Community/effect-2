import { unsafeCoerce } from "../Utils/coerce"
import { INone } from "./instruction"
import { $OptionStaticOps } from "./type"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_aspect none from "@effect-ts/system/Option/none"
     */
    none: $Option<never>
  }
}

export const none: $OptionStaticOps["none"] = unsafeCoerce(new INone())

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  $OptionStaticOps.none = none
}
