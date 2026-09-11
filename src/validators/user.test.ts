import { describe, expect, test } from "vitest";
import { isUser } from "./user";
import type { GithubUser } from "@/types/github";

describe("isUser", () => {
  const validUser: GithubUser = {
    avatar_url: "https://avatars.githubusercontent.com/u/123",
    name: "Test User",
    login: "test-user",
    bio: "Frontend developer",
    html_url: "https://github.com/test-user",
    public_repos: 10,
    followers: 100,
    following: 50,
    location: "Warsaw",
    company: "Test Company",
    created_at: "2026-01-01T00:00:00Z",
  };

  test("returns true for a valid user", () => {
    expect(isUser(validUser)).toBe(true);
  });

  test("returns false for null", () => {
    expect(isUser(null)).toBe(false);
  });

  test("returns false for an array", () => {
    expect(isUser([])).toBe(false);
  });

  test("returns false when a required property is missing", () => {
    const user = { ...validUser };

    delete (user as Partial<GithubUser>).login;

    expect(isUser(user)).toBe(false);
  });

  test("returns false when avatar_url is not a string", () => {
    const user = {
      ...validUser,
      avatar_url: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when name has an invalid type", () => {
    const user = {
      ...validUser,
      name: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when login is not a string", () => {
    const user = {
      ...validUser,
      login: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when bio has an invalid type", () => {
    const user = {
      ...validUser,
      bio: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when html_url is not a string", () => {
    const user = {
      ...validUser,
      html_url: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when public_repos is not a number", () => {
    const user = {
      ...validUser,
      public_repos: "10",
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when followers is not a number", () => {
    const user = {
      ...validUser,
      followers: "100",
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when following is not a number", () => {
    const user = {
      ...validUser,
      following: "50",
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when location has an invalid type", () => {
    const user = {
      ...validUser,
      location: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when company has an invalid type", () => {
    const user = {
      ...validUser,
      company: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns false when created_at is not a string", () => {
    const user = {
      ...validUser,
      created_at: 123,
    };

    expect(isUser(user)).toBe(false);
  });

  test("returns true when nullable properties are null", () => {
    const user = {
      ...validUser,
      name: null,
      bio: null,
      location: null,
      company: null,
    };

    expect(isUser(user)).toBe(true);
  });
});
