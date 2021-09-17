import { INone } from "./instruction"
import type { Option } from "./type"

declare module "./type" {
  interface OptionStaticOps {
    /**
     * @ets_static none from "@effect-ts/system/Option/none"
     */
    none: Option<never>
  }
}

/**
 * @ets_module "@effect-ts/system/Option/none"
 */
export const none = new INone() as unknown as Option<never>
