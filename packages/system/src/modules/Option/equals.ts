import { $CustomEqual } from "../CustomEqual.js"
import { constUndefined } from "../Utils/constUndefined.js"
import { identity } from "../Utils/identity.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $OptionOps, $OptionStaticOps } from "./type.js"
import { registerOptionOp, registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method equals_ from "@effect-ts/system/modules/Option/equals"
     */
    equals<A, X>(this: $Option<A>, that: X): boolean
  }
  interface $OptionStaticOps {
    /**
     * @ets_static equals from "@effect-ts/system/modules/Option/equals"
     * @ets_unpipe equals_
     */
    equals<X>(that: X): <A>(self: $Option<A>) => boolean
  }
}

export const equals_: $OptionOps["equals"] = function (that) {
  return $CustomEqual.equals(this, that)
}

export const equals: $OptionStaticOps["equals"] = function (that) {
  return (self) => self.equals(that)
}

if (shouldPolyfill) {
  registerOptionOp("equals")(equals_)
  registerOptionStaticOp("equals")(equals)
}
