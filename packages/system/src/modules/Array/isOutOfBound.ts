import type { $ArrayOps, $ArrayStaticOps } from "./type"
import { registerArrayOp, registerArrayStaticOp } from "./type"

declare module "./type" {
  interface $ArrayOps {
    /**
     * @ets_method isOutOfBound_ from "@effect-ts/system/modules/Array/isOutOfBound"
     */
    isOutOfBound<A>(this: $Array<A>, index: number): boolean
  }
  interface $ArrayStaticOps {
    /**
     * @ets_static isOutOfBound from "@effect-ts/system/modules/Array/isOutOfBound"
     * @ets_unpipe isOutOfBound
     */
    isOutOfBound(index: number): <A>(self: $Array<A>) => boolean
  }
}

export const isOutOfBound_: $ArrayOps["isOutOfBound"] = function (i) {
  return i < 0 || i >= this.length
}

export const isOutOfBound: $ArrayStaticOps["isOutOfBound"] = function (i) {
  return (self) => self.isOutOfBound(i)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerArrayOp("isOutOfBound")(isOutOfBound_)
  registerArrayStaticOp("isOutOfBound")(isOutOfBound)
}
