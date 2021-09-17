import { ISome } from "./instruction"
import type { Option } from "./type"

declare module "./type" {
  interface OptionStaticOps {
    /**
     * @ets_static some from "@effect-ts/system/Option/some"
     */
    some<A>(value: A): Option<A>
  }
}

/**
 * @ets_module "@effect-ts/system/Option/some"
 */
export function some<A>(value: A): Option<A> {
  // @ts-expect-error
  return new ISome(value)
}
