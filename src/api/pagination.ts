export function getNextPage(headers: Headers): number | null {
  const links = headers.get("link");

  if (links === null) {
    return null;
  }

  const linkNext = links.split(",").find((str) => str.includes(`rel="next"`));

  if (linkNext === undefined) {
    return null;
  }

  const start = linkNext.indexOf("<");
  const end = linkNext.indexOf(">");

  if (start === -1 || end === -1 || start >= end) {
    return null;
  }

  const nextUrl = linkNext.substring(start + 1, end);

  let url: URL;
  try {
    url = new URL(nextUrl);
  } catch {
    return null;
  }

  const page = url.searchParams.get("page");
  const pageNumber = Number(page);

  if (page === null || !Number.isFinite(pageNumber)) {
    return null;
  }

  return pageNumber;
}
