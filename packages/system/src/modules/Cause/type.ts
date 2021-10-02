export type $Cause<E> = $Cause.Die

export class IDie {
  readonly _tag = "Die"
  constructor(readonly error: unknown) {}
}

namespace $Cause {
  export type Die = IDie
}
