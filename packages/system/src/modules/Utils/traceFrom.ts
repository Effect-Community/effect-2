export function traceFrom<X, Y>(
  args: [string | X | undefined, ...(X | Y)[]]
): readonly [string | undefined, (X | Y)[]] {
  if (
    (args.length > 0 && typeof args[0] === "undefined") ||
    typeof args[0] === "string"
  ) {
    // @ts-expect-error
    return [args[0], args.slice(1, args.length)] as const
  }
  // @ts-expect-error
  return [undefined, args] as const
}
