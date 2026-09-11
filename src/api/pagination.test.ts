import { describe, expect, test } from "vitest";
import { getNextPage } from "./pagination";

describe("getNextPage", () => {
  test("returns the next page number", () => {
    const headers = new Headers({
      link: '<https://api.github.com/users/test/repos?page=2&per_page=100>; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBe(2);
  });

  test("returns null when link header is missing", () => {
    const headers = new Headers();

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when next link is missing", () => {
    const headers = new Headers({
      link: '<https://api.github.com/users/test/repos?page=1&per_page=100>; rel="prev"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("finds next link among multiple links", () => {
    const headers = new Headers({
      link: [
        '<https://api.github.com/users/test/repos?page=1>; rel="prev"',
        '<https://api.github.com/users/test/repos?page=3>; rel="next"',
        '<https://api.github.com/users/test/repos?page=5>; rel="last"',
      ].join(", "),
    });

    const result = getNextPage(headers);

    expect(result).toBe(3);
  });

  test("returns null when angle brackets are missing", () => {
    const headers = new Headers({
      link: 'https://api.github.com/users/test/repos?page=2; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when angle brackets are in the wrong order", () => {
    const headers = new Headers({
      link: 'https://api.github.com/users/test/repos>?page=2<; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when next URL is invalid", () => {
    const headers = new Headers({
      link: '<not-a-valid-url>; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when page parameter is missing", () => {
    const headers = new Headers({
      link: '<https://api.github.com/users/test/repos?per_page=100>; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when page parameter is not a number", () => {
    const headers = new Headers({
      link: '<https://api.github.com/users/test/repos?page=abc>; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });

  test("returns null when page parameter is infinite", () => {
    const headers = new Headers({
      link: '<https://api.github.com/users/test/repos?page=Infinity>; rel="next"',
    });

    const result = getNextPage(headers);

    expect(result).toBeNull();
  });
});
