# Soil to Soul AI Setup

This project should use OpenAI in the cheapest safe way:

1. Do not call AI on page load.
2. Call AI only when the user clicks a button like `Generate Plot Insight`.
3. Cache the result by plot ID and date.
4. Reuse the cached answer until the plot data changes.

## Suggested flow

1. Frontend sends selected plot key like `A`, `B`, `C`, or `D` to your backend.
2. Backend reads the current plot data from your database.
3. Backend sends a compact prompt to the OpenAI Responses API.
4. Backend stores the returned summary.
5. Frontend displays the saved result.

## Current implementation in this repo

This repo now includes a Cloudflare Pages Function:

- `/functions/api/plot-summary.js`

Frontend button:

- `Generate Plot Insight` on `land-workspace.html`

Current behavior:

1. Frontend sends the selected plot object to `/api/plot-summary`
2. The Pages Function calls the OpenAI Responses API
3. If `OPENAI_API_KEY` is missing or the request fails, it falls back to a local summary

## Cloudflare environment variables to add

In your Cloudflare Pages project settings, add:

- `OPENAI_API_KEY`
- `OPENAI_MODEL` with value `gpt-5.4-mini` (optional, but recommended)

## Suggested prompt shape

Send only short structured data, for example:

- plot name
- area
- current state
- current crop
- irrigation note
- soil note
- next task

Avoid sending long history every time because that increases cost.

## Example backend structure

Backend route:

- `POST /api/plot-summary`

Request body:

```json
{
  "plot_id": "A"
}
```

Suggested response:

```json
{
  "plot_id": "A",
  "summary": "Plot A is ready for soil preparation and early-cycle crop planning...",
  "cached": true
}
```

## Example OpenAI prompt

System idea:

`You are a farm operations assistant for an organic farming project. Give short, practical, low-jargon advice.`

User data idea:

`Plot A, 6 biga, survey mapped, current state: soil preparation, next task: irrigation planning, goal: begin first organic crop cycle. Give a 3-sentence operational summary and next step.`

## Cost control rules

- Use a mini model first.
- Keep prompts short.
- Keep outputs short.
- Cache by plot.
- Add a daily or manual limit in backend.
- Log usage by plot.

## Good first AI features

- plot summary
- next action suggestion
- customer-safe explanation

## Good features to avoid first

- automatic repeated polling
- AI on every page load
- sending all farm history in every request
- long chat sessions for each visitor
