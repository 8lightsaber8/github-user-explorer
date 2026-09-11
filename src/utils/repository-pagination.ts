import type { Repositories } from "@/types/repository";

export function getTotalPages(repos: Repositories, itemsPerPage: number) {
  const totalPages = Math.ceil(repos.length / itemsPerPage);

  return totalPages;
}

export function paginateRepositories(
  repos: Repositories,
  itemsPerPage: number,
  currentPage: number,
) {
  const start = itemsPerPage * (currentPage - 1);
  const end = start + itemsPerPage;

  const currentRepos = repos.slice(start, end);

  return currentRepos;
}
