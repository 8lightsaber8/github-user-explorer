export type AppState = "initial" | "loading" | "error" | "success";

export type Validator<T> = (value: unknown) => value is T;
