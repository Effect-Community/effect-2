import { $CustomEqual } from "../CustomEqual/type.js"
import type { $Option, $OptionOps } from "./type.js"

export const optionId: unique symbol = Symbol.for(
  "@effect-ts/system/modules/Option/optionId"
)

export interface ISome<A> extends $OptionOps {}
export class ISome<A> implements $Option.Some<A> {
  readonly _tag = "Some";
  readonly [optionId] = true
  constructor(readonly value: A) {}

  [$CustomEqual._equalFn](that: any) {
    return (
      typeof that === "object" &&
      that != null &&
      optionId in that &&
      that["_tag"] === this._tag &&
      $CustomEqual.equals(this.value, that["value"])
    )
  }

  [$CustomEqual._hashFn]() {
    return $CustomEqual.combineHash(
      $CustomEqual.hashString(`$Option.${this._tag}`),
      $CustomEqual.hash(this.value)
    )
  }
}

export interface INone extends $OptionOps {}
export class INone implements $Option.None {
  readonly _tag = "None";
  readonly [optionId] = true;

  [$CustomEqual._equalFn](that: any) {
    return (
      typeof that === "object" &&
      that != null &&
      optionId in that &&
      that["_tag"] === this._tag
    )
  }

  [$CustomEqual._hashFn]() {
    return $CustomEqual.hashString(`$Option.${this._tag}`)
  }
}
