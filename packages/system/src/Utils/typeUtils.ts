export const TypeUtils = {}
export declare namespace TypeUtils {
  type Flat<T> = { [k in keyof T]: T[k] } extends infer X ? X : never
}
