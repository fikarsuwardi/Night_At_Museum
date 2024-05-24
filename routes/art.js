"use strict"

const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/add", Controller.addArtGet)
router.post("/add", Controller.addArtPost)
router.get("/:id", Controller.idDetail)
router.post("/:id/edit", Controller.idEdit)
router.get("/:id/delete", Controller.delete)

module.exports = router