import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $CustomHashStaticOps } from "./type.js"
import { registerCustomHashStaticOp } from "./type.js"
import * as utils from "./utils.js"

declare module "./type" {
  interface $CustomHashStaticOps {
    /**
     * @ets_static hash from "@effect-ts/system/modules/CustomHash/hash"
     */
    hash<X>(self: X): number
    /**
     * @ets_static hashString from "@effect-ts/system/modules/CustomHash/hash"
     */
    hashString: typeof utils.hashString
    /**
     * @ets_static hashNumber from "@effect-ts/system/modules/CustomHash/hash"
     */
    hashNumber: typeof utils.hashNumber
    /**
     * @ets_static combineHash from "@effect-ts/system/modules/CustomHash/hash"
     */
    combineHash: typeof utils.combineHash
  }
}

export const hash: $CustomHashStaticOps["hash"] = utils.hash
export const hashString: $CustomHashStaticOps["hashString"] = utils.hashString
export const hashNumber: $CustomHashStaticOps["hashNumber"] = utils.hashNumber
export const combineHash: $CustomHashStaticOps["combineHash"] = utils.combineHash

if (shouldPolyfill) {
  registerCustomHashStaticOp("hash")(hash)
  registerCustomHashStaticOp("hashString")(hashString)
  registerCustomHashStaticOp("hashNumber")(hashNumber)
  registerCustomHashStaticOp("combineHash")(combineHash)
}
