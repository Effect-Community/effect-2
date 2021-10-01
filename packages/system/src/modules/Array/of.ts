import type { $ArrayStaticOps } from "./type"
import { registerArrayStaticOp } from "./type"

declare module "./type" {
  interface $ArrayStaticOps {
    /**
     * @ets_static of from "@effect-ts/system/modules/Array/of"
     */
    of<A>(value: A): $Array<A>
  }
}

export const of: $ArrayStaticOps["of"] = (a) => [a]

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerArrayStaticOp("of")(of)
}
