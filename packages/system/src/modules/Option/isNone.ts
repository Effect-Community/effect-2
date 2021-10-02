import type { $Option, $OptionOps, $OptionStaticOps } from "./type"
import { registerOptionOp, registerOptionStaticOp } from "./type"

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

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("isNone")(isNone_)
  registerOptionStaticOp("isNone")(isNone)
}
