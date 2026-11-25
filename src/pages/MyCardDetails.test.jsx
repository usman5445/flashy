import { describe, expect, it, vi } from "vitest";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import MyCardDetails from "./MyCardDetails";
import { createTestStore, renderWithProviders } from "../tests/testUtils";

const card = {
  id: "card-1",
  groupName: "React Basics",
  groupDescription: "Core React concepts",
  groupImage: null,
  terms: [
    { term: "JSX", definition: "JavaScript XML syntax", image: null },
    { term: "Props", definition: "Inputs passed to components", image: null },
  ],
};

function renderDetails(cards = [card], route = `/my-cards/${card.id}`) {
  return renderWithProviders(
    <Routes>
      <Route path="/my-cards/:id" element={<MyCardDetails />} />
    </Routes>,
    { route, store: createTestStore(cards) }
  );
}

describe("MyCardDetails", () => {
  it("shows the flashcard title, description and first term by default", () => {
    renderDetails();

    expect(
      screen.getByRole("heading", { name: "React Basics" })
    ).toBeInTheDocument();
    expect(screen.getByText("Core React concepts")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "JSX" })).toBeInTheDocument();
    expect(screen.getByText("JavaScript XML syntax")).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });

  it("switches the centre card when a term is selected from the list", async () => {
    const user = userEvent.setup();
    renderDetails();

    await user.click(screen.getByRole("button", { name: "Props" }));

    expect(
      screen.getByRole("heading", { name: "Props" })
    ).toBeInTheDocument();
    expect(screen.getByText("Inputs passed to components")).toBeInTheDocument();
    expect(screen.getByText("2/2")).toBeInTheDocument();
  });

  it("navigates terms with the carousel arrows and wraps around", async () => {
    const user = userEvent.setup();
    renderDetails();

    await user.click(screen.getByRole("button", { name: /next term/i }));
    expect(screen.getByRole("heading", { name: "Props" })).toBeInTheDocument();
    expect(screen.getByText("2/2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next term/i }));
    expect(screen.getByRole("heading", { name: "JSX" })).toBeInTheDocument();
    expect(screen.getByText("1/2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /previous term/i }));
    expect(screen.getByRole("heading", { name: "Props" })).toBeInTheDocument();
  });

  it("opens the share modal and copies the flashcard link", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn(() => Promise.resolve());

    // userEvent installs its own clipboard stub during setup, so override it afterwards
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    renderDetails();

    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(
      screen.getByRole("heading", { name: "Share" })
    ).toBeInTheDocument();
    expect(screen.getByText(window.location.href)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /copy/i }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(window.location.href));
    expect(await screen.findByRole("button", { name: /copied/i })).toBeInTheDocument();
  });

  it("shows a not found message for an unknown flashcard", () => {
    renderDetails([], "/my-cards/missing");

    expect(screen.getByText("Flashcard not found.")).toBeInTheDocument();
  });
});
