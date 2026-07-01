# FoodMate AI

FoodMate AI is a mini food-delivery catalog for a group project. The product works without AI: users can browse real Almaty restaurants, filter by cuisine and delivery time, add dishes to a cart, and create a demo order.

The AI feature improves UX through a tool-using assistant. It calls backend tools to search restaurants, recommend dishes, and build budget-aware suggestions.

## Stack

- React + Vite frontend
- Express REST API
- JSON data store
- Vitest automated tests
- Lucide React icons

## Data

The catalog uses 10 real Almaty restaurants with approximate menu items and prices from public menu pages:

- Chaihana NAVAT
- Sandyq
- Дареджани
- Ocean Basket
- TomYumBar
- Korean House
- Coffee BOOM
- Rumi
- Baharat
- Bauyrdaq Qazaq Fast-food

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
