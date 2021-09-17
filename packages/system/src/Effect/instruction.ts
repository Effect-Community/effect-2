export class ISucceed {
  readonly _tag = "Succeed"
  constructor(readonly thunk: () => unknown) {}
}

export class IFlatMap {
  readonly _tag = "FlatMap"
  constructor(readonly self: Instruction, readonly f: (_: unknown) => Instruction) {}
}

export type Instruction = ISucceed | IFlatMap
