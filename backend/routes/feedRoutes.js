const express = require("express");
const Feed = require("../models/Feed");
const { redisClient } = require("../config/redis");

const router = express.Router();

module.exports = (io) => {

  // GET FEEDS
  router.get("/", async (req, res) => {
    try {

      // CHECK REDIS CACHE
      const cachedFeeds = await redisClient.get("feeds");

      if (cachedFeeds) {
        console.log("Serving from Redis");

        return res.json(JSON.parse(cachedFeeds));
      }

      // FETCH FROM DB
      const feeds = await Feed.find().sort({ createdAt: -1 });

      // STORE IN REDIS
      await redisClient.setEx("feeds",60,JSON.stringify(feeds));

      console.log("Serving from MongoDB");

      res.json(feeds);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  // POST FEED
  router.post("/", async (req, res) => {
    try {

      const { title, message } = req.body;

      const newFeed = await Feed.create({
        title,
        message,
      });

      // CLEAR REDIS CACHE
      await redisClient.del("feeds");

      // EMIT REALTIME EVENT
      io.emit("newFeed", newFeed);

      res.status(201).json(newFeed);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return router;
};