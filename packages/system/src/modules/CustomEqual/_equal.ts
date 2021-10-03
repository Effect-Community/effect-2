import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { _equal as _equalFromType, registerCustomEqualStaticOp } from "./type.js"

declare module "./type" {
  interface $CustomEqualStaticOps {
    /**
     * @ets_static _equal from "@effect-ts/system/modules/CustomEqual/_equal"
     */
    _equal: typeof _equalFromType
  }
}

export const _equal: typeof _equalFromType = _equalFromType

if (shouldPolyfill) {
  registerCustomEqualStaticOp("_equal")(_equal)
}
