# Dev Gupta Portfolio

A responsive creative-developer portfolio built with React, Vite, CSS, and anime.js. The contact form submits to an Express API and stores messages in MongoDB.

## Requirements

- Node.js 20.19+ or 22.12+
- npm
- MongoDB for contact form submissions

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure the API by following [server/README.md](./server/README.md). Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.

## Run locally

Run the frontend and API in separate terminals:

```sh
npm run dev
npm run server
```

Vite serves the portfolio at the URL it prints (normally `http://localhost:5173`). Its `/api` development proxy forwards contact requests to `http://localhost:3001`.

## Build and preview

```sh
npm run build
npm run preview
```

## Contact messages

The browser validates the form and sends JSON to `/api/contact`. The Express API validates the request, rate-limits submissions, and inserts accepted messages into the MongoDB `messages` collection. Database credentials stay on the server and are never included in the frontend build.

For production, deploy the static `dist/` folder and the API separately. Set `VITE_API_URL` to the public API origin at build time, and configure the API's `ALLOWED_ORIGIN` to your portfolio's exact origin. See [server/README.md](./server/README.md) for deployment details.
