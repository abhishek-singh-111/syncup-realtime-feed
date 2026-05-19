require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// CONNECT DB
connectDB();

// CONNECT REDIS
connectRedis();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  console.log(`Socket Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

// ROUTES
const feedRoutes = require("./routes/feedRoutes")(io);

app.use("/feed", feedRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});