import { ensureInstruction } from "./instruction"
import type { $OptionOps, $OptionStaticOps } from "./type"
import { registerOptionOp, registerOptionStaticOp } from "./type"

declare module "./type" {
  interface $OptionOps {
    /**
     * @ets_method fold_ from "@effect-ts/system/modules/Option/fold"
     */
    fold<A, B, C>(this: $Option<A>, onNone: () => B, onSome: (a: A) => C): B | C
  }
  interface $OptionStaticOps {
    /**
     * @ets_static fold from "@effect-ts/system/modules/Option/fold"
     * @ets_unpipe fold_
     */
    fold<A, B, C>(onNone: () => B, onSome: (a: A) => C): (self: $Option<A>) => B | C
  }
}

export const fold_: $OptionOps["fold"] = function (onNone, onSome) {
  ensureInstruction(this)
  switch (this._tag) {
    case "Some": {
      // @ts-expect-error
      return onSome(this._value)
    }
    case "None": {
      return onNone()
    }
  }
}

export const fold: $OptionStaticOps["fold"] = function (onNone, onSome) {
  return (self) => self.fold(onNone, onSome)
}

if (typeof ETS_PLUGIN === "undefined" || !ETS_PLUGIN) {
  registerOptionOp("fold")(fold_)
  registerOptionStaticOp("fold")(fold)
}
