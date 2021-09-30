import { proxyAccess } from "../Utils/proxyAccess"

export declare const _Internal: unique symbol
export declare const _R: unique symbol
export declare const _E: unique symbol
export declare const _A: unique symbol
export declare const _EffectId: unique symbol

export interface $Effect<R, E, A> extends $EffectOps {
  readonly [_Internal]: {
    readonly [_EffectId]: typeof _EffectId
    readonly [_R]: (_R: R) => void
    readonly [_E]: () => E
    readonly [_A]: () => A
  }
}

export interface $EffectStaticOps {}
export interface $EffectOps {}

export const $Effect: $EffectStaticOps =
  /* #__PURE__ */
  proxyAccess({} as $EffectStaticOps)

export declare namespace $Effect {
  export type IO<A> = $Effect<unknown, never, A>
  export type RIO<R, A> = $Effect<R, never, A>
  export type EIO<E, A> = $Effect<unknown, E, A>

  export type _EnvOf<T> = [T] extends [
    {
      readonly [_Internal]: {
        readonly [_R]: (_R: infer R) => void
      }
    }
  ]
    ? R
    : never

  export type _ErrOf<T> = [T] extends [
    {
      readonly [_Internal]: {
        readonly [_E]: () => infer E
      }
    }
  ]
    ? E
    : never

  export type _OutOf<T> = [T] extends [
    {
      readonly [_Internal]: {
        readonly [_A]: () => infer A
      }
    }
  ]
    ? A
    : never
}
