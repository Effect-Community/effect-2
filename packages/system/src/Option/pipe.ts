import { $OptionOps } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method pipe
     */
    pipe<A, B>(this: A, f: (a: A) => B): B
  }
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  $OptionOps.pipe = function (f) {
    return f(this)
  }
}
