type RecursivePartial<T> = {
  [P in keyof T]: T[P] extends (infer U)[]
    ? U extends object
      ? RecursivePartial<U>[]
      : U[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

export const removeNullish = <T extends object>(
  obj: T
): RecursivePartial<T> => {
  return <RecursivePartial<T>>Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.length === 0
            ? value
            : value.map((item) =>
                typeof item === 'object' && item !== null
                  ? removeNullish(item)
                  : item
              )
          : typeof value === 'object' && value !== null
          ? removeNullish(value)
          : value,
      ])
  );
};
