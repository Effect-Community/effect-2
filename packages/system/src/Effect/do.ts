import { Effect } from "./type"

declare module "./type" {
  interface EffectStaticOps {
    /**
     * @ets_static do_ from "@effect-ts/system/Effect/do"
     */
    do: typeof do_
  }
}

/**
 * @ets_module "@effect-ts/system/Effect/do"
 */
export const do_ = Effect.succeed(() => ({}))
