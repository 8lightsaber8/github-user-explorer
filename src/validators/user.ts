import type { GithubUser } from "@/types/github";
import { isObject } from "./utils";

export function isUser(value: unknown): value is GithubUser {
  return (
    isObject(value) &&
    typeof value.avatar_url === "string" &&
    (typeof value.name === "string" || value.name === null) &&
    typeof value.login === "string" &&
    (typeof value.bio === "string" || value.bio === null) &&
    typeof value.html_url === "string" &&
    typeof value.public_repos === "number" &&
    typeof value.followers === "number" &&
    typeof value.following === "number" &&
    (typeof value.location === "string" || value.location === null) &&
    (typeof value.company === "string" || value.company === null) &&
    typeof value.created_at === "string"
  );
}
