import { T } from "./prelude.js"

console.log(
  T.do()
    .bind("x", () => T.succeed(() => 1))
    .bind("y", () => T.succeed(() => 2))
    ["*>"](T.succeed(() => 0))
)
