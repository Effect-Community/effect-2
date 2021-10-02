import type { $Array } from "@effect-ts/system/index.js"

export interface $Tuple<X extends $Array<any>> {
  readonly tuple: { readonly [k in keyof X]: X[k] }
}
