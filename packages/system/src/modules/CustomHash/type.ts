import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"

export const _hashFn: unique symbol = Symbol.for(
  "@effect-ts/system/modules/CustomHash/hashFn"
)

export type $CustomHash = $CustomHash.CustomHash

export interface $CustomHashStaticOps {
  /**
   * @ets_static _hashFn from "@effect-ts/system/modules/CustomHash/type"
   */
  _hashFn: typeof _hashFn
}

export const $CustomHash = {} as $CustomHashStaticOps

export const registerCustomHashStaticOp =
  /* #__PURE__ */
  polyfiller<$CustomHashStaticOps>($CustomHash)

export namespace $CustomHash {
  export interface CustomHash {
    [_hashFn](this: this): number
  }
}

if (shouldPolyfill) {
  registerCustomHashStaticOp("_hashFn")(_hashFn)
}
