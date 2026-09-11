export class AppError extends Error {
  solution: string;

  constructor(message: string, solution: string) {
    super(message);
    this.solution = solution;
    this.name = "AppError";
  }
}

export class UserNotFoundError extends AppError {
  constructor() {
    super(
      "User not found",
      "Check the spelling or try searching for a different user.",
    );
    this.name = "UserNotFoundError";
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(
      "GitHub API rate limit exceeded.",
      "Please wait a while and try again later.",
    );
    this.name = "RateLimitError";
  }
}

export class ApiError extends AppError {
  status: number;

  constructor(status: number) {
    super(
      `GitHub API request failed with status ${status}.`,
      "Please try again later.",
    );
    this.name = "ApiError";
    this.status = status;
  }
}

export class NetworkError extends AppError {
  constructor() {
    super(
      "Unable to connect to GitHub.",
      "Check your internet connection and try again.",
    );
    this.name = "NetworkError";
  }
}

export class InvalidResponseError extends AppError {
  constructor() {
    super("Invalid response from GitHub.", "Please try again later.");

    this.name = "InvalidResponseError";
  }
}
