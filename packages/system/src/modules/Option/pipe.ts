import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { registerOptionOp } from "./type.js"

declare module "./type" {
  interface $OptionOps extends Pipe {}
}

if (shouldPolyfill) {
  registerOptionOp("pipe")(__pipe)
}
