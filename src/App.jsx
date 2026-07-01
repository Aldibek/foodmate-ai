import { useEffect, useMemo, useState } from "react";
import { Assistant } from "./components/Assistant";
import { Cart } from "./components/Cart";
import { Filters } from "./components/Filters";
import { RestaurantCard } from "./components/RestaurantCard";
import { createOrder, fetchRestaurants } from "./lib/api";
import "./styles.css";

export default function App() {
  const [filters, setFilters] = useState({ cuisine: "all", city: "all", maxDelivery: "60" });
  const [restaurants, setRestaurants] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchRestaurants(filters).then(setRestaurants).catch(() => setRestaurants([]));
  }, [filters]);

  const stats = useMemo(() => ({
    restaurants: restaurants.length,
    avgDelivery: restaurants.length
      ? Math.round(restaurants.reduce((sum, item) => sum + item.deliveryMinutes, 0) / restaurants.length)
      : 0,
    cartItems: cart.reduce((sum, item) => sum + item.quantity, 0)
  }), [restaurants, cart]);

  function addDish(restaurant, dish) {
    setOrder(null);
    setCart((items) => {
      const existing = items.find((item) => item.id === dish.id);
      if (existing) {
        return items.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { ...dish, quantity: 1, restaurantName: restaurant.name }];
    });
  }

  function removeDish(id) {
    setCart((items) => items.filter((item) => item.id !== id));
  }

  async function checkout(customer) {
    const created = await createOrder({ items: cart, customer });
    setOrder(created);
    setCart([]);
  }

  return (
    <main>
      <section className="hero">
        <div>
          <span className="eyebrow">Food delivery catalog with API and AI tools</span>
          <h1>FoodMate AI</h1>
          <p>Find Almaty restaurants, compare menus, build a cart, type create order, and add your delivery address.</p>
        </div>
        <div className="hero-stats" aria-label="Project stats">
          <strong>{stats.restaurants}</strong><span>restaurants</span>
          <strong>{stats.avgDelivery}</strong><span>avg min</span>
          <strong>{stats.cartItems}</strong><span>cart items</span>
        </div>
      </section>

      <Filters filters={filters} onChange={setFilters} />

      <section className="workspace">
        <div className="catalog">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onAdd={addDish} />
          ))}
          {!restaurants.length && <p className="empty-results">No restaurants match these filters.</p>}
        </div>
        <div className="side-stack">
          <Cart items={cart} onRemove={removeDish} onCheckout={checkout} order={order} />
          <Assistant />
        </div>
      </section>
    </main>
  );
}
