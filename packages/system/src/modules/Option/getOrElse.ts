import { identity } from "../Utils/identity"
import type { $OptionOps, $OptionStaticOps } from "./type"
import { registerOptionOp, registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method getOrElse_ from "@effect-ts/system/modules/Option/getOrElse"
     */
    getOrElse<A, B>(this: $Option<A>, orElse: () => B): A | B
  }
  interface $OptionStaticOps {
    /**
     * @ets_static getOrElse from "@effect-ts/system/modules/Option/getOrElse"
     * @ets_unpipe getOrElse_
     */
    getOrElse<B>(orElse: () => B): <A>(self: $Option<A>) => A | B
  }
}

export const getOrElse_: $OptionOps["getOrElse"] = function (orElse) {
  return this.fold(orElse, identity)
}

export const getOrElse: $OptionStaticOps["getOrElse"] = function (orElse) {
  return (self) => self.getOrElse(orElse)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("getOrElse")(getOrElse_)
  registerOptionStaticOp("getOrElse")(getOrElse)
}