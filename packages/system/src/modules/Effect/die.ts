import { unsafeCoerce } from "../Utils/coerce.js"
import { IDie } from "./Cause/type.js"
import { IFail } from "./instruction.js"
import type { $EffectStaticOps } from "./type.js"
import { registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static die from "@effect-ts/system/modules/Effect/die"
     */
    die<E>(thunk: () => E): $Effect<unknown, never, never>
  }
}

export const die: $EffectStaticOps["die"] = function (thunk) {
  return unsafeCoerce(new IFail(() => new IDie(thunk())))
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectStaticOp("die")(die)
}
