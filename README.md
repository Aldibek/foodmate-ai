# FoodMate AI

FoodMate AI is a mini food-delivery catalog for a group project. The product works without AI: users can browse 50 real Almaty restaurants, filter by cuisine and delivery time, add dishes to a cart, type `create order`, enter a delivery address, and create a demo order.

The AI feature improves UX through a tool-using assistant. It calls backend tools to search restaurants, recommend dishes, and build budget-aware suggestions.

## Stack

- React + Vite frontend
- Express REST API
- JSON data store
- Vitest automated tests
- Lucide React icons

## Data

The catalog uses 50 real Almaty restaurants with approximate menu items and prices from public menu/listing pages. Source links are available from each restaurant card.

- NAVAT, Sandyq, Дареджани, Ocean Basket, TomYumBar, Korean House, Coffee BOOM, Rumi, Baharat, Bauyrdaq
- Beefeater, Manga Sushi, Tyubeteika, Chechil, Nuala, SEVEN, Vista, Chalet, Alasha, Kishlak
- Bosphorus, Tarkhun, Vanilla, Auyl, Cafe Alma, Fika, Yurta, J.Z. Peking Duck, Sumo-San, Agosto
- La Pasta, Olivka, Ce Ce, Patsatsina, Una Pasta, Spiros, Roni Pizza, Nedelka, Degirmen, Akku Central Cafe
- Six Coffee + Wine, Dubai Mandi, BAO Sushi & Noodles, Мёндон, Две палочки, Своя Кухня, Ата донер, and more

## Run locally

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:4000

Production deploy: https://foodmate-eta.vercel.app

GitHub repository: https://github.com/Aldibek/foodmate-ai

## API

- `GET /api/health`
- `GET /api/restaurants?cuisine=all&city=all&maxDelivery=60`
- `GET /api/restaurants/:id`
- `POST /api/orders`
- `POST /api/ai/recommend`
- `POST /api/ai/budget-plan`

## Definition of Done

- GitHub repository
- Deployed frontend/backend
- README
- WORKFLOW.md
- `ai-rules/*.md` for every role
- MCP/sub-agent usage documented
- AI-generated commits
- Automated tests

## Suggested Team Roles

- Frontend Developer: UI, responsive layout, cart flow
- Backend Developer: Express API, data contracts, order endpoint
- AI Engineer: assistant tools and response contracts
- QA & Workflow Master: tests, screenshots, workflow evidence
