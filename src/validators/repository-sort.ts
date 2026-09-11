import type { RepositorySort } from "@/types/repository";

export function isRepositorySort(value: unknown): value is RepositorySort {
  return value === "updated" || value === "stars" || value === "name";
}
