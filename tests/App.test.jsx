import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";

const mockRestaurants = [
  {
    id: "demo",
    name: "Demo Kitchen",
    cuisine: "asian",
    city: "Almaty",
    rating: 4.9,
    deliveryMinutes: 20,
    priceLevel: "$$",
    image: "https://example.com/demo.jpg",
    tags: ["quick"],
    menu: [{ id: "d-1", name: "Demo noodles", price: 2500, calories: 500, category: "noodles" }]
  }
];

describe("FoodMate app", () => {
  beforeEach(() => {
    cleanup();
    global.fetch = vi.fn((url) => {
      if (String(url).includes("/api/restaurants")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockRestaurants) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  it("renders restaurant catalog from API", async () => {
    render(<App />);
    expect(screen.getByText("FoodMate AI")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Demo Kitchen")).toBeInTheDocument());
    expect(screen.getByText("Demo noodles")).toBeInTheDocument();
  });

  it("opens address form from create order button", async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(screen.getByText("Demo Kitchen")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /add demo noodles/i }));
    await user.click(screen.getByRole("button", { name: "Create order" }));

    expect(screen.getByText("Delivery address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Almaty, street, house, apartment")).toBeInTheDocument();
  });
});
