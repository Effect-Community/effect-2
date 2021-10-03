import type { $CustomHash } from "../CustomHash/type.js"
import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"

export const _equalFn: unique symbol = Symbol.for(
  "@effect-ts/system/modules/CustomEqual/equalFn"
)

export type $CustomEqual = $CustomEqual.CustomEqual

export interface $CustomEqualStaticOps {
  /**
   * @ets_static _equalFn from "@effect-ts/system/modules/CustomEqual/type"
   */
  _equalFn: typeof _equalFn
}

export const $CustomEqual = {} as $CustomEqualStaticOps

export const registerCustomEqualStaticOp =
  /* #__PURE__ */
  polyfiller<$CustomEqualStaticOps>($CustomEqual)

export namespace $CustomEqual {
  export interface CustomEqual extends $CustomHash {
    [_equalFn](this: this, that: any): boolean
  }
}

if (shouldPolyfill) {
  registerCustomEqualStaticOp("_equalFn")(_equalFn)
}
