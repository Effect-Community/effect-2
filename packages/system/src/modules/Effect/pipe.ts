import type { Pipe } from "../Utils/pipe.js"
import { __pipe } from "../Utils/pipe.js"
import { registerEffectOp } from "./type.js"

declare module "./type" {
  interface $EffectOps extends Pipe {}
}

if (typeof globalThis.ETS_PLUGIN === "undefined" || !globalThis.ETS_PLUGIN) {
  registerEffectOp("pipe")(__pipe)
}
