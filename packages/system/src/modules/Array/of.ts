import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
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

if (shouldPolyfill) {
  registerArrayStaticOp("of")(of)
}
