import { describe, expect, it } from "vitest";
import { answerFoodQuestion, buildBudgetPlan, searchRestaurants } from "../server/agentTools";

describe("agent tools", () => {
  it("filters restaurants by city and cuisine", () => {
    const result = searchRestaurants({ cuisine: "kazakh-fast", city: "Almaty", maxDelivery: 30 });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Bauyrdaq Qazaq Fast-food");
  });

  it("contains a 50 restaurant catalog", () => {
    const result = searchRestaurants({ cuisine: "all", city: "Almaty", maxDelivery: 60 });
    expect(result).toHaveLength(50);
  });

  it("builds a budget plan per person", () => {
    const plan = buildBudgetPlan({ people: 2, budget: 7000 });
    expect(plan.perPerson).toBe(3500);
    expect(plan.options.length).toBeGreaterThan(0);
  });

  it("returns tools used by the assistant", () => {
    const answer = answerFoodQuestion("Need pan-asian in Almaty under 5000");
    expect(answer.toolsUsed).toContain("searchRestaurants");
    expect(answer.text).toMatch(/TomYumBar|budget|бюджет|подходят/i);
  });
});
