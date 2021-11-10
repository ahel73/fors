export type PathsToStringProps<T> = T extends string | number | boolean
  ? []
  : {
    [K in Extract<keyof T, string>]: T[K] extends T ? never : [K, ...PathsToStringProps<T[K]>]
  }[Extract<keyof T, string>];
