"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"]
});

export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const fetchFeeds = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/feed");

      setFeeds(res.data);

      setError("");
    } catch (err) {
      setError("Failed to load feeds");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();

    socket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    // Prevent duplicate listeners
    socket.off("newFeed");

    socket.on("newFeed", (newFeed) => {
      setFeeds((prev) => {
        const exists = prev.find((feed) => feed._id === newFeed._id);

        if (exists) return prev;

        return [newFeed, ...prev];
      });
    });

    return () => {
      socket.off("newFeed");
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            Realtime Coaching Feed
          </h1>

          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              connected
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {connected ? "Live" : "Disconnected"}
          </div>
        </div>

        {loading && (
          <div className="text-gray-400">
            Loading feeds...
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && feeds.length === 0 && (
          <div className="bg-zinc-900 p-8 rounded-2xl text-center text-gray-400">
            No feeds available
          </div>
        )}

        <div className="space-y-4">
          {feeds.map((feed) => (
            <div
              key={feed._id}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-lg hover:border-zinc-600 transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-semibold">
                  {feed.title}
                </h2>

                <span className="text-xs text-gray-400">
                  {new Date(feed.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {feed.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}