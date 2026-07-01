import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const restaurants = JSON.parse(readFileSync(join(__dirname, "../data/restaurants.json"), "utf8"));

export function searchRestaurants({ cuisine = "all", city = "all", maxDelivery = 60 }) {
  return restaurants.filter((restaurant) => {
    const cuisineMatch = cuisine === "all" || restaurant.cuisine === cuisine;
    const cityMatch = city === "all" || restaurant.city === city;
    return cuisineMatch && cityMatch && restaurant.deliveryMinutes <= maxDelivery;
  });
}

export function recommendDishes({ budget = 5000, preference = "" }) {
  const preferenceText = preference.toLowerCase();
  return restaurants
    .flatMap((restaurant) =>
      restaurant.menu.map((dish) => ({
        ...dish,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        cuisine: restaurant.cuisine,
        tags: restaurant.tags
      }))
    )
    .filter((dish) => dish.price <= budget)
    .sort((a, b) => {
      const aMatch = `${a.name} ${a.category} ${a.cuisine} ${a.tags.join(" ")}`.toLowerCase().includes(preferenceText);
      const bMatch = `${b.name} ${b.category} ${b.cuisine} ${b.tags.join(" ")}`.toLowerCase().includes(preferenceText);
      return Number(bMatch) - Number(aMatch) || b.price - a.price;
    })
    .slice(0, 5);
}

export function buildBudgetPlan({ people = 1, budget = 8000 }) {
  const perPerson = Math.floor(budget / Math.max(people, 1));
  const dishes = recommendDishes({ budget: perPerson });
  return {
    people,
    budget,
    perPerson,
    options: dishes.slice(0, Math.max(people, 1))
  };
}

export function answerFoodQuestion(message) {
  const text = message.toLowerCase();
  const budgetMatch = text.match(/(\d{3,6})/);
  const budget = budgetMatch ? Number(budgetMatch[1]) : 5000;
  const city = ["Almaty", "Astana", "Shymkent"].find((item) => text.includes(item.toLowerCase())) || "all";
  const cuisine = restaurants.find((restaurant) => text.includes(restaurant.cuisine.toLowerCase()))?.cuisine || "all";

  const restaurantsFound = searchRestaurants({ cuisine, city, maxDelivery: 40 });
  const dishes = recommendDishes({ budget, preference: text });
  const topRestaurant = restaurantsFound[0];

  if (!topRestaurant && !dishes.length) {
    return {
      text: "Не нашел точное совпадение. Попробуйте указать город, кухню или бюджет.",
      toolsUsed: ["searchRestaurants", "recommendDishes"],
      suggestions: []
    };
  }

  return {
    text: topRestaurant
      ? `Я бы начал с ${topRestaurant.name}: рейтинг ${topRestaurant.rating}, доставка около ${topRestaurant.deliveryMinutes} минут. По бюджету подходят ${dishes.map((dish) => dish.name).slice(0, 3).join(", ")}.`
      : `По бюджету подходят ${dishes.map((dish) => `${dish.name} из ${dish.restaurantName}`).slice(0, 3).join(", ")}.`,
    toolsUsed: ["searchRestaurants", "recommendDishes"],
    suggestions: dishes
  };
}
