import type { $OptionOps, $OptionStaticOps } from "./type.js"
import { $Option, registerOptionOp, registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method flatMap_ from "@effect-ts/system/modules/Option/flatMap"
     */
    flatMap<A, B>(this: $Option<A>, f: (a: A) => $Option<B>): $Option<B>
  }
  interface $OptionStaticOps {
    /**
     * @ets_static flatMap from "@effect-ts/system/modules/Option/flatMap"
     * @ets_unpipe flatMap_
     */
    flatMap<A, B>(f: (a: A) => $Option<B>): (self: $Option<A>) => $Option<B>
  }
}

export const flatMap_: $OptionOps["flatMap"] = function (f) {
  return this.fold(() => $Option.none, f)
}

export const flatMap: $OptionStaticOps["flatMap"] = function (f) {
  return (self) => self.flatMap(f)
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerOptionOp("flatMap")(flatMap_)
  registerOptionStaticOp("flatMap")(flatMap)
}
