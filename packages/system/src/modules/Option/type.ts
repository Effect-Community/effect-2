import type { $CustomEqual } from "../CustomEqual.js"
import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"
import { INone, ISome } from "./instruction.js"

export declare const _OptionId: unique symbol

export type $Option<A> = $Option.Option<A>

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
  export type Option<A> = Some<A> | None

  export interface None extends $OptionOps, $CustomEqual {
    readonly _tag: "None"
  }

  export interface Some<A> extends $OptionOps, $CustomEqual {
    readonly _tag: "Some"
    readonly value: A
  }

  export type _A<T> = [T] extends [Option<infer A>] ? A : never
}
