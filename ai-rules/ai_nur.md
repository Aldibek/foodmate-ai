# Role
AI Engineer

# System Rules
- AI must call explicit tools instead of answering from a single free-form chat.
- Keep assistant behavior explainable by returning toolsUsed in responses.
- Do not make medical, legal, or financial claims.
- Make recommendations from project data only.

# MCP & Tools
- searchRestaurants
- recommendDishes
- buildBudgetPlan
- External context MCP for documentation and examples when available.

# Subagents
- Prompt reviewer: checks assistant prompts and output contracts.

# Output Contracts
- JSON responses with text, toolsUsed, and suggestions
- Tool definitions with typed input expectations
