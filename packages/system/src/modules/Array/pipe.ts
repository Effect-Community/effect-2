import type { Pipe } from "../Utils/pipe"
import { __pipe } from "../Utils/pipe"
import { registerArrayOp } from "./type"

declare module "./type" {
  interface $ArrayOps extends Pipe {}
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerArrayOp("pipe")(__pipe)
}
