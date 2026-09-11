import type { Repository, Repositories } from "@/types/repository";
import type { User } from "@/types/user";
import type { AppState } from "@/types/app";

import DOM from "@/dom/elements";
import type { AppError } from "@/errors/app-errors";

import errorIcon from "@/assets/icons/error.svg";
import locationIcon from "@/assets/icons/location.svg";
import companyIcon from "@/assets/icons/company.svg";
import calendarIcon from "@/assets/icons/calendar.svg";
import starIcon from "@/assets/icons/star.svg";
import forkIcon from "@/assets/icons/fork.svg";

import chevronLeftIcon from "@/assets/icons/chevron-left.svg";
import chevronRightIcon from "@/assets/icons/chevron-right.svg";

export function showState(state: AppState): void {
  const activeState = DOM.states[state];
  for (const element of Object.values(DOM.states)) {
    if (element === activeState) {
      element.classList.remove("is-hidden");
    } else {
      element.classList.add("is-hidden");
    }
  }
}

function createStat(label: string, value: string) {
  const stat = document.createElement("div");
  stat.classList.add("stat");

  const valueElement = document.createElement("span");
  valueElement.classList.add("stat__value");
  valueElement.textContent = value;

  const labelElement = document.createElement("span");
  labelElement.classList.add("stat__label");
  labelElement.textContent = label;

  stat.append(valueElement, labelElement);

  return stat;
}

function createMetaItem(label: string, value: string, iconSrc: string) {
  const metaItem = document.createElement("div");
  metaItem.classList.add("meta-item");

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.width = 16;
  icon.height = 16;
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");

  const labelElement = document.createElement("span");
  labelElement.classList.add("meta-item__label");
  labelElement.textContent = `${label}: `;

  const valueElement = document.createElement("span");
  valueElement.classList.add("meta-item__value");
  valueElement.textContent = value;

  content.append(labelElement, valueElement);
  metaItem.append(icon, content);

  return metaItem;
}

export function renderUser(user: User): void {
  DOM.user.replaceChildren();

  const header = document.createElement("div");
  header.classList.add("user-card__header");

  const avatar = document.createElement("img");
  avatar.src = user.avatarUrl;
  avatar.alt = `${user.name ?? user.login}'s avatar`;
  avatar.classList.add("user-card__avatar");

  const info = document.createElement("div");
  info.classList.add("user-card__info");

  const name = document.createElement("h2");
  name.classList.add("user-card__name");
  name.textContent = user.name ?? user.login;

  const username = document.createElement("a");
  username.href = user.htmlUrl;
  username.textContent = `@${user.login}`;
  username.classList.add("user-card__username");
  username.target = "_blank";
  username.rel = "noopener noreferrer";

  if (user.bio !== null) {
    const bio = document.createElement("p");
    bio.classList.add("user-card__bio");
    bio.textContent = user.bio;
    info.append(name, username, bio);
  } else {
    info.append(name, username);
  }

  const action = document.createElement("div");
  action.classList.add("user-card__action");

  const githubLink = document.createElement("a");
  githubLink.href = user.htmlUrl;
  githubLink.textContent = "View on GitHub";
  githubLink.classList.add("button", "button--outline", "button--small");
  githubLink.target = "_blank";
  githubLink.rel = "noopener noreferrer";

  action.append(githubLink);

  header.append(avatar, info, action);

  const stats = document.createElement("div");
  stats.classList.add("user-card__stats");

  const repositoriesStat = createStat(
    "Repositories",
    user.publicRepos.toString(),
  );

  const followersStat = createStat("Followers", user.followers.toString());

  const followingStat = createStat("Following", user.following.toString());

  stats.append(repositoriesStat, followersStat, followingStat);

  const meta = document.createElement("div");
  meta.classList.add("user-card__meta");

  const location = createMetaItem(
    "Location",
    user.location ?? "Not specified",
    locationIcon,
  );

  const company = createMetaItem(
    "Company",
    user.company ?? "Not specified",
    companyIcon,
  );

  const joined = document.createElement("div");
  joined.classList.add("meta-item");

  const joinedIcon = document.createElement("img");
  joinedIcon.src = calendarIcon;
  joinedIcon.width = 16;
  joinedIcon.height = 16;
  joinedIcon.alt = "";
  joinedIcon.setAttribute("aria-hidden", "true");

  const joinedContent = document.createElement("div");

  const joinedLabel = document.createElement("span");
  joinedLabel.classList.add("meta-item__label");
  joinedLabel.textContent = "Joined: ";

  const joinedDate = document.createElement("time");
  joinedDate.classList.add("meta-item__value");
  joinedDate.dateTime = user.createdAt;
  joinedDate.textContent = new Date(user.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    },
  );

  joinedContent.append(joinedLabel, joinedDate);
  joined.append(joinedIcon, joinedContent);

  meta.append(location, company, joined);

  DOM.user.append(header, stats, meta);
}

