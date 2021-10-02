import { O, pipe, T } from "./prelude"

function z(): T<unknown, never, number> {
  return pipe(
    T.succeed(() => 0),
    T.map((x) => x + 1),
    T.map((x) => x + 2)
  )["*>"](T.succeed(() => 3))
}

function x(): O<number> {
  return pipe(
    O.some(0),
    O.flatMap((x) => O.some(x + 2))
  )
}

console.log(z())
console.log(x())
