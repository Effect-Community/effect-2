import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { shouldPolyfill } from "../Utils/shouldPolyfill.js"
import { registerEffectOp } from "./type.js"

declare module "./type" {
  interface $EffectOps extends Pipe {}
}

if (shouldPolyfill) {
  registerEffectOp("pipe")(__pipe)
}
