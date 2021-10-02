import { O, pipe, T } from "./prelude"

function z(): T<unknown, never, number> {
  return pipe(
    T.do,
    T.bind("x", () => T.succeed(() => 0)),
    T.bind("y", () => T.succeed(() => 0)),
    T.bind("z", ({ x, y }) => T.succeed(() => x + y)),
    T.map(({ z }) => z)
  )
}

function x(): O<number> {
  return pipe(
    O.some(0),
    O.flatMap((x) => O.some(x + 2))
  )
}

console.log(z())
console.log(x())
