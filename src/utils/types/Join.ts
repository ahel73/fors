export type Join<T extends string[], D extends string> =
  T extends [] ? never :
  T extends [infer F] ? F :
  T extends [infer F, ...infer R] ?
  F extends string ?
  string extends F ? string :
  `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;
