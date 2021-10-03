import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $CustomEqualStaticOps } from "./type.js"
import { registerCustomEqualStaticOp } from "./type.js"
import * as utils from "./utils.js"

declare module "./type" {
  interface $CustomEqualStaticOps {
    /**
     * @ets_static hash from "@effect-ts/system/modules/CustomEqual/hash"
     */
    hash<X>(self: X): number
    /**
     * @ets_static hashString from "@effect-ts/system/modules/CustomEqual/hash"
     */
    hashString: typeof utils.hashString
    /**
     * @ets_static hashNumber from "@effect-ts/system/modules/CustomEqual/hash"
     */
    hashNumber: typeof utils.hashNumber
    /**
     * @ets_static combineHash from "@effect-ts/system/modules/CustomEqual/hash"
     */
    combineHash: typeof utils.combineHash
  }
}

export const hash: $CustomEqualStaticOps["hash"] = utils.hash
export const hashString: $CustomEqualStaticOps["hashString"] = utils.hashString
export const hashNumber: $CustomEqualStaticOps["hashNumber"] = utils.hashNumber
export const combineHash: $CustomEqualStaticOps["combineHash"] = utils.combineHash

if (shouldPolyfill) {
  registerCustomEqualStaticOp("hash")(hash)
  registerCustomEqualStaticOp("hashString")(hashString)
  registerCustomEqualStaticOp("hashNumber")(hashNumber)
  registerCustomEqualStaticOp("combineHash")(combineHash)
}
