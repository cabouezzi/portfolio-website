const protocol = window.location.protocol === "https:" ? "https" : "http";
const endpoint = `${protocol}://${window.location.host}/chess-rl`;

async function request(path, options = {}) {
  const response = await fetch(`${endpoint}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;

    try {
      const data = await response.json();
      message = data?.error?.message || data?.message || message;
    } catch {
      const text = await response.text();
      message = text || message;
    }

    throw new Error(message);
  }

  return response.json();
}

export async function fetchChessModels() {
  const data = await request("/models");
  const models = Array.isArray(data) ? data : data.models;

  return (models || []).map((model) => ({
    ...model,
    id: String(model.id),
    displayName: model.displayName || model.name || String(model.id),
  }));
}

export async function requestUciMove({ modelId, moves }) {
  const positionCommand =
    moves.length === 0
      ? "position startpos"
      : `position startpos moves ${moves.join(" ")}`;

  return request("/uci", {
    method: "POST",
    body: JSON.stringify({
      modelId,
      commands: [positionCommand, "go"],
    }),
  });
}
