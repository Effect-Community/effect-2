import { identity } from "../Utils/identity"
import type { Option } from "./type"

declare module "./type" {
  interface OptionOps<A> {
    /**
     * @ets_method getOrElse from "@effect-ts/system/Option/getOrElse"
     */
    getOrElse<A, B>(this: Option<A>, orElse: () => B): A | B
  }
}

/**
 * @ets_module "@effect-ts/system/Option/getOrElse"
 */
export function getOrElse<A, B>(self: Option<A>, orElse: () => B): A | B {
  return self.fold(orElse, identity)
}
