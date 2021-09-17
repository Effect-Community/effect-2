import { Effect } from "@effect-ts/system/Effect"
import { TypeUtils } from "@effect-ts/system/Utils/typeUtils"

// @ts-expect-error
export declare namespace $T {
  export { Effect, TypeUtils }
}

export { Effect, TypeUtils }

// @ts-expect-error
export const $T = {}
