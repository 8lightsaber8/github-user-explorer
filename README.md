# GitHub User Explorer

A modern responsive GitHub User Explorer built with **HTML, CSS, TypeScript, and Vite**.

The application allows users to search for GitHub users and explore their profile information and repositories using data from the **GitHub REST API**.

## Live Demo

GitHub Pages:

https://8lightsaber8.github.io/github-user-explorer/

## Features

- Search GitHub users by username
- Display user profile information
- Display user avatar, name, username, bio, location, and company
- Display GitHub profile statistics
- Display user repositories
- Sort repositories by:
  - Last updated
  - Stars
  - Name
- Paginate repositories
- Display 30 repositories per page
- Previous and next page navigation
- Automatically scroll to the repositories section when changing pages
- Loading state while fetching data
- Error handling for:
  - User not found
  - API errors
  - Rate limit exceeded
  - Network errors
  - Invalid API responses
- Request cancellation with AbortController
- Runtime validation of API responses
- Responsive design
- Semantic HTML structure
- Accessible UI
- Reduced-motion support
- Unit tests with Vitest

## Technologies

- HTML5
- CSS3
- TypeScript
- Vite
- ES Modules
- Fetch API
- GitHub REST API
- Vitest
- ESLint
- Prettier

## API

### GitHub REST API

User and repository data is provided by the GitHub REST API.

The application uses the following endpoints:

- User information:
  `GET /users/{username}`

- User repositories:
  `GET /users/{username}/repos`

GitHub REST API documentation:

https://docs.github.com/en/rest

## Testing

The project uses **Vitest** for unit testing.

Tests cover:

- Repository pagination
- Repository sorting
- GitHub pagination headers
- User data validation
- Repository data validation

Run tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm test -- --run
```

## Code Quality

The project uses **ESLint** and **Prettier** to maintain code quality and consistent formatting.

TypeScript type checking is performed without emitting JavaScript files.

Run type checking:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Check code formatting:

```bash
npm run format:check
```

## Project Structure

```text
github-user-explorer/
│
├── src/
│   ├── api/
│   │   ├── constants.ts
│   │   ├── github.ts
│   │   ├── pagination.ts
│   │   ├── pagination.test.ts
│   │   ├── request.ts
│   │   └── request.test.ts
│   │
│   ├── dom/
│   │   └── elements.ts
│   │
│   ├── errors/
│   │   └── app-errors.ts
│   │
│   ├── types/
│   │   ├── app.ts
│   │   ├── github.ts
│   │   └── repository.ts
│   │
│   ├── ui/
│   │   └── render.ts
│   │
│   ├── utils/
│   │   ├── dom-utils.ts
│   │   ├── repository-pagination.ts
│   │   ├── repository-pagination.test.ts
│   │   ├── repository-sort.ts
│   │   └── repository-sort.test.ts
│   │
│   ├── validators/
│   │   ├── repository.ts
│   │   ├── repository.test.ts
│   │   ├── repository-sort.ts
│   │   ├── user.ts
│   │   └── user.test.ts
│   │
│   ├── main.ts
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── README.md
└── .gitignore
```

## How It Works

1. The user enters a GitHub username.
2. The application sends a request to the GitHub REST API.
3. The API response is validated at runtime.
4. User data is transformed into the application's internal data structure.
5. Repository data is fetched from the GitHub API.
6. Repositories can be sorted by name, stars, or last update.
7. Repositories are paginated locally with 30 repositories per page.
8. The UI displays the user profile and repositories.
9. Previous requests are cancelled when a new search is started.

## Error Handling

The application uses custom error classes to handle different types of failures:

- `UserNotFoundError`
- `RateLimitError`
- `ApiError`
- `NetworkError`
- `InvalidResponseError`

Expected application errors are displayed to the user with an appropriate message and suggested solution.

Unexpected errors are logged to the console and handled by a generic fallback error.

## Preview

![GitHub User Explorer Preview](./assets/screenshot.png)

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/8lightsaber8/github-user-explorer.git
```

### 2. Open the project folder

```bash
cd github-user-explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Author

Created by **Danylo Nykytenko**
