import type { $ArrayOps, $ArrayStaticOps } from "./type"
import { registerArrayOp, registerArrayStaticOp } from "./type"

declare module "./type" {
  interface $ArrayOps {
    /**
     * @ets_method get_ from "@effect-ts/system/modules/Array/get"
     */
    get<A>(this: $Array<A>, index: number): A
  }
  interface $ArrayStaticOps {
    /**
     * @ets_static get from "@effect-ts/system/modules/Array/get"
     * @ets_unpipe get
     */
    get(index: number): <A>(self: $Array<A>) => A
  }
}

export const get_: $ArrayOps["get"] = function (i) {
  return this[i]
}

export const get: $ArrayStaticOps["get"] = function (i) {
  return (self) => self.get(i)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerArrayOp("get")(get_)
  registerArrayStaticOp("get")(get)
}
