import { unsafeCoerce } from "../Utils/coerce.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import type { $TypeUtils } from "../Utils/typeUtils.js"
import type { $EffectOps, $EffectStaticOps } from "./type.js"
import { registerEffectOp, registerEffectStaticOp } from "./type.js"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method bind_ from "@effect-ts/system/modules/Effect/bind"
     */
    bind<R, E, A extends {}, K extends string, R1, E1, B>(
      this: $Effect<R, E, A>,
      k: K & (K extends keyof A ? [`key ${K} already used`] : K),
      f: (a: A) => $Effect<R1, E1, B>,
      __ets_trace?: string
    ): $Effect<R & R1, E | E1, $TypeUtils.Flat<A & { readonly [k in K]: B }>>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static bind from "@effect-ts/system/modules/Effect/bind"
     * @ets_unpipe bind_
     */
    bind<A extends {}, K extends string, R1, E1, B>(
      k: K & (K extends keyof A ? [`key ${K} already used`] : K),
      f: (a: A) => $Effect<R1, E1, B>,
      __ets_trace?: string
    ): <R, E>(
      self: $Effect<R, E, A>
    ) => $Effect<R & R1, E | E1, $TypeUtils.Flat<A & { readonly [k in K]: B }>>
  }
}

/**
 * @ets_trace off
 */
export const bind_: $EffectOps["bind"] = function (k, f, trace) {
  return this.flatMap(
    (a) => f(a).map((b) => unsafeCoerce(Object.assign({}, a, { [k]: b }))),
    trace
  )
}

/**
 * @ets_trace off
 */
export const bind: $EffectStaticOps["bind"] = function (k, f, trace) {
  return (self) => self.bind(k as any, f, trace) as any
}

if (shouldPolyfill) {
  registerEffectOp("bind")(bind_)
  registerEffectStaticOp("bind")(bind)
}
