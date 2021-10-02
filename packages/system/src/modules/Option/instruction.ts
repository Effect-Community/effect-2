import type { $Option } from "@effect-ts/system"

import type { $OptionOps } from "./type"

export interface ISome<A> extends $OptionOps {}
export class ISome<A> implements $Option.Some<A> {
  readonly _tag = "Some"
  constructor(readonly value: A) {}
}

export interface INone extends $OptionOps {}
export class INone implements $Option.None {
  readonly _tag = "None"
}
