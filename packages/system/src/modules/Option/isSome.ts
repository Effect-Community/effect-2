import type { $Option, $OptionOps, $OptionStaticOps } from "./type"
import { registerOptionOp, registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method isSome_ from "@effect-ts/system/modules/Option/isSome"
     */
    isSome<A>(this: $Option<A>): this is $Option.Some<A>
  }
  interface $OptionStaticOps {
    /**
     * @ets_static isSome from "@effect-ts/system/modules/Option/isSome"
     * @ets_unpipe isSome_
     */
    isSome<A>(self: $Option<A>): this is $Option.Some<A>
  }
}

export const isSome_: $OptionOps["isSome"] = function () {
  return this.fold(
    () => false,
    () => true
  )
}

export const isSome: $OptionStaticOps["isSome"] = function (self) {
  return self.isSome()
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("isSome")(isSome_)
  registerOptionStaticOp("isSome")(isSome)
}
