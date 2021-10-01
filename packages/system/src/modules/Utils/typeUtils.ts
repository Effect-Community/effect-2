import { proxyAccess } from "./proxyAccess"

export const $TypeUtils =
  /* #__PURE__ */
  proxyAccess({})

export declare namespace $TypeUtils {
  type Flat<T> = { [k in keyof T]: T[k] } extends infer X ? X : never
}
