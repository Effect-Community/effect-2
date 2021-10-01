import { registerArrayOp } from "./type"

declare module "./type" {
  interface $ArrayOps {
    /**
     * @ets_method pipe
     */
    pipe<A, B>(this: A, f: (a: A) => B): B
  }
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerArrayOp("pipe")(function (f) {
    return f(this)
  })
}
