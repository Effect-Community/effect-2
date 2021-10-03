import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
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

export const none: $OptionStaticOps["none"] =
  /* #__PURE__ */
  new INone()

if (shouldPolyfill) {
  registerOptionStaticOp("none")(none)
}
