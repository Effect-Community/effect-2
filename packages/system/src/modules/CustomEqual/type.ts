import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"

export const _equal: unique symbol = Symbol.for(
  "@effect-ts/system/modules/CustomEqual/equal"
)

export type $CustomEqual = $CustomEqual.CustomEqual

export interface $CustomEqualStaticOps {}
export const $CustomEqual = {} as $CustomEqualStaticOps

export const registerCustomEqualStaticOp =
  /* #__PURE__ */
  polyfiller<$CustomEqualStaticOps>($CustomEqual)

export namespace $CustomEqual {
  export interface CustomEqual {
    [_equal](this: this, that: any): boolean
  }
}
