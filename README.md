# 🧭 Nginx Reverse Proxy Setup (React + WebSocket Backend)

This setup serves a React frontend and a WebSocket-based backend (chess game server) through **Nginx**, all accessible via a single external port (`3000`).
It supports both standard HTTP and WebSocket upgrades.

---

## ⚙️ Overview

* **React frontend** runs locally on **port 3001**
* **Backend WebSocket/API server** runs locally on **port 8080**
* **Nginx** listens on **port 3000**, acting as a reverse proxy:

  * `/` → forwards to the frontend
  * `/game/` → forwards to the backend WebSocket server

Externally, users connect to:

```
http://<your-domain-or-ip>:3000
```

The frontend and backend both appear to come from the same origin.

---

## 🧩 Nginx Configuration

File: `/etc/nginx/sites-enabled/default`

```nginx
server {
    listen 3000;
    server_name _;  # underscore means “any host”

    # React frontend
    location / {
        proxy_pass http://localhost:3001;  # React dev/build server
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    # Backend WebSocket/API
    location /game/ {
        proxy_pass http://localhost:8080/;  # backend WebSocket server
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

### ✅ Key points

* Nginx listens on port **3000** (the only forwarded port).
* `/game/` requests are proxied to your backend (`localhost:8080`).
* `/` requests are proxied to your React app (`localhost:3001`).
* WebSocket headers (`Upgrade`, `Connection`) ensure persistent connections.

---

## 🌐 React Frontend Configuration

Your frontend connects to the backend through:

```js
const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const socket = new WebSocket(`${protocol}://${window.location.host}/game/game`);
```

### Why `/game/game`?

* The **first `/game/`** part matches the Nginx location block.
* The **second `/game`** is the WebSocket path your backend listens on.
* Together:

  * Browser sends → `/game/game`
  * Nginx strips `/game/` (from location) and passes → `/game` to backend

So this maps perfectly when your backend WebSocket server uses:

```js
new WebSocketServer({ path: "/game", port: 8080 });
```

---

## 🚀 Commands

Start or reload Nginx:

```bash
sudo systemctl restart nginx
# or
sudo nginx -t && sudo systemctl reload nginx
```

View logs:

```bash
sudo journalctl -u nginx --no-pager -n 50
```

Stop Nginx temporarily:

```bash
sudo systemctl stop nginx
```

---

## 🧠 Port Forwarding Setup

In your router (or cloud firewall), forward:

```
External port 3000  →  Internal port 3000 (your server)
```

That’s the only port that needs to be open to the outside world.

---

## 🧩 Example Network Flow

| Request                      | Nginx Forwards To           | Purpose             |
| ---------------------------- | --------------------------- | ------------------- |
| `GET /`                      | `localhost:3001/`           | React frontend      |
| `GET /static/...`            | `localhost:3001/static/...` | Frontend assets     |
| `GET /game/game` (WebSocket) | `localhost:8080/game`       | Backend WS endpoint |

---

## ✅ Verification Checklist

* [x] `sudo nginx -t` reports syntax OK
* [x] Backend responds locally: `curl http://localhost:8080/game`
* [x] React dev server running on port 3001
* [x] `http://<your-domain>:3000` loads React
* [x] WebSocket connects successfully (`console.log("WebSocket connected")`)
