import React, { useEffect, useRef, useState } from "react";
import { fetchChessModels, requestUciMove } from "./rlChessApi";
import "./ChessBoard.css";

const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const MAX_PLIES = 300;

const pieceImages = {
  K: "/chess/pieces/white-king.png",
  Q: "/chess/pieces/white-queen.png",
  R: "/chess/pieces/white-rook.png",
  B: "/chess/pieces/white-bishop.png",
  N: "/chess/pieces/white-knight.png",
  P: "/chess/pieces/white-pawn.png",
  k: "/chess/pieces/black-king.png",
  q: "/chess/pieces/black-queen.png",
  r: "/chess/pieces/black-rook.png",
  b: "/chess/pieces/black-bishop.png",
  n: "/chess/pieces/black-knight.png",
  p: "/chess/pieces/black-pawn.png",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function squareToIndex(square) {
  const file = square.charCodeAt(0) - "a".charCodeAt(0);
  const rank = Number(square[1]);
  return (8 - rank) * 8 + file;
}

function indexToSquare(index) {
  const file = String.fromCharCode("a".charCodeAt(0) + (index % 8));
  const rank = 8 - Math.floor(index / 8);
  return `${file}${rank}`;
}

function parseFen(fen) {
  const [placement, activeColor = "w", castling = "-", enPassant = "-", halfmove = "0", fullmove = "1"] =
    fen.split(" ");
  const board = [];

  placement.split("/").forEach((row) => {
    row.split("").forEach((char) => {
      if (/[1-8]/.test(char)) {
        for (let i = 0; i < Number(char); i += 1) board.push(null);
      } else {
        board.push(char);
      }
    });
  });

  return {
    board: board.length === 64 ? board : Array(64).fill(null),
    activeColor,
    castling,
    enPassant,
    halfmove: Number(halfmove) || 0,
    fullmove: Number(fullmove) || 1,
  };
}

function parseFenSquares(fen) {
  return parseFen(fen).board.map((piece) => (piece ? pieceImages[piece] || null : null));
}

function boardToPlacement(board) {
  const rows = [];

  for (let row = 0; row < 8; row += 1) {
    let empty = 0;
    let value = "";

    for (let col = 0; col < 8; col += 1) {
      const piece = board[row * 8 + col];

      if (!piece) {
        empty += 1;
      } else {
        if (empty > 0) {
          value += empty;
          empty = 0;
        }

        value += piece;
      }
    }

    rows.push(value + (empty > 0 ? empty : ""));
  }

  return rows.join("/");
}

function removeCastlingRights(castling, rights) {
  const next = castling
    .split("")
    .filter((right) => !rights.includes(right))
    .join("");

  return next || "-";
}

function applyMoveToFen(fen, move) {
  if (!move || move === "(none)") return fen;

  const state = parseFen(fen);
  const board = [...state.board];
  const from = squareToIndex(move.slice(0, 2));
  const to = squareToIndex(move.slice(2, 4));
  const promotion = move[4];
  const piece = board[from];

  if (!piece) return fen;

  const isWhite = piece === piece.toUpperCase();
  const targetPiece = board[to];
  const isPawn = piece.toLowerCase() === "p";
  let castling = state.castling;
  let enPassant = "-";
  let halfmove = isPawn || targetPiece ? 0 : state.halfmove + 1;

  board[from] = null;

  if (isPawn && indexToSquare(to) === state.enPassant && !targetPiece && from % 8 !== to % 8) {
    board[to + (isWhite ? 8 : -8)] = null;
  }

  if (piece === "K") castling = removeCastlingRights(castling, "KQ");
  if (piece === "k") castling = removeCastlingRights(castling, "kq");
  if (from === squareToIndex("h1") || to === squareToIndex("h1")) castling = removeCastlingRights(castling, "K");
  if (from === squareToIndex("a1") || to === squareToIndex("a1")) castling = removeCastlingRights(castling, "Q");
  if (from === squareToIndex("h8") || to === squareToIndex("h8")) castling = removeCastlingRights(castling, "k");
  if (from === squareToIndex("a8") || to === squareToIndex("a8")) castling = removeCastlingRights(castling, "q");

  if (piece.toLowerCase() === "k" && Math.abs(to - from) === 2) {
    if (to === squareToIndex("g1")) {
      board[squareToIndex("f1")] = board[squareToIndex("h1")];
      board[squareToIndex("h1")] = null;
    } else if (to === squareToIndex("c1")) {
      board[squareToIndex("d1")] = board[squareToIndex("a1")];
      board[squareToIndex("a1")] = null;
    } else if (to === squareToIndex("g8")) {
      board[squareToIndex("f8")] = board[squareToIndex("h8")];
      board[squareToIndex("h8")] = null;
    } else if (to === squareToIndex("c8")) {
      board[squareToIndex("d8")] = board[squareToIndex("a8")];
      board[squareToIndex("a8")] = null;
    }
  }

  if (isPawn && Math.abs(to - from) === 16) {
    enPassant = indexToSquare((from + to) / 2);
  }

  board[to] = promotion ? (isWhite ? promotion.toUpperCase() : promotion.toLowerCase()) : piece;

  const activeColor = state.activeColor === "w" ? "b" : "w";
  const fullmove = state.activeColor === "b" ? state.fullmove + 1 : state.fullmove;

  return `${boardToPlacement(board)} ${activeColor} ${castling} ${enPassant} ${halfmove} ${fullmove}`;
}

function getMoveFromResponse(response) {
  return response?.bestmove || response?.bestMove || response?.move?.uci || response?.move || null;
}

function getFenFromResponse(response) {
  return response?.fen || response?.state?.fen || null;
}

function isTerminalResponse(response, move) {
  return Boolean(
    response?.gameOver ||
      response?.state?.status === "complete" ||
      response?.state?.status === "game-over" ||
      response?.status === "complete" ||
      response?.status === "game-over" ||
      response?.result ||
      !move ||
      move === "(none)"
  );
}

function ChessBoardView({ fen }) {
  const board = parseFenSquares(fen);

  return (
    <div className="board">
      {board.map((piece, index) => (
        <div
          key={index}
          className={`square ${(Math.floor(index / 8) + (index % 8)) % 2 === 0 ? "white" : "black"}`}
        >
          {piece && <img src={piece} alt="" className="piece" />}
        </div>
      ))}
    </div>
  );
}

export default function ChessAI2() {
  const [models, setModels] = useState([]);
  const [whiteModelId, setWhiteModelId] = useState("");
  const [blackModelId, setBlackModelId] = useState("");
  const [mode, setMode] = useState("immediate");
  const [moves, setMoves] = useState([]);
  const [positions, setPositions] = useState([INITIAL_FEN]);
  const [viewIndex, setViewIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState("Select two checkpoints and press play.");
  const [error, setError] = useState(null);
  const stopRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadModels() {
      try {
        setError(null);
        const availableModels = await fetchChessModels();

        if (!isMounted) return;

        setModels(availableModels);
        setWhiteModelId(availableModels[0]?.id || "");
        setBlackModelId(availableModels[1]?.id || availableModels[0]?.id || "");

        if (availableModels.length === 0) {
          setStatus("No model checkpoints returned by the project API.");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message);
        setStatus("Could not load model checkpoints.");
      }
    }

    loadModels();

    return () => {
      isMounted = false;
      stopRef.current = true;
    };
  }, []);

  const selectedFen = positions[viewIndex] || INITIAL_FEN;
  const selectedMove = viewIndex === 0 ? "Starting position" : moves[viewIndex - 1];
  const canPlay = whiteModelId && blackModelId && !isPlaying;

  const resetGame = () => {
    stopRef.current = true;
    setIsPlaying(false);
    setMoves([]);
    setPositions([INITIAL_FEN]);
    setViewIndex(0);
    setStatus("Ready.");
    setError(null);
  };

  const playGame = async () => {
    if (!whiteModelId || !blackModelId) return;

    stopRef.current = false;
    setIsPlaying(true);
    setError(null);
    setStatus("Playing...");

    let nextMoves = [];
    let nextPositions = [INITIAL_FEN];
    let currentFen = INITIAL_FEN;

    setMoves(nextMoves);
    setPositions(nextPositions);
    setViewIndex(0);

    try {
      for (let ply = 0; ply < MAX_PLIES && !stopRef.current; ply += 1) {
        if (mode === "delayed" && ply > 0) {
          setStatus("Waiting before next move...");
          await sleep(3000);
        }

        if (stopRef.current) break;

        const modelId = ply % 2 === 0 ? whiteModelId : blackModelId;
        const side = ply % 2 === 0 ? "White" : "Black";
        setStatus(`${side} to move.`);

        const response = await requestUciMove({ modelId, moves: nextMoves });
        const move = getMoveFromResponse(response);

        if (isTerminalResponse(response, move)) {
          setStatus(response?.result ? `Game over: ${response.result}` : "Game over.");
          break;
        }

        currentFen = getFenFromResponse(response) || applyMoveToFen(currentFen, move);
        nextMoves = [...nextMoves, move];
        nextPositions = [...nextPositions, currentFen];

        setMoves(nextMoves);
        setPositions(nextPositions);
        setViewIndex(nextPositions.length - 1);
      }

      if (nextMoves.length >= MAX_PLIES) {
        setStatus(`Stopped after ${MAX_PLIES} plies.`);
      }
    } catch (err) {
      setError(err.message);
      setStatus("Game stopped because the project API returned an error.");
    } finally {
      setIsPlaying(false);
    }
  };

  const stopGame = () => {
    stopRef.current = true;
    setIsPlaying(false);
    setStatus("Stopped.");
  };

  return (
    <div className="w-full text-slate-100">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,420px)_1fr]">
        <div className="flex flex-col items-center gap-4">
          <ChessBoardView fen={selectedFen} />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewIndex(0)}
              disabled={isPlaying || viewIndex === 0}
              className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
              title="Go to beginning"
            >
              |&lt;
            </button>
            <button
              onClick={() => setViewIndex((index) => Math.max(0, index - 1))}
              disabled={isPlaying || viewIndex === 0}
              className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
              title="Previous move"
            >
              &lt;
            </button>
            <span className="min-w-[92px] text-center text-sm text-slate-300">
              {viewIndex} / {positions.length - 1}
            </span>
            <button
              onClick={() => setViewIndex((index) => Math.min(positions.length - 1, index + 1))}
              disabled={isPlaying || viewIndex >= positions.length - 1}
              className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
              title="Next move"
            >
              &gt;
            </button>
            <button
              onClick={() => setViewIndex(positions.length - 1)}
              disabled={isPlaying || viewIndex >= positions.length - 1}
              className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
              title="Go to end"
            >
              &gt;|
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              White model
              <select
                value={whiteModelId}
                onChange={(event) => setWhiteModelId(event.target.value)}
                disabled={isPlaying}
                className="rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.displayName}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Black model
              <select
                value={blackModelId}
                onChange={(event) => setBlackModelId(event.target.value)}
                disabled={isPlaying}
                className="rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.displayName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded border border-slate-600 bg-slate-900 p-1">
              <button
                onClick={() => setMode("immediate")}
                disabled={isPlaying}
                className={`px-4 py-2 rounded ${mode === "immediate" ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                Immediate
              </button>
              <button
                onClick={() => setMode("delayed")}
                disabled={isPlaying}
                className={`px-4 py-2 rounded ${mode === "delayed" ? "bg-blue-600" : "hover:bg-slate-700"}`}
              >
                Delayed
              </button>
            </div>

            <button
              onClick={playGame}
              disabled={!canPlay}
              className="rounded bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-500 disabled:opacity-40"
            >
              Play
            </button>
            <button
              onClick={isPlaying ? stopGame : resetGame}
              className="rounded bg-slate-700 px-5 py-2 font-semibold hover:bg-slate-600"
            >
              {isPlaying ? "Stop" : "Reset"}
            </button>
          </div>

          <div className="rounded border border-slate-700 bg-slate-900/70 p-4">
            <div className="text-sm uppercase tracking-wide text-slate-400">Status</div>
            <div className="mt-1 text-slate-100">{status}</div>
            {error && <div className="mt-3 text-sm text-red-300">{error}</div>}
            <div className="mt-3 text-sm text-slate-400">Current move: {selectedMove}</div>
          </div>

          <div className="rounded border border-slate-700 bg-slate-900/70 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm uppercase tracking-wide text-slate-400">Move history</div>
              <div className="text-sm text-slate-500">{moves.length} plies</div>
            </div>
            <div className="max-h-64 overflow-y-auto font-mono text-sm text-slate-200">
              {moves.length === 0 ? (
                <div className="text-slate-500">No moves yet.</div>
              ) : (
                <div className="grid grid-cols-[48px_1fr_1fr] gap-x-3 gap-y-1">
                  {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, index) => (
                    <React.Fragment key={index}>
                      <div className="text-slate-500">{index + 1}.</div>
                      <button
                        onClick={() => setViewIndex(index * 2 + 1)}
                        disabled={isPlaying}
                        className="text-left hover:text-blue-300 disabled:hover:text-slate-200"
                      >
                        {moves[index * 2] || ""}
                      </button>
                      <button
                        onClick={() => setViewIndex(index * 2 + 2)}
                        disabled={isPlaying || !moves[index * 2 + 1]}
                        className="text-left hover:text-blue-300 disabled:hover:text-slate-200"
                      >
                        {moves[index * 2 + 1] || ""}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
