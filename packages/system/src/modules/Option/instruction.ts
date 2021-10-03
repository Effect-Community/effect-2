import { $CustomEqual } from "../CustomEqual/type.js"
import { $CustomHash } from "../CustomHash/type.js"
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

  [$CustomHash._hashFn]() {
    return $CustomHash.combineHash(
      $CustomHash.hashString(`$Option.${this._tag}`),
      $CustomHash.hash(this.value)
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

  [$CustomHash._hashFn]() {
    return $CustomHash.hashString(`$Option.${this._tag}`)
  }
}
