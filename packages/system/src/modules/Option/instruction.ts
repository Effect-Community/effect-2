import { $CustomEqual } from "../CustomEqual.js"
import type { $Option, $OptionOps } from "./type.js"

export const optionId = Symbol.for("@effect-ts/system/modules/Option/optionId")

export interface ISome<A> extends $OptionOps {}
export class ISome<A> implements $Option.Some<A> {
  readonly _tag = "Some";
  readonly [optionId] = true
  constructor(readonly value: A) {}

  [$CustomEqual._equal](that: any) {
    return (
      typeof that === "object" &&
      that != null &&
      optionId in that &&
      that["_tag"] === this._tag &&
      $CustomEqual.equals(this.value, that["value"])
    )
  }
}

export interface INone extends $OptionOps {}
export class INone implements $Option.None {
  readonly _tag = "None";
  readonly [optionId] = true;

  [$CustomEqual._equal](that: any) {
    return (
      typeof that === "object" &&
      that != null &&
      optionId in that &&
      that["_tag"] === this._tag
    )
  }
}
