import { unsafeCoerce } from "../Utils/coerce"
import type { $Option } from "./type"

export class ISome {
  readonly _tag = "Some"
  constructor(readonly value: unknown) {}
}

export class INone {
  readonly _tag = "None"
}

export type Instruction = ISome | INone

/**
 * @ets_optimize identity
 */
export function toInstruction<A>(value: $Option<A>): Instruction {
  return unsafeCoerce(value)
}

/**
 * @ets_optimize remove
 */
export function ensureInstruction<A>(
  value: $Option<A>
): asserts value is Instruction & $Option<A> {
  return
}
