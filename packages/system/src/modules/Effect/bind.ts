import { unsafeCoerce } from "../Utils/coerce.js"
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
      f: (a: A) => $Effect<R1, E1, B>
    ): $Effect<R & R1, E | E1, $TypeUtils.Flat<A & { readonly [k in K]: B }>>
  }
  interface $EffectStaticOps {
    /**
     * @ets_static bind from "@effect-ts/system/modules/Effect/bind"
     * @ets_unpipe bind_
     */
    bind<A extends {}, K extends string, R1, E1, B>(
      k: K & (K extends keyof A ? [`key ${K} already used`] : K),
      f: (a: A) => $Effect<R1, E1, B>
    ): <R, E>(
      self: $Effect<R, E, A>
    ) => $Effect<R & R1, E | E1, $TypeUtils.Flat<A & { readonly [k in K]: B }>>
  }
}

export const bind_: $EffectOps["bind"] = function (k, f) {
  return this.flatMap((a) =>
    f(a).map((b) => unsafeCoerce(Object.assign({}, a, { [k]: b })))
  )
}

export const bind: $EffectStaticOps["bind"] = function (k, f) {
  return (self) => self.bind(k as any, f) as any
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("bind")(bind_)
  registerEffectStaticOp("bind")(bind)
}
