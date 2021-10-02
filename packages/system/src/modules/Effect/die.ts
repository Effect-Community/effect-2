import { IDie } from "../Cause/type.js"
import { unsafeCoerce } from "../Utils/coerce.js"
import { IFail } from "./instruction.js"
import type { $EffectStaticOps } from "./type.js"
import { registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static die from "@effect-ts/system/modules/Effect/die"
     */
    die<E>(thunk: () => E, __ets_trace?: string): $Effect<unknown, never, never>
  }
}

/**
 * @ets_trace off
 */
export const die: $EffectStaticOps["die"] = function (thunk, trace) {
  return unsafeCoerce(new IFail(() => new IDie(thunk()), trace))
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerEffectStaticOp("die")(die)
}
