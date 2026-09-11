import { describe, expect, test } from "vitest";
import { sortRepositories } from "./repository-sort";
import type { Repositories } from "@/types/repository";

describe("sortRepositories", () => {
  const repos: Repositories = [
    {
      name: "zebra",
      htmlUrl: "https://github.com/test/zebra",
      description: "Zebra repository",
      language: "TypeScript",
      stargazersCount: 10,
      forksCount: 2,
      updatedAt: "2026-01-01T00:00:00Z",
    },
    {
      name: "alpha",
      htmlUrl: "https://github.com/test/alpha",
      description: "Alpha repository",
      language: "JavaScript",
      stargazersCount: 50,
      forksCount: 10,
      updatedAt: "2026-03-01T00:00:00Z",
    },
    {
      name: "middle",
      htmlUrl: "https://github.com/test/middle",
      description: null,
      language: "TypeScript",
      stargazersCount: 30,
      forksCount: 5,
      updatedAt: "2026-02-01T00:00:00Z",
    },
  ];

  test("sorts repositories by updated date, newest first", () => {
    const result = sortRepositories(repos, "updated");

    expect(result).toEqual([repos[1], repos[2], repos[0]]);
  });

  test("sorts repositories by stars, highest first", () => {
    const result = sortRepositories(repos, "stars");

    expect(result).toEqual([repos[1], repos[2], repos[0]]);
  });

  test("sorts repositories by name, alphabetically", () => {
    const result = sortRepositories(repos, "name");

    expect(result).toEqual([repos[1], repos[2], repos[0]]);
  });

  test("does not mutate the original repositories array", () => {
    const originalRepos = [...repos];

    sortRepositories(repos, "stars");

    expect(repos).toEqual(originalRepos);
  });

  test("returns a new array", () => {
    const result = sortRepositories(repos, "stars");

    expect(result).not.toBe(repos);
  });

  test("returns an empty array when repositories are empty", () => {
    const result = sortRepositories([], "stars");

    expect(result).toEqual([]);
  });

  test("returns the same repository when there is only one repository", () => {
    const singleRepo = [repos[0]];

    const result = sortRepositories(singleRepo, "name");

    expect(result).toEqual(singleRepo);
    expect(result).not.toBe(singleRepo);
  });
});
