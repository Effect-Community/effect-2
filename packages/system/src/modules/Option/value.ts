import { constUndefined } from "../Utils/constUndefined"
import { identity } from "../Utils/identity"
import { $OptionOps, $OptionStaticOps } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method value_ from "@effect-ts/system/modules/Option/value"
     */
    value<A>(this: $Option<A>): A | undefined
  }
  interface $OptionStaticOps {
    /**
     * @ets_static value from "@effect-ts/system/modules/Option/value"
     * @ets_unpipe value_
     */
    value<A>(self: $Option<A>): A | undefined
  }
}

export const value_: $OptionOps["value"] = function () {
  return this.fold(constUndefined, identity)
}

export const value: $OptionStaticOps["value"] = function (self) {
  return self.value()
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  $OptionOps.value = value_
  $OptionStaticOps.value = value
}
