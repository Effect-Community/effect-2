import { identity } from "../Utils/identity"
import { $OptionOps, $OptionStaticOps } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method getOrElse_ from "@effect-ts/system/Option/getOrElse"
     */
    getOrElse<A, B>(this: $Option<A>, orElse: () => B): A | B
  }
  interface $OptionStaticOps {
    /**
     * @ets_aspect getOrElse from "@effect-ts/system/Option/getOrElse"
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
  $OptionOps.getOrElse = getOrElse_
  $OptionStaticOps.getOrElse = getOrElse
}
