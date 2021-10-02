import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { registerOptionOp } from "./type.js"

declare module "./type" {
  interface $OptionOps extends Pipe {}
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerOptionOp("pipe")(__pipe)
}
