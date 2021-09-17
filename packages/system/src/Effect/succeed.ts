import { ISucceed } from "@effect-ts/system/Effect/instruction"
import type { Effect } from "@effect-ts/system/Effect/type"

declare module "@effect-ts/system/Effect/type" {
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
