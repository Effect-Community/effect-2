import type { _A, _Internal } from "../Effect/type"
import { IOption } from "./instruction"

export declare const _OptionId: unique symbol

export interface $Option<A> extends $OptionOps {
  readonly [_Internal]: {
    readonly [_OptionId]: typeof _OptionId
    readonly [_A]: () => A
  }
}

export interface $OptionOps {}

// @ts-expect-error
export const $OptionOps: $OptionOps = IOption.prototype

// @ts-expect-error
export const $OptionStaticOps: $OptionStaticOps = IOption

export interface $OptionStaticOps {}

export const $Option = $OptionStaticOps

export namespace $Option {
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
