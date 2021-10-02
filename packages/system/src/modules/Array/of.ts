import type { $ArrayStaticOps } from "./type.js"
import { registerArrayStaticOp } from "./type.js"

declare module "./type" {
  interface $ArrayStaticOps {
    /**
     * @ets_static of from "@effect-ts/system/modules/Array/of"
     */
    of<A>(value: A): $Array<A>
  }
}

export const of: $ArrayStaticOps["of"] = (a) => [a]

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerArrayStaticOp("of")(of)
}
