import type { $OptionOps, $OptionStaticOps } from "./type.js"
import { registerOptionOp, registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method isNone_ from "@effect-ts/system/modules/Option/isNone"
     */
    isNone<A>(this: $Option<A>): this is $Option.Some<A>
  }
  interface $OptionStaticOps {
    /**
     * @ets_static isNone from "@effect-ts/system/modules/Option/isNone"
     * @ets_unpipe isNone_
     */
    isNone<A>(self: $Option<A>): this is $Option.Some<A>
  }
}

export const isNone_: $OptionOps["isNone"] = function () {
  return this.fold(
    () => true,
    () => false
  )
}

export const isNone: $OptionStaticOps["isNone"] = function (self) {
  return self.isNone()
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerOptionOp("isNone")(isNone_)
  registerOptionStaticOp("isNone")(isNone)
}
