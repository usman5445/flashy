import { describe, expect, it } from "vitest";
import { addCard, cardReducer, store } from "./cardSlice";

const payload = {
  groupName: "React Basics",
  groupDescription: "Core React concepts",
  groupImage: null,
  terms: [{ term: "JSX", definition: "JavaScript XML", image: null }],
};

describe("cardSlice", () => {
  it("keeps the current state for unknown actions", () => {
    const state = [payload];

    expect(cardReducer(state, { type: "unknown/action" })).toBe(state);
  });

  it("adds a card with a generated id and timestamp", () => {
    const state = cardReducer([], addCard(payload));

    expect(state).toHaveLength(1);
    expect(state[0]).toMatchObject(payload);
    expect(state[0].id).toEqual(expect.any(String));
    expect(state[0].id.length).toBeGreaterThan(0);
    expect(Number.isNaN(Date.parse(state[0].createdAt))).toBe(false);
  });

  it("appends new cards without mutating the previous state", () => {
    const first = cardReducer([], addCard(payload));
    const second = cardReducer(first, addCard({ ...payload, groupName: "Redux" }));

    expect(first).toHaveLength(1);
    expect(second).toHaveLength(2);
    expect(second[1].groupName).toBe("Redux");
  });

  it("persists the state to localStorage", () => {
    store.dispatch(addCard(payload));

    const stored = JSON.parse(localStorage.getItem("cards"));

    expect(stored).toEqual(
      expect.arrayContaining([expect.objectContaining({ groupName: "React Basics" })])
    );
  });
});
