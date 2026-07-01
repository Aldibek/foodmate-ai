import cors from "cors";
import express from "express";
import { answerFoodQuestion, buildBudgetPlan, restaurants, searchRestaurants } from "./agentTools.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "foodmate-api" });
});

app.get("/api/restaurants", (request, response) => {
  const cuisine = request.query.cuisine || "all";
  const city = request.query.city || "all";
  const maxDelivery = Number(request.query.maxDelivery || 60);
  response.json(searchRestaurants({ cuisine, city, maxDelivery }));
});

app.get("/api/restaurants/:id", (request, response) => {
  const restaurant = restaurants.find((item) => item.id === request.params.id);
  if (!restaurant) {
    response.status(404).json({ error: "Restaurant not found" });
    return;
  }
  response.json(restaurant);
});

app.post("/api/orders", (request, response) => {
  const { items = [], customer = {} } = request.body;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  response.status(201).json({
    id: `order-${Date.now()}`,
    customer,
    items,
    total,
    status: "confirmed"
  });
});

app.post("/api/ai/recommend", (request, response) => {
  response.json(answerFoodQuestion(request.body.message || ""));
});

app.post("/api/ai/budget-plan", (request, response) => {
  response.json(buildBudgetPlan(request.body));
});

if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`FoodMate API listening on http://localhost:${port}`);
  });
}

export default app;
