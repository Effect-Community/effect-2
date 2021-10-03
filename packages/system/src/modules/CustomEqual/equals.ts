import { $CustomHash } from "../CustomHash/type.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $CustomEqual, $CustomEqualStaticOps } from "./type.js"
import { _equalFn, registerCustomEqualStaticOp } from "./type.js"

declare module "./type" {
  interface $CustomEqualStaticOps {
    /**
     * @ets_static equals from "@effect-ts/system/modules/CustomEqual/equals"
     */
    equals<X, Y>(self: X, that: Y): boolean
  }
}

export const equals: $CustomEqualStaticOps["equals"] = function (x, y) {
  // @ts-expect-error
  if (x === y) {
    return true
  }
  if ($CustomHash.hash(x) !== $CustomHash.hash(y)) {
    return false
  }
  if (typeof x === "object" && x != null && _equalFn in x) {
    return (x as unknown as $CustomEqual)[_equalFn](y)
  }
  return false
}

if (shouldPolyfill) {
  registerCustomEqualStaticOp("equals")(equals)
}
