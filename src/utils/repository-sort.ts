import type { Repositories, RepositorySort } from "@/types/repository";

export function sortRepositories(
  repos: Repositories,
  sort: RepositorySort,
): Repositories {
  switch (sort) {
    case "updated": {
      const sortedRepos = repos.toSorted((repo1, repo2) => {
        return (
          new Date(repo2.updatedAt).getTime() -
          new Date(repo1.updatedAt).getTime()
        );
      });

      return sortedRepos;
    }

    case "stars": {
      const sortedRepos = repos.toSorted((repo1, repo2) => {
        return repo2.stargazersCount - repo1.stargazersCount;
      });

      return sortedRepos;
    }

    case "name": {
      const sortedRepos = repos.toSorted((repo1, repo2) => {
        const name1 = repo1.name;
        const name2 = repo2.name;
        return name1.localeCompare(name2);
      });

      return sortedRepos;
    }

    default: {
      const exhaustiveCheck: never = sort;
      return exhaustiveCheck;
    }
  }
}
