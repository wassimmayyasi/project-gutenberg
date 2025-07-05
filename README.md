# Book Character Interaction Graph

A simple React + TypeScript app that fetches and visualizes character interaction graphs for books based on a 5-digit book ID.

## Features

- Input a 5-digit book ID
- Fetches graph data from a backend API
- Displays a loading spinner during fetch
- Renders two static force-directed graphs using `react-d3-graph`
- Fully styled with Tailwind CSS

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Zod + React Hook Form for form validation
- react-d3-graph for interactive graph visualization

## Getting Started

### 1. Install dependencies

```
npm install
```
### 2. Run the development service
```
npm run dev
```

### 3. API Requirements
Ensure your backend is running and accessible at:
- `GET http://localhost:8000/get_book_analysis?book_id=12345`

It returns a response similar to:

```
{
  "result": {
    "nodes_with_edges": [{ "id": "Character1" }, ...],
    "nodes_without_edges": [{ "id": "Character3" }, ...],
    "edges": [{ "source": "Character1", "target": "Character2", "label": "speaks to" }, ...]
  }
}
```


## 🧑‍💻Author
#### Wassim Mayyasi
#### Full-stack Engineeer