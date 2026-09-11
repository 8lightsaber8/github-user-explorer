export type Repository = {
  name: string;
  htmlUrl: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
};

export type Repositories = Repository[];

export type RepositorySort = "updated" | "stars" | "name";
