import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { registerOptionOp } from "./type.js"

declare module "./type" {
  interface $OptionOps extends Pipe {}
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("pipe")(__pipe)
}
