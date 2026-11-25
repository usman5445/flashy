import { describe, expect, it } from "vitest";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import CreateCard from "./CreateCard";
import { renderWithProviders } from "../tests/testUtils";

function renderCreateCard() {
  return renderWithProviders(
    <Routes>
      <Route path="/" element={<CreateCard />} />
      <Route path="/my-cards" element={<p>My cards page</p>} />
    </Routes>
  );
}

describe("CreateCard", () => {
  it("renders the group form and a single term row", () => {
    renderCreateCard();

    expect(screen.getByPlaceholderText("Enter group name")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /edit term/i })).toHaveLength(1);
    expect(screen.getByRole("button", { name: /add more/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderCreateCard();

    await user.click(screen.getByRole("button", { name: /^create$/i }));

    expect(await screen.findByText("Group name is required")).toBeInTheDocument();
    expect(await screen.findByText("Term is required")).toBeInTheDocument();
    expect(await screen.findByText("Definition is required")).toBeInTheDocument();
  });

  it("adds and removes term rows", async () => {
    const user = userEvent.setup();
    renderCreateCard();

    await user.click(screen.getByRole("button", { name: /add more/i }));
    expect(screen.getAllByRole("button", { name: /edit term/i })).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: /delete term 2/i }));
    expect(screen.getAllByRole("button", { name: /edit term/i })).toHaveLength(1);
  });

  it("focuses the term title input when the edit icon is clicked", async () => {
    const user = userEvent.setup();
    renderCreateCard();

    // textboxes: group name, group description, term 1, definition 1
    const termInput = screen.getAllByRole("textbox")[2];
    await user.type(termInput, "React");

    await user.click(screen.getByRole("button", { name: /edit term 1/i }));

    expect(termInput).toHaveFocus();
    expect(termInput).toHaveValue("React");
  });

  it("creates a flashcard and redirects to My Flashcards", async () => {
    const user = userEvent.setup();
    const { store } = renderCreateCard();

    await user.type(screen.getByPlaceholderText("Enter group name"), "React Basics");

    const textboxes = screen.getAllByRole("textbox");
    await user.type(textboxes[2], "JSX");
    await user.type(textboxes[3], "JavaScript XML");

    await user.click(screen.getByRole("button", { name: /^create$/i }));

    expect(await screen.findByText("My cards page")).toBeInTheDocument();

    const cards = store.getState();
    expect(cards).toHaveLength(1);
    expect(cards[0].groupName).toBe("React Basics");
    expect(cards[0].terms[0]).toMatchObject({
      term: "JSX",
      definition: "JavaScript XML",
    });
  });
});
