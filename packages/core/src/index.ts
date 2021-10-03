import { $CustomEqual, $Effect, $Option } from "@effect-ts/system"

console.log(
  $Effect.do
    .bind("x", () => $Effect.succeed(() => 1))
    .bind("y", () => $Effect.succeed(() => 2))
    ["*>"]($Effect.succeed(() => 0))
)

console.log("T", $Option.some(0).equals($Option.some(0)))
console.log("F", $Option.some(0).equals($Option.some(1)))
console.log("F", $Option.some(0).equals($Option.none))
console.log("F", $Option.some(0).equals(0))
console.log("T", $Option.emptyOf().equals($Option.none))
console.log("T", $CustomEqual.equals($Option.emptyOf(), $Option.none))
console.log("F", $CustomEqual.equals($Option.emptyOf(), $Option.some("0")))
console.log("F", $CustomEqual.equals($Option.some("0"), $Option.some(1)))
