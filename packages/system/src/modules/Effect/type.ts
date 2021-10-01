import { polyfiller } from "../Utils/polyfiller"
import { proxyAccess } from "../Utils/proxyAccess"
import {
  IEffectAsync,
  IEffectTotal,
  IEffectWith,
  IFlatMap,
  IFold,
  ISucceed,
  ISuspend,
  ISuspendWith
} from "./instruction"

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
export const $Effect = {} as $EffectStaticOps

export interface $EffectOps {}

export const registerEffectOp =
  /* #__PURE__ */
  polyfiller<$EffectOps>([
    ISucceed.prototype,
    IFlatMap.prototype,
    IEffectTotal.prototype,
    IEffectWith.prototype,
    ISuspend.prototype,
    ISuspendWith.prototype,
    IEffectAsync.prototype,
    IFold.prototype
  ])

export const registerEffectStaticOp =
  /* #__PURE__ */
  polyfiller<$EffectStaticOps>([$Effect])

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
