import type { Effect } from "@effect-ts/system/Effect"
import type { TypeUtils } from "@effect-ts/system/Utils/typeUtils"

declare module "@effect-ts/system/Effect/type" {
  interface EffectOps {
    /**
     * @ets_method bind from "@effect-ts/system/Effect/bind"
     */
    bind<R, E, A extends {}, K extends string, R1, E1, B>(
      this: Effect<R, E, A>,
      k: K & (K extends keyof A ? [`key ${K} already used`] : K),
      f: (a: A) => Effect<R1, E1, B>
    ): Effect<R & R1, E | E1, TypeUtils.Flat<A & { readonly [k in K]: B }>>
  }
}

/**
 * @ets_module "@effect-ts/system/Effect/bind"
 */
export function bind<R, E, A extends {}, K extends string, R1, E1, B>(
  self: Effect<R, E, A>,
  k: K & (K extends keyof A ? [`key ${K} already used`] : K),
  f: (a: A) => Effect<R1, E1, B>
): Effect<R & R1, E | E1, TypeUtils.Flat<A & { readonly [k in K]: B }>> {
  return self.flatMap((a) =>
    f(a).map(
      (b) =>
        Object.assign({}, a, { [k]: b }) as TypeUtils.Flat<A & { readonly [k in K]: B }>
    )
  )
}
