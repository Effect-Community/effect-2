import type { $CustomEqual } from "../CustomEqual"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $CustomEqualStaticOps } from "./type.js"
import { _equal, registerCustomEqualStaticOp } from "./type.js"

declare module "./type" {
  interface $CustomEqualStaticOps {
    /**
     * @ets_static equals from "@effect-ts/system/modules/CustomEqual/equals"
     */
    equals<X, Y>(self: X, that: Y): boolean
  }
}

export const equals: $CustomEqualStaticOps["equals"] = function (x, y) {
  if (typeof x === "object" && x != null && _equal in x) {
    return (x as unknown as $CustomEqual)[_equal](y)
  }
  // @ts-expect-error
  return x === y
}

if (shouldPolyfill) {
  registerCustomEqualStaticOp("equals")(equals)
}
