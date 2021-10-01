import { unsafeCoerce } from "../Utils/coerce"
import { ISome } from "./instruction"
import type { $OptionStaticOps } from "./type"
import { registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionStaticOps {
    /**
     * @ets_static some from "@effect-ts/system/modules/Option/some"
     */
    some<A>(value: A): $Option<A>
  }
}

export const some: $OptionStaticOps["some"] = (a) => unsafeCoerce(new ISome(a))

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionStaticOp("some")(some)
}
