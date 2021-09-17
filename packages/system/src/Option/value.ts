import { constUndefined } from "../Utils/constUndefined"
import { identity } from "../Utils/identity"
import type { Option } from "./type"

declare module "./type" {
  interface OptionOps<A> {
    /**
     * @ets_method value from "@effect-ts/system/Option/value"
     */
    readonly value: A | undefined
  }
}

/**
 * @ets_module "@effect-ts/system/Option/value"
 */
export function value<A>(self: Option<A>): A | undefined {
  return self.fold(constUndefined, identity)
}
