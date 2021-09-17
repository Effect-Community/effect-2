import type { _A } from "../Effect/type"
import { proxyAccess } from "../Utils/proxyAccess"

export declare const _OptionId: unique symbol

export interface Option<A> extends OptionOps<A> {
  readonly [_OptionId]: typeof _OptionId
  readonly [_A]: () => A
}

export interface OptionOps<A> {}
export interface OptionStaticOps {}

export const Option = proxyAccess({} as OptionStaticOps)
