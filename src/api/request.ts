import {
  UserNotFoundError,
  RateLimitError,
  ApiError,
  NetworkError,
  InvalidResponseError,
} from "@/errors/app-errors";
import type { Validator } from "@/types/app";

export async function request<T>(
  url: string,
  validator: Validator<T>,
  signal: AbortSignal,
): Promise<{
  data: T;
  headers: Headers;
}> {
  let response: Response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }
    throw new NetworkError();
  }

  if (response.status === 404) {
    throw new UserNotFoundError();
  }

  if (response.status === 429) {
    throw new RateLimitError();
  }

  if (
    response.status === 403 &&
    response.headers.get("x-ratelimit-remaining") === "0"
  ) {
    throw new RateLimitError();
  }

  if (response.status === 403) {
    throw new ApiError(403);
  }

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new InvalidResponseError();
  }

  if (validator(data)) {
    return {
      data,
      headers: response.headers,
    };
  }
  throw new InvalidResponseError();
}
