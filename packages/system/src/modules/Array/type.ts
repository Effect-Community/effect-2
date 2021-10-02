import type { _A, _Internal } from "../Effect/type.js"
import { polyfiller } from "../Utils/polyfiller.js"

declare global {
  interface ReadonlyArray<T> extends $ArrayOps {}
  interface Array<T> extends $ArrayOps {}
}

export interface $Array<A> extends ReadonlyArray<A> {}

export interface $ArrayOps {}
export interface $ArrayStaticOps {}
export const $Array = {} as $ArrayStaticOps

export const registerArrayOp =
  /* #__PURE__ */
  polyfiller<$ArrayOps>(Array.prototype)

export const registerArrayStaticOp =
  /* #__PURE__ */
  polyfiller<$ArrayStaticOps>($Array)

export namespace $Array {
  export type _OutOf<T> = [T] extends [Array<infer A>] ? A : never
}
