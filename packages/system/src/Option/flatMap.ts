import { Option } from "./type"

declare module "./type" {
  interface OptionOps<A> {
    /**
     * @ets_method flatMap from "@effect-ts/system/Option/flatMap"
     */
    flatMap<A, B>(this: Option<A>, f: (a: A) => Option<B>): Option<B>
  }
}

/**
 * @ets_module "@effect-ts/system/Option/flatMap"
 */
export function flatMap<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return self.fold(() => Option.none, f)
}
