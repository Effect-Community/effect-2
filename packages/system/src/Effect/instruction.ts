export class ISucceed {
  readonly _tag = "ISucceed"
  constructor(readonly effect: () => unknown) {}
}

export class IFlatMap {
  readonly _tag = "IFlatMap"
  constructor(
    readonly self: Instruction,
    readonly apply: (_: unknown) => Instruction
  ) {}
}

export class IEffectTotal {
  readonly _tag = "IEffectTotal"
  constructor(readonly effect: () => unknown) {}
}

type RuntimeConfig = {}
type FiberId = {}

export class IEffectWith {
  readonly _tag = "IEffectWith"
  constructor(
    readonly effect: (runtimeConfig: RuntimeConfig, fiberId: FiberId) => unknown
  ) {}
}

export class ISuspend {
  readonly _tag = "ISuspend"
  constructor(readonly make: () => Instruction) {}
}

export class ISuspendWith {
  readonly _tag = "ISuspendWith"
  constructor(
    readonly make: (runtimeConfig: RuntimeConfig, fiberId: FiberId) => Instruction
  ) {}
}

type Either<E, A> = {}
type Canceler = {}

export class IEffectAsync {
  readonly _tag = "IEffectAsync"
  constructor(
    readonly register: (
      done: (effect: Instruction) => void
    ) => Either<Canceler, Instruction>,
    readonly blockingOn: () => FiberId
  ) {}
}

type Cause<E> = {}

export class IFold {
  readonly _tag = "IFold"
  constructor(
    readonly self: Instruction,
    readonly failure: (error: Cause<unknown>) => Instruction,
    readonly apply: (result: unknown) => Instruction
  ) {}
}

export type Instruction =
  | ISucceed
  | IFlatMap
  | IEffectTotal
  | IEffectWith
  | ISuspend
  | IEffectAsync
  | IFold
