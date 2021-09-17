import { $T } from "@effect-ts/system"

export const x = $T.Effect.do
  .bind("x", () => $T.Effect.succeed(() => 0))
  .bind("y", () => $T.Effect.succeed(() => 0))
  .map(({ x, y }) => x + y)

console.log($T.Option.emptyOf<number>().getOrElse(() => 0))
