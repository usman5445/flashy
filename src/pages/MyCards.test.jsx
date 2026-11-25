import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import MyCards from "./MyCards";
import { createTestStore, renderWithProviders } from "../tests/testUtils";

const card = {
  id: "card-1",
  groupName: "React Basics",
  groupDescription: "Core React concepts",
  groupImage: null,
  terms: [
    { term: "JSX", definition: "JavaScript XML", image: null },
    { term: "Props", definition: "Inputs to components", image: null },
  ],
};

describe("MyCards", () => {
  it("shows an empty state when there are no flashcards", () => {
    renderWithProviders(<MyCards />);

    expect(screen.getByText("No flashcards yet.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /create your first flashcard/i })
    ).toHaveAttribute("href", "/");
  });

  it("lists saved flashcards with description and term count", () => {
    renderWithProviders(<MyCards />, {
      store: createTestStore([card]),
    });

    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(screen.getByText("Core React concepts")).toBeInTheDocument();
    expect(screen.getByText("2 Cards")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /view cards/i })).toHaveAttribute(
      "href",
      "/my-cards/card-1"
    );
  });
});
