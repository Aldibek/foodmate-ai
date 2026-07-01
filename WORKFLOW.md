# WORKFLOW.md

## Project

FoodMate AI: restaurant and food ordering catalog with filters, cart, backend API, and AI assistant tools.

## AI Usage Evidence

- Codex read the Notion assignment and extracted the requirements.
- Codex generated the project architecture, React UI, Express API, data model, tests, and documentation.
- AI output was reviewed and adjusted to satisfy the assignment: app works without AI, AI uses tools, and role rules are present.

## MCP / Tools / Subagents

- Web context tool: used to read the public Notion assignment.
- Local code tools: used to generate and inspect project files.
- Backend AI tools implemented in code:
  - `searchRestaurants`
  - `recommendDishes`
  - `buildBudgetPlan`

## Team Synergy

- Frontend consumes stable backend JSON contracts.
- Backend exposes restaurant, order, and assistant endpoints.
- AI Engineer keeps assistant recommendations grounded in project data.
- QA validates product flows with Vitest.

## Reflection

1. AI saved the most time on project scaffolding, UI structure, API contracts, and documentation.
2. AI needed review around exact assignment constraints, especially making sure the app works without AI.
3. Without AI, creating the full stack, tests, and workflow docs would take at least three times longer.

## Screenshots Checklist

- Home page with restaurants
- Filters applied
- Cart with dishes
- AI assistant answer showing `toolsUsed`
- Test run output

## Submission

- GitHub repository: add link here
- Deploy: https://foodmate-eta.vercel.app
- Video: optional 3-5 minute walkthrough
