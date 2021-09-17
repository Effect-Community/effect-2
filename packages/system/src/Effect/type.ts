// @ets_relative "@effect-ts/system/Effect"

import { proxyAccess } from "../Utils/proxyAccess"

export declare const _R: unique symbol
export declare const _E: unique symbol
export declare const _A: unique symbol
export declare const _EffectId: unique symbol

export interface Effect<R, E, A> extends EffectOps {
  readonly [_EffectId]: typeof _EffectId
  readonly [_R]: (_R: R) => void
  readonly [_E]: () => E
  readonly [_A]: () => A
}

export interface EffectStaticOps {}
export interface EffectOps {}

export const Effect: EffectStaticOps = proxyAccess({} as EffectStaticOps)

export declare namespace Effect {
  type IO<A> = Effect<unknown, never, A>
  type RIO<R, A> = Effect<R, never, A>
  type EIO<E, A> = Effect<unknown, E, A>
}
