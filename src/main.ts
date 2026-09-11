import { getUser, getRepos } from "./api/github";
import "./style.css";
import DOM from "./dom/elements";
import {
  showState,
  renderUser,
  renderError,
  renderRepositories,
  renderPagination,
} from "./ui/render";
import { AppError } from "./errors/app-errors";
import { sortRepositories } from "./utils/repository-sort";
import type { Repositories } from "./types/repository";
import { isRepositorySort } from "./validators/repository-sort";
import {
  getTotalPages,
  paginateRepositories,
} from "./utils/repository-pagination";

let currentRepos: Repositories | null = null;
let currentAbortController: AbortController | null = null;
let currentPage = 1;
const itemsPerPage = 30;

DOM.headerLogo.href = import.meta.env.BASE_URL;

function renderCurrentRepositories() {
  if (currentRepos === null) return;

  const sortMethod = DOM.repositorySort.value;
  if (!isRepositorySort(sortMethod)) return;

  const sortedRepos = sortRepositories(currentRepos, sortMethod);

  const paginatedRepos = paginateRepositories(
    sortedRepos,
    itemsPerPage,
    currentPage,
  );

  renderRepositories(paginatedRepos);

  const totalPages = getTotalPages(sortedRepos, itemsPerPage);

  renderPagination(currentPage, totalPages);
}

async function handleSearchSubmit(event: SubmitEvent) {
  event.preventDefault();

  const username = DOM.searchInput.value.trim();

  if (username === "") return;
  currentRepos = null;
  DOM.repositorySort.value = "updated";
  currentPage = 1;
  currentAbortController?.abort();

  currentAbortController = new AbortController();

  const signal = currentAbortController.signal;
  showState("loading");

  try {
    const user = await getUser(username, signal);
    renderUser(user);

    currentRepos = await getRepos(username, signal);

    renderCurrentRepositories();

    showState("success");
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }

    if (error instanceof AppError) {
      renderError(error);
    } else {
      console.error("Unexpected error:", error);

      renderError(
        new AppError("Something went wrong.", "Please try again later."),
      );
    }

    showState("error");
  }
}

function handleRepositoriesSort(event: Event) {
  if (!(event.target instanceof HTMLSelectElement) || currentRepos === null)
    return;

  currentPage = 1;

  renderCurrentRepositories();
}

function handlePagination(event: Event) {
  if (!(event.target instanceof Element)) return;
  if (currentRepos === null) return;

  const button = event.target.closest<HTMLButtonElement>("[data-action]");

  if (!button) return;

  const action = button.dataset.action;
  const totalPages = getTotalPages(currentRepos, itemsPerPage);

  if (action === "previous" && currentPage > 1) {
    currentPage--;
  } else if (action === "next" && currentPage < totalPages) {
    currentPage++;
  } else {
    return;
  }

  renderCurrentRepositories();

  DOM.repositoriesSection.scrollIntoView({
    behavior: "auto",
    block: "start",
  });
}

DOM.searchForm.addEventListener("submit", handleSearchSubmit);

DOM.repositorySort.addEventListener("change", handleRepositoriesSort);

DOM.pagination.addEventListener("click", handlePagination);

// const repos = await getRepos('sindresorhus');

// console.log(repos);

// const user = await getUser('sindresorhus');
// console.log(user);
