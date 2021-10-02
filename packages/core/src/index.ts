import { $Effect } from "@effect-ts/system"

console.log(
  $Effect.do
    .bind("x", () => $Effect.succeed(() => 1))
    .bind("y", () => $Effect.succeed(() => 2))
    ["*>"]($Effect.succeed(() => 0))
)
