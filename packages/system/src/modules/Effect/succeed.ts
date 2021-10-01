import { unsafeCoerce } from "../Utils/coerce"
import { ISucceed } from "./instruction"
import type { $EffectStaticOps } from "./type"
import { registerEffectStaticOp } from "./type"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static succeed from "@effect-ts/system/modules/Effect/succeed"
     */
    succeed<A>(thunk: () => A): $Effect.IO<A>
  }
}

export const succeed: $EffectStaticOps["succeed"] = function (thunk) {
  return unsafeCoerce(new ISucceed(thunk))
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectStaticOp("succeed")(succeed)
}
