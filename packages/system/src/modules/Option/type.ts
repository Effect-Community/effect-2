import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"
import { INone, ISome } from "./instruction.js"

export declare const _OptionId: unique symbol

export type $Option<A> = $Option.Some<A> | $Option.None

export interface $OptionOps {
  readonly [_Internal]: {
    readonly [_OptionId]: typeof _OptionId
  }
}

export interface $OptionStaticOps {}
export const $Option = {} as $OptionStaticOps

export const registerOptionOp =
  /* #__PURE__ */
  polyfiller<$OptionOps>(ISome.prototype, INone.prototype)

export const registerOptionStaticOp =
  /* #__PURE__ */
  polyfiller<$OptionStaticOps>($Option)

export namespace $Option {
  export type Option<A> = $Option<A>

  export interface None extends $OptionOps {
    readonly _tag: "None"
  }

  export interface Some<A> extends $OptionOps {
    readonly _tag: "Some"
    readonly value: A
  }

  export type _A<T> = [T] extends [Option<infer A>] ? A : never
}
