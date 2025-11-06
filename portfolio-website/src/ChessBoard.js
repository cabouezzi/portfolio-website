import React, { useState, useEffect, useRef } from "react";
import "./ChessBoard.css"; // we’ll style the board

const pieceMap = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
};

function parseFEN(fen) {
  // Use only the board part
  fen = fen.split(" ")[0];

  const rows = fen.split("/");
  const squares = [];

  for (const row of rows) {
    for (const char of row) {
      if (/[1-8]/.test(char)) {
        const empty = parseInt(char, 10);
        for (let i = 0; i < empty; i++) squares.push(null);
      } else {
        squares.push(pieceMap[char] || null);
      }
    }
  }

  if (squares.length !== 64) {
    console.warn("Invalid FEN squares count:", squares.length);
    return Array(64).fill(null);
  }

  return squares;
}

const ChessBoard = () => {
  const [board, setBoard] = useState(Array(64).fill(null));
  const [selected, setSelected] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/game");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ command: "newGame" }));
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log(msg);

        if ((msg.type === "newGame" || msg.type === "moveMade") && msg.board) {
          setBoard(parseFEN(msg.board));
        }

        if (msg.type === "gameEnded") {
          alert("Game ended: " + msg.result);
        }
      } catch (err) {
        console.error("JSON parse error:", err, event.data);
      }
    };

    return () => socket.close();
  }, []);

  const toServerIndex = (idx) => {
    const row = Math.floor(idx / 8);
    const col = idx % 8;
    const flippedRow = 7 - row; // flip vertically
    return flippedRow * 8 + col;
  };

  const onSquareClick = (index) => {
    if (selected === null) {
      if (!board[index]) return;
      setSelected(index);
    } else {
      const from = toServerIndex(selected);
      const to = toServerIndex(index);
      const moveUInt16 = (to << 6) | from;
      socketRef.current.send(JSON.stringify({ move: moveUInt16 }));
      setSelected(null);
    }
  };

  return (
    <div>
      <h2>Chess vs AI</h2>
      <div className="board">
        {board.map((piece, idx) => (
          <div
            key={idx}
            className={`square ${
              (Math.floor(idx / 8) + (idx % 8)) % 2 === 0 ? "white" : "black"
            } ${selected === idx ? "selected" : ""}`}
            onClick={() => onSquareClick(idx)}
          >
            {piece && <span className="piece">{piece}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
