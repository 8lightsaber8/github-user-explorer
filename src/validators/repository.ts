import type { GithubRepository } from "@/types/github";
import { isObject } from "./utils";

export function isRepository(value: unknown): value is GithubRepository {
  return (
    isObject(value) &&
    typeof value.name === "string" &&
    typeof value.html_url === "string" &&
    (typeof value.description === "string" || value.description === null) &&
    (typeof value.language === "string" || value.language === null) &&
    typeof value.stargazers_count === "number" &&
    typeof value.updated_at === "string" &&
    typeof value.forks_count === "number"
  );
}

export function isRepositories(value: unknown): value is GithubRepository[] {
  return Array.isArray(value) && value.every(isRepository);
}
