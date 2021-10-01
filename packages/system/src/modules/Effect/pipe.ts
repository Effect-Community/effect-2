import { registerEffectOp } from "./type"

declare module "./type" {
  interface $EffectOps {
    /**
     * @ets_method pipe
     */
    pipe<A, B>(this: A, f: (a: A) => B): B
  }
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerEffectOp("pipe")(function (f) {
    return f(this)
  })
}
