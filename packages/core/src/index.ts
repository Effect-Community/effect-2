import { T } from "./prelude.js"

console.log(T.flatMap((x: number) => T.succeed(() => x + 1))(T.succeed(() => 0)))
