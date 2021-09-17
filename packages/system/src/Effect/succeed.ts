// @ets_relative "@effect-ts/system/Effect"

import { ISucceed } from "./instruction"
import type { Effect } from "./type"

declare module "./type" {
  interface EffectStaticOps {
    /**
     * @ets_static succeed from "@effect-ts/system/Effect/succeed"
     */
    succeed<A>(thunk: () => A): Effect.IO<A>
  }
}

/**
 * @ets_module "@effect-ts/system/Effect/succeed"
 */
export function succeed<A>(thunk: () => A): Effect.IO<A> {
  // @ts-expect-error
  return new ISucceed(thunk)
}
