import { GITHUB_API_URL } from "./constants";
import type { Repositories } from "@/types/repository";
import type { User } from "@/types/user";
import { request } from "./request";
import { isUser } from "@/validators/user";
import { isRepositories } from "@/validators/repository";
import { getNextPage } from "./pagination";

export async function getUser(
  username: string,
  signal: AbortSignal,
): Promise<User> {
  const encodedUsername = encodeURIComponent(username);
  const url = `${GITHUB_API_URL}${encodedUsername}`;

  const response = await request(url, isUser, signal);
  const json = response.data;

  const user: User = {
    avatarUrl: json.avatar_url,
    name: json.name,
    login: json.login,
    bio: json.bio,
    htmlUrl: json.html_url,
    publicRepos: json.public_repos,
    followers: json.followers,
    following: json.following,
    location: json.location,
    company: json.company,
    createdAt: json.created_at,
  };

  return user;
}

export async function getRepos(
  username: string,
  signal: AbortSignal,
): Promise<Repositories> {
  let pageNumber: number | null = 1;

  const allRepositories: Repositories = [];

  const encodedUsername = encodeURIComponent(username);

  while (pageNumber !== null) {
    const params = new URLSearchParams({
      page: pageNumber.toString(),
      per_page: "100",
    });

    const url = `${GITHUB_API_URL}${encodedUsername}/repos?${params}`;

    const response = await request(url, isRepositories, signal);

    const repositories = response.data.map((value) => ({
      name: value.name,
      htmlUrl: value.html_url,
      description: value.description,
      language: value.language,
      stargazersCount: value.stargazers_count,
      forksCount: value.forks_count,
      updatedAt: value.updated_at,
    }));
    allRepositories.push(...repositories);

    pageNumber = getNextPage(response.headers);
  }

  return allRepositories;
}
