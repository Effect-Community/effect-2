import { constUndefined } from "../Utils/constUndefined.js"
import { identity } from "../Utils/identity.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $OptionOps, $OptionStaticOps } from "./type.js"
import { registerOptionOp, registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method get_ from "@effect-ts/system/modules/Option/get"
     */
    get<A>(this: $Option<A>): A | undefined
  }
  interface $OptionStaticOps {
    /**
     * @ets_static get from "@effect-ts/system/modules/Option/get"
     * @ets_unpipe get_
     */
    get<A>(self: $Option<A>): A | undefined
  }
}

export const get_: $OptionOps["get"] = function () {
  return this.fold(constUndefined, identity)
}

export const get: $OptionStaticOps["get"] = function (self) {
  return self.get()
}

if (shouldPolyfill) {
  registerOptionOp("get")(get_)
  registerOptionStaticOp("get")(get)
}
