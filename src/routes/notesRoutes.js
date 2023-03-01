const express = require("express");
const res = require("express/lib/response");
const { updateNote } = require("../controllers/noteController.js");
const { deleteNote } = require("../controllers/noteController.js");
const { createNote } = require("../controllers/noteController.js");
const { getNote } = require("../controllers/noteController.js");
const auth = require("../middleware/auth");
const noteRouter = express.Router();

noteRouter.get("/", auth, getNote)
noteRouter.post("/", auth, createNote)
noteRouter.delete("/:id", auth, deleteNote)
noteRouter.put("/:id", auth, updateNote)

module.exports = noteRouter