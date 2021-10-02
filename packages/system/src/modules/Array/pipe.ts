import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { registerArrayOp } from "./type.js"

declare module "./type" {
  interface $ArrayOps extends Pipe {}
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerArrayOp("pipe")(__pipe)
}
