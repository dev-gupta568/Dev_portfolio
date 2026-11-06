# Contact API setup

The API is an Express service backed by MongoDB. It accepts contact messages at `POST /api/contact` and exposes `GET /api/health`.

## Set up MongoDB

Use a local MongoDB server or create a MongoDB Atlas cluster. For Atlas, copy the cluster connection string from the dashboard and allow your API host to connect in the cluster's network access settings. Keep the connection string private; it is only used by the server.

## Configure and run locally

Copy `.env.example` to `.env` in the `server/` directory, then set the values:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=dev_portfolio
PORT=3001
ALLOWED_ORIGIN=http://localhost:5173
TRUST_PROXY=false
```

For Atlas, use the provided `mongodb+srv://` URI for `MONGODB_URI`. The database is created automatically when the first contact message is saved.

Start the API from the project root:

```sh
npm run server
```

Vite's development proxy forwards `/api` requests to `http://localhost:3001`. Check the API with `http://localhost:3001/api/health`. The health endpoint returns `{"ok":true}` when MongoDB is reachable. If the API does not start or returns `503`, verify `MONGODB_URI`, `MONGODB_DB_NAME`, and that your MongoDB server or Atlas cluster is available.

## Deploy

Deploy the API to a Node.js host and configure `MONGODB_URI`, `MONGODB_DB_NAME`, `PORT` (if required by the host), and `ALLOWED_ORIGIN` as server environment variables. Set `TRUST_PROXY=true` only when the API is behind a trusted reverse proxy and the deployment is not automatically detected as production.

Build the static frontend with `npm run build`, then deploy `dist/` to a static host. Set `VITE_API_URL` to the public API origin at build time (for example, `https://api.example.com`). Leave it unset when the frontend and API are served from the same origin. Configure `ALLOWED_ORIGIN` to the exact public portfolio origin, such as `https://portfolio.example.com`.

Do not put `MONGODB_URI` or other server secrets in a `VITE_` variable; Vite exposes `VITE_` values to browser code.

## Read submitted messages

Use `mongosh` to connect to the configured MongoDB database (replace `<database_name>` with the value of `MONGODB_DB_NAME`) and inspect recent messages:

```javascript
use <database_name>
db.messages.find().sort({ createdAt: -1 })
```
