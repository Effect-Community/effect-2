import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { registerArrayOp } from "./type.js"

declare module "./type" {
  interface $ArrayOps extends Pipe {}
}

if (shouldPolyfill) {
  registerArrayOp("pipe")(__pipe)
}
