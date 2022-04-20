const app = require("express");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.json("HOME");
});

router.get("/endpoint", async (req, res) => {
  res.json("endpoint");
});

router.get("/username", async (req, res) => {
  res.json("username");
});

router.get("/password", async (req, res) => {
  res.json("password");
});

module.exports = router;
