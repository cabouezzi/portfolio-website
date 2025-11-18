import React, { useState, useEffect, useRef } from "react";

export default function GPTViewer() {
  const [lines, setLines] = useState([""]);
  const [eventSource, setEventSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll only if user is at the bottom
  useEffect(() => {
    if (!scrollRef.current) return;
    const element = scrollRef.current;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom) {
      element.scrollTop = element.scrollHeight;
    }
  }, [lines]);

  // Reset on component mount/reload
  useEffect(() => {
    reset();
  }, []);

  const connectStream = () => {
    if (eventSource) return;

    const es = new EventSource("http://localhost:8000/stream");
    setEventSource(es);

    es.onmessage = (e) => {
      const token = e.data.replace("\\n", "\n");

      setLines((prev) => {
        let updated = [...prev];
        updated[updated.length - 1] += token;
        updated = updated.map((line) => (line === "" ? "\u00A0" : line));

        if (updated.length > 50) {
          updated = updated.slice(updated.length - 50);
        }

        return updated;
      });
    };

    es.onerror = (err) => {
      console.error("SSE error — closing.", err);
      setError("Connection error: Unable to connect to stream");
      es.close();
      setEventSource(null);
      setIsPlaying(false);
    };
  };

  const stopStream = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  };

  const play = async () => {
    try {
      setError(null);
      await fetch("http://localhost:8000/play", { method: "POST" });
      connectStream();
      setIsPlaying(true);
    } catch (err) {
      setError(`Failed to play: ${err.message}`);
      setIsPlaying(false);
    }
  };

  const pause = async () => {
    try {
      setError(null);
      await fetch("http://localhost:8000/pause", { method: "POST" });
      stopStream();
      setIsPlaying(false);
    } catch (err) {
      setError(`Failed to pause: ${err.message}`);
    }
  };

  const reset = async () => {
    try {
      setError(null);
      stopStream();
      await fetch("http://localhost:8000/reset", { method: "POST" });
      setLines([""]);
      setIsPlaying(false);
    } catch (err) {
      setError(`Failed to reset: ${err.message}`);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Infinite Shakespeare Script Generator!</h2>
        
        <div className="flex gap-2">
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-2xl"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-2xl"
            title="Reset"
          >
            ↻
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-96 overflow-y-scroll whitespace-pre-wrap font-mono text-sm bg-slate-800 p-4 rounded-xl border border-slate-700"
      >
        {error && (
          <div className="text-red-400 mb-4 font-bold">
            ⚠️ Error: {error}
          </div>
        )}
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
