import { $Option } from "../Option/type.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $ArrayOps, $ArrayStaticOps } from "./type.js"
import { registerArrayOp, registerArrayStaticOp } from "./type.js"

declare module "./type" {
  interface $ArrayOps {
    /**
     * @ets_method get_ from "@effect-ts/system/modules/Array/get"
     */
    get<A>(this: $Array<A>, index: number): $Option<A>
  }
  interface $ArrayStaticOps {
    /**
     * @ets_static get from "@effect-ts/system/modules/Array/get"
     * @ets_unpipe get
     */
    get(index: number): <A>(self: $Array<A>) => $Option<A>
  }
}

export const get_: $ArrayOps["get"] = function (i) {
  return this.isOutOfBound(i) ? $Option.none : $Option.some(this[i])
}

export const get: $ArrayStaticOps["get"] = function (i) {
  return (self) => self.get(i)
}

if (shouldPolyfill) {
  registerArrayOp("get")(get_)
  registerArrayStaticOp("get")(get)
}