function createRepositoryCard(repository: Repository) {
  const article = document.createElement("article");
  article.classList.add("repository-card");

  const title = document.createElement("h4");
  title.classList.add("repository-card__title");

  const link = document.createElement("a");
  link.href = repository.htmlUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;

  title.append(link);

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("repository-card__description");
  descriptionElement.textContent =
    repository.description ?? "No description provided.";

  const meta = document.createElement("div");
  meta.classList.add("repository-card__meta");

  const languageItem = document.createElement("div");
  languageItem.classList.add("repo-meta-item");

  const languageColor = document.createElement("span");
  languageColor.classList.add("repo-language-color");
  languageColor.setAttribute("aria-hidden", "true");

  const languageElement = document.createElement("span");
  languageElement.textContent = repository.language ?? "Not specified";

  languageItem.append(languageColor, languageElement);

  const starsItem = document.createElement("div");
  starsItem.classList.add("repo-meta-item");

  const starsIcon = document.createElement("img");
  starsIcon.src = starIcon;
  starsIcon.width = 14;
  starsIcon.height = 14;
  starsIcon.alt = "";
  starsIcon.setAttribute("aria-hidden", "true");

  const starsElement = document.createElement("span");
  starsElement.textContent = repository.stargazersCount.toString();

  starsItem.append(starsIcon, starsElement);

  const forksItem = document.createElement("div");
  forksItem.classList.add("repo-meta-item");

  const forksIcon = document.createElement("img");
  forksIcon.src = forkIcon;
  forksIcon.width = 14;
  forksIcon.height = 14;
  forksIcon.alt = "";
  forksIcon.setAttribute("aria-hidden", "true");

  const forksElement = document.createElement("span");
  forksElement.textContent = repository.forksCount.toString();

  forksItem.append(forksIcon, forksElement);

  const updatedElement = document.createElement("time");
  updatedElement.classList.add("repo-meta-item");
  updatedElement.dateTime = repository.updatedAt;
  updatedElement.textContent = new Date(
    repository.updatedAt,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  meta.append(languageItem, starsItem, forksItem, updatedElement);

  article.append(title, descriptionElement, meta);

  return article;
}

export function renderRepositories(repos: Repositories): void {
  DOM.repositoriesGrid.replaceChildren();

  if (repos.length === 0) {
    DOM.repositoriesSection.classList.add("is-hidden");
    DOM.emptyRepositories.classList.remove("is-hidden");
    return;
  }

  for (const repository of repos) {
    DOM.repositoriesGrid.append(createRepositoryCard(repository));
  }
  DOM.emptyRepositories.classList.add("is-hidden");
  DOM.repositoriesSection.classList.remove("is-hidden");
}

export function renderError(error: AppError): void {
  DOM.states.error.replaceChildren();

  const icon = document.createElement("img");

  icon.src = errorIcon;
  icon.alt = "";
  icon.classList.add("state-block__icon");

  const title = document.createElement("h2");
  title.classList.add("state-block__title");
  title.textContent = error.message;

  const description = document.createElement("p");
  description.classList.add("state-block__description");
  description.textContent = error.solution;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("button", "button--outline");
  button.textContent = "Try another user";
  button.addEventListener("click", () => {
    DOM.searchInput.value = "";
    showState("initial");
    DOM.searchInput.focus();
  });

  DOM.states.error.append(icon, title, description, button);
}

export function renderPagination(
  currentPage: number,
  totalPages: number,
): void {
  DOM.pagination.replaceChildren();

  if (totalPages <= 1) {
    DOM.pagination.classList.add("is-hidden");
    return;
  }

  DOM.pagination.classList.remove("is-hidden");

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.dataset.action = "previous";
  previousButton.classList.add(
    "button",
    "button--outline",
    "pagination__button",
  );
  previousButton.disabled = currentPage === 1;
  previousButton.setAttribute("aria-label", "Previous page");

  const previousIcon = document.createElement("img");
  previousIcon.src = chevronLeftIcon;
  previousIcon.alt = "";
  previousIcon.setAttribute("aria-hidden", "true");

  const previousText = document.createElement("span");
  previousText.textContent = "Previous";

  previousButton.append(previousIcon, previousText);

  const pageInfo = document.createElement("span");
  pageInfo.classList.add("pagination__info");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.dataset.action = "next";
  nextButton.classList.add("button", "button--outline", "pagination__button");
  nextButton.disabled = currentPage === totalPages;
  nextButton.setAttribute("aria-label", "Next page");

  const nextText = document.createElement("span");
  nextText.textContent = "Next";

  const nextIcon = document.createElement("img");
  nextIcon.src = chevronRightIcon;
  nextIcon.alt = "";
  nextIcon.setAttribute("aria-hidden", "true");

  nextButton.append(nextText, nextIcon);

  DOM.pagination.append(previousButton, pageInfo, nextButton);
}
