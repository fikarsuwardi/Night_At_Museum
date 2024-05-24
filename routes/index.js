"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers/controller")
const artRoute = require("./art")

router.get("/", Controller.home)

router.use("/arts", artRoute)

module.exports = router