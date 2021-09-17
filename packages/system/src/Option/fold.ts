import { ensureInstruction } from "./instruction"
import type { Option } from "./type"

declare module "./type" {
  interface OptionOps<A> {
    /**
     * @ets_method fold from "@effect-ts/system/Option/fold"
     */
    fold<A, B, C>(this: Option<A>, onNone: () => B, onSome: (a: A) => C): B | C
  }
}

/**
 * @ets_module "@effect-ts/system/Option/fold"
 */
export function fold<A, B, C>(
  self: Option<A>,
  onNone: () => B,
  onSome: (a: A) => C
): B | C {
  ensureInstruction(self)
  switch (self._tag) {
    case "Some": {
      return onSome(self._value as A)
    }
    case "None": {
      return onNone()
    }
  }
}
