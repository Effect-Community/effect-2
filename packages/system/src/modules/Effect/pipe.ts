import type { Pipe } from "../Utils/pipe"
import { __pipe } from "../Utils/pipe"
import { registerEffectOp } from "./type"

declare module "./type" {
  interface $EffectOps extends Pipe {}
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("pipe")(__pipe)
}
