import { describe, expect, test } from "vitest";
import { getTotalPages, paginateRepositories } from "./repository-pagination";
import type { Repositories } from "@/types/repository";

describe("getTotalPages", () => {
  test("calculates total pages", () => {
    const repos = Array(60);
    const itemsPerPage = 30;

    const result = getTotalPages(repos, itemsPerPage);

    expect(result).toBe(2);
  });

  test("calculates an extra page when repositories don't fit evenly", () => {
    const repos = Array(61);
    const itemsPerPage = 30;

    const result = getTotalPages(repos, itemsPerPage);

    expect(result).toBe(3);
  });

  test("returns one page when repositories fit exactly", () => {
    const repos = Array(30);
    const itemsPerPage = 30;

    const result = getTotalPages(repos, itemsPerPage);

    expect(result).toBe(1);
  });

  test("returns zero pages when there are no repositories", () => {
    const repos = Array(0);
    const itemsPerPage = 30;

    const result = getTotalPages(repos, itemsPerPage);

    expect(result).toBe(0);
  });
});

describe("paginateRepositories", () => {
  const repos: Repositories = [
    {
      name: "repo-1",
      htmlUrl: "https://github.com/test/repo-1",
      description: "Repository 1",
      language: "TypeScript",
      stargazersCount: 10,
      forksCount: 2,
      updatedAt: "2026-01-01T00:00:00Z",
    },
    {
      name: "repo-2",
      htmlUrl: "https://github.com/test/repo-2",
      description: "Repository 2",
      language: "JavaScript",
      stargazersCount: 20,
      forksCount: 4,
      updatedAt: "2026-01-02T00:00:00Z",
    },
    {
      name: "repo-3",
      htmlUrl: "https://github.com/test/repo-3",
      description: null,
      language: "TypeScript",
      stargazersCount: 30,
      forksCount: 6,
      updatedAt: "2026-01-03T00:00:00Z",
    },
    {
      name: "repo-4",
      htmlUrl: "https://github.com/test/repo-4",
      description: "Repository 4",
      language: null,
      stargazersCount: 40,
      forksCount: 8,
      updatedAt: "2026-01-04T00:00:00Z",
    },
    {
      name: "repo-5",
      htmlUrl: "https://github.com/test/repo-5",
      description: "Repository 5",
      language: "JavaScript",
      stargazersCount: 50,
      forksCount: 10,
      updatedAt: "2026-01-05T00:00:00Z",
    },
  ];

  test("returns repositories for the first page", () => {
    const result = paginateRepositories(repos, 2, 1);

    expect(result).toEqual([repos[0], repos[1]]);
  });

  test("returns repositories for a middle page", () => {
    const result = paginateRepositories(repos, 2, 2);

    expect(result).toEqual([repos[2], repos[3]]);
  });

  test("returns remaining repositories for the last page", () => {
    const result = paginateRepositories(repos, 2, 3);

    expect(result).toEqual([repos[4]]);
  });

  test("returns an empty array when page is out of range", () => {
    const result = paginateRepositories(repos, 2, 4);

    expect(result).toEqual([]);
  });

  test("does not mutate the original repositories array", () => {
    const originalRepos = [...repos];

    paginateRepositories(repos, 2, 2);

    expect(repos).toEqual(originalRepos);
  });
});
