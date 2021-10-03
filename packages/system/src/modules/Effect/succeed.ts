import { unsafeCoerce } from "../Utils/coerce.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { ISucceed } from "./instruction.js"
import type { $EffectStaticOps } from "./type.js"
import { registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectStaticOps {
    /**
     * @ets_static succeed from "@effect-ts/system/modules/Effect/succeed"
     */
    succeed<A>(thunk: () => A, __ets_trace?: string): $Effect.IO<A>
  }
}

/**
 * @ets_trace off
 */
export const succeed: $EffectStaticOps["succeed"] = function (thunk, trace) {
  console.log(trace)
  return unsafeCoerce(new ISucceed(thunk, trace))
}

if (shouldPolyfill) {
  registerEffectStaticOp("succeed")(succeed)
}
