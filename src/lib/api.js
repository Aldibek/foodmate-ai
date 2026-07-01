const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:4000");

export async function fetchRestaurants(filters) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/api/restaurants?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to load restaurants");
  return response.json();
}

export async function askAssistant(message) {
  const response = await fetch(`${API_URL}/api/ai/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  if (!response.ok) throw new Error("Assistant unavailable");
  return response.json();
}

export async function createOrder(payload) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Order failed");
  return response.json();
}
