import type { Pipe } from "../Utils/pipe"
import { __pipe } from "../Utils/pipe"
import { registerOptionOp } from "./type"

declare module "./type" {
  interface $OptionOps extends Pipe {}
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("pipe")(__pipe)
}
