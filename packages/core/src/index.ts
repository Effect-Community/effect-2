import { $Option } from "@effect-ts/system"

console.log($Option.some(0).pipe($Option.flatMap((a) => $Option.some(a))))
console.log($Option.some(0).flatMap((a) => $Option.some(a)))
