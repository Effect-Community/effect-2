import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { ISome } from "./instruction.js"
import type { $OptionStaticOps } from "./type.js"
import { registerOptionStaticOp } from "./type.js"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static some from "@effect-ts/system/modules/Option/some"
     */
    some<A>(value: A): $Option<A>
  }
}

export const some: $OptionStaticOps["some"] = function (a) {
  return new ISome(a)
}

if (shouldPolyfill) {
  registerOptionStaticOp("some")(some)
}
