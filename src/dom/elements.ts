import { getElement } from "@/utils/dom-utils";
import type { AppState } from "@/types/app";

const DOM = {
  headerLogo: getElement<HTMLAnchorElement>("#header-logo"),

  searchForm: getElement<HTMLFormElement>("#search-form"),
  searchInput: getElement<HTMLInputElement>("#search-input"),

  repositorySort: getElement<HTMLSelectElement>("#repository-sort"),

  states: {
    initial: getElement<HTMLElement>("#state-initial"),
    loading: getElement<HTMLElement>("#state-loading"),
    error: getElement<HTMLElement>("#state-error"),

    success: getElement<HTMLElement>("#state-success"),
  } satisfies Record<AppState, HTMLElement>,

  user: getElement<HTMLElement>("#user-card"),
  repositoriesSection: getElement<HTMLElement>("#repositories"),
  repositoriesGrid: getElement<HTMLElement>("#repositories-grid"),
  pagination: getElement<HTMLElement>("#pagination"),
  emptyRepositories: getElement<HTMLElement>("#empty-repos"),
};

export default DOM;
