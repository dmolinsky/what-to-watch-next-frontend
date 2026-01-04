# What to Watch Next – Frontend

React + TypeScript frontend for the What to Watch Next project.

The frontend provides a clean, responsive UI for searching titles and viewing recommendations retrieved from the backend API.

---

## Tech Stack

- React
- TypeScript
- Vite
- Modern CSS (Grid & Flexbox)

---

## Architecture

This frontend is part of a larger system split into multiple components.

### Offline data pipeline (Python)

Responsible for fetching metadata, computing embeddings, and storing the data in PostgreSQL (Neon).

→ Repository: https://github.com/dmolinsky/what-to-watch-next-pipeline

### Backend API (Spring Boot)

Provides the REST API consumed by this frontend.

- Title lookup
- Recommendation retrieval
- Vector similarity search
- Caching and ranking logic

### Frontend (this repository)

- Consumes the backend API
- Renders search results and recommendation cards
- Handles layout, responsiveness, and UI behavior
- Designed to support rich metadata (e.g. posters, overlays, ranking signals)

---

## Functionality

- Search for titles by name
- Resolve canonical title IDs via API
- Display recommendation cards in a responsive grid
- Stable card layout regardless of title length
- Clean separation between data fetching and presentation

---

## UI & Layout Notes

- Recommendation cards are designed with fixed grid behavior to prevent layout shifts
- Long titles wrap and clamp instead of resizing cards
- The layout is prepared for background images and overlays without structural changes

---

## API Integration

The frontend communicates exclusively with the backend REST API.

### Example endpoints used

GET /api/health
GET /api/titles/{id}
GET /api/titles/{id}/recommendations?limit=5
GET /api/titles/lookup?title={title}

## Configuration

The frontend expects the backend API to be available at a configurable base URL.

Example (development):

CORS is enabled in the backend to allow local frontend development.

---

## Planned Extensions

- Poster images as card backgrounds
- Improved loading and error states
- Richer recommendation context and metadata
- Streaming availability indicators

---

## Why this project?

This frontend complements the backend system by providing a focused UI layer for exploring title similarity and recommendations, while remaining flexible enough to evolve alongside new backend capabilities.
