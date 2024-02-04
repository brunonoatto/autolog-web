export type TListenerFn = () => void;
export type TListener = Set<TListenerFn>;

type TSetterFn<T> = (partialState: T) => Partial<T>;
export type TSetState<T> = (partialState: Partial<T> | TSetterFn<T>) => void;
