"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.post("http://localhost:5000/feed", {
        title,
        message,
      });

      setSuccess("Feed added successfully");

      setTitle("");
      setMessage("");
    } catch (err) {
      setError("Failed to add feed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Feed Title
              </label>

              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Feed Message
              </label>

              <textarea
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-blue-500"
              />
            </div>

            {success && (
              <div className="bg-green-500/20 border border-green-500 p-3 rounded-lg">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Adding Feed..." : "Add Feed"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}