import { $Array, $Effect, $Option } from "@effect-ts/system"

console.log($Option.some(0).pipe($Option.flatMap((a) => $Option.some(a))))
console.log($Option.some(0).flatMap((a) => $Option.some(a)))

console.log(
  $Effect.do
    .bind("x", () => $Effect.succeed(() => 1))
    .bind("y", () => $Effect.succeed(() => 2))
    .bind("z", ({ x, y }) => $Effect.succeed(() => x + y))
    .map(({ z }) => z)
    .forever()
)

console.log($Array.of(0).get(0))
