import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $OptionOps, $OptionStaticOps } from "./type.js"
import { registerOptionOp, registerOptionStaticOp } from "./type.js"

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

if (shouldPolyfill) {
  registerOptionOp("isSome")(isSome_)
  registerOptionStaticOp("isSome")(isSome)
}
