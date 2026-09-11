import { describe, expect, test } from "vitest";
import { isRepository, isRepositories } from "./repository";
import type { GithubRepository } from "@/types/github";

describe("isRepository", () => {
  const validRepository: GithubRepository = {
    name: "test-repository",
    html_url: "https://github.com/test/test-repository",
    description: "Test repository",
    language: "TypeScript",
    stargazers_count: 10,
    updated_at: "2026-01-01T00:00:00Z",
    forks_count: 5,
  };

  test("returns true for a valid repository", () => {
    expect(isRepository(validRepository)).toBe(true);
  });

  test("returns false for null", () => {
    expect(isRepository(null)).toBe(false);
  });

  test("returns false for an array", () => {
    expect(isRepository([])).toBe(false);
  });

  test("returns false when a required property is missing", () => {
    const repository = { ...validRepository };
    delete (repository as Partial<GithubRepository>).name;

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when name is not a string", () => {
    const repository = {
      ...validRepository,
      name: 123,
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when html_url is not a string", () => {
    const repository = {
      ...validRepository,
      html_url: 123,
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when description has an invalid type", () => {
    const repository = {
      ...validRepository,
      description: 123,
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when language has an invalid type", () => {
    const repository = {
      ...validRepository,
      language: 123,
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when stargazers_count is not a number", () => {
    const repository = {
      ...validRepository,
      stargazers_count: "10",
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when updated_at is not a string", () => {
    const repository = {
      ...validRepository,
      updated_at: 123,
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns false when forks_count is not a number", () => {
    const repository = {
      ...validRepository,
      forks_count: "5",
    };

    expect(isRepository(repository)).toBe(false);
  });

  test("returns true when description is null", () => {
    const repository = {
      ...validRepository,
      description: null,
    };

    expect(isRepository(repository)).toBe(true);
  });

  test("returns true when language is null", () => {
    const repository = {
      ...validRepository,
      language: null,
    };

    expect(isRepository(repository)).toBe(true);
  });

  test("returns true when both description and language are null", () => {
    const repository = {
      ...validRepository,
      description: null,
      language: null,
    };

    expect(isRepository(repository)).toBe(true);
  });
});

describe("isRepositories", () => {
  const validRepository: GithubRepository = {
    name: "test-repository",
    html_url: "https://github.com/test/test-repository",
    description: "Test repository",
    language: "TypeScript",
    stargazers_count: 10,
    updated_at: "2026-01-01T00:00:00Z",
    forks_count: 5,
  };

  test("returns true for an array of valid repositories", () => {
    const repositories: GithubRepository[] = [
      validRepository,
      {
        ...validRepository,
        name: "second-repository",
      },
    ];

    expect(isRepositories(repositories)).toBe(true);
  });

  test("returns true for an empty array", () => {
    expect(isRepositories([])).toBe(true);
  });

  test("returns false for a single repository object", () => {
    expect(isRepositories(validRepository)).toBe(false);
  });

  test("returns false for null", () => {
    expect(isRepositories(null)).toBe(false);
  });

  test("returns false when the array contains an invalid repository", () => {
    const repositories = [
      validRepository,
      {
        ...validRepository,
        name: 123,
      },
    ];

    expect(isRepositories(repositories)).toBe(false);
  });

  test("returns false when the array contains a non-object value", () => {
    const repositories = [validRepository, "invalid-repository"];

    expect(isRepositories(repositories)).toBe(false);
  });
});
