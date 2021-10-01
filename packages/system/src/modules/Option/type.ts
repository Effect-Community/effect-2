import type { _A, _Internal } from "../Effect/type"
import { polyfiller } from "../Utils/polyfiller"
import { INone, ISome } from "./instruction"

export declare const _OptionId: unique symbol

export interface $Option<A> extends $OptionOps {
  readonly [_Internal]: {
    readonly [_OptionId]: typeof _OptionId
    readonly [_A]: () => A
  }
}

export interface $OptionOps {}
export interface $OptionStaticOps {}
export const $Option = {} as $OptionStaticOps

export const registerOptionOp =
  /* #__PURE__ */
  polyfiller<$OptionOps>(ISome.prototype, INone.prototype)

export const registerOptionStaticOp =
  /* #__PURE__ */
  polyfiller<$OptionStaticOps>($Option)

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
