import { Option } from "./type"

declare module "./type" {
  interface OptionStaticOps {
    /**
     * @ets_static emptyOf from "@effect-ts/system/Option/emptyOf"
     */
    emptyOf<A>(): Option<A>
  }
}

/**
 * @ets_module "@effect-ts/system/Option/emptyOf"
 */
export function emptyOf<A>(): Option<A> {
  return Option.none
}
