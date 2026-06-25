const http = require("http");
const { spawn } = require("child_process");

const PORT = Number(process.env.CHESS_RL_API_PORT || 5050);
const HOST = process.env.CHESS_RL_API_HOST || "127.0.0.1";
const STOCKFISH_PATH = process.env.STOCKFISH_PATH || "/opt/homebrew/bin/stockfish";

const MODELS = [
  {
    id: "stockfish-depth-1",
    displayName: "Stockfish Depth 1",
    trainingStep: 1,
    depth: 1,
  },
  {
    id: "stockfish-depth-4",
    displayName: "Stockfish Depth 4",
    trainingStep: 4,
    depth: 4,
  },
  {
    id: "stockfish-depth-8",
    displayName: "Stockfish Depth 8",
    trainingStep: 8,
    depth: 8,
  },
];

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function normalizeCommands(commands, model) {
  return commands.map((command) => {
    const trimmed = String(command).trim();
    return trimmed === "go" ? `go depth ${model.depth}` : trimmed;
  });
}

function runStockfish(commands) {
  return new Promise((resolve, reject) => {
    const engine = spawn(STOCKFISH_PATH, []);
    const lines = [];
    const errors = [];
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      engine.kill();
      reject(new Error("Stockfish did not return a move before the timeout."));
    }, 10000);

    engine.stdout.on("data", (data) => {
      const text = data.toString();
      lines.push(text);

      const bestMoveLine = text
        .split(/\r?\n/)
        .find((line) => line.startsWith("bestmove "));

      if (!bestMoveLine || settled) return;

      const [, bestmove, ponder] = bestMoveLine.split(/\s+/);
      settled = true;
      clearTimeout(timeout);
      engine.stdin.write("quit\n");
      resolve({
        bestmove,
        ponder: ponder === "ponder" ? bestMoveLine.split(/\s+/)[3] : null,
      });
    });

    engine.stderr.on("data", (data) => {
      errors.push(data.toString());
    });

    engine.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(error);
    });

    engine.on("exit", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      reject(new Error(`Stockfish exited before bestmove. Code: ${code}. ${errors.join("")}`));
    });

    engine.stdin.write("uci\n");
    engine.stdin.write("isready\n");

    commands.forEach((command) => {
      engine.stdin.write(`${command}\n`);
    });
  });
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && request.url === "/chess-rl/models") {
    sendJson(response, 200, {
      models: MODELS.map(({ depth, ...model }) => model),
    });
    return;
  }

  if (request.method === "POST" && request.url === "/chess-rl/uci") {
    try {
      const body = await readBody(request);
      const model = MODELS.find((candidate) => candidate.id === body.modelId);

      if (!model) {
        sendJson(response, 404, {
          error: {
            code: "MODEL_NOT_FOUND",
            message: `Unknown model id: ${body.modelId}`,
          },
        });
        return;
      }

      if (!Array.isArray(body.commands) || body.commands.length === 0) {
        sendJson(response, 400, {
          error: {
            code: "INVALID_UCI_COMMANDS",
            message: "Expected commands to be a non-empty array.",
          },
        });
        return;
      }

      const startedAt = Date.now();
      const result = await runStockfish(normalizeCommands(body.commands, model));

      sendJson(response, 200, {
        ...result,
        modelId: model.id,
        info: {
          depth: model.depth,
          latencyMs: Date.now() - startedAt,
        },
      });
    } catch (error) {
      sendJson(response, 500, {
        error: {
          code: "ENGINE_ERROR",
          message: error.message,
        },
      });
    }
    return;
  }

  sendJson(response, 404, {
    error: {
      code: "NOT_FOUND",
      message: "Route not found.",
    },
  });
}

http.createServer(handleRequest).listen(PORT, HOST, () => {
  console.log(`Chess RL API listening on http://${HOST}:${PORT}`);
  console.log(`Using Stockfish at ${STOCKFISH_PATH}`);
});
