const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserMONGO = require("../../Data/Schemas/UserSchema")
const jwt = require("jsonwebtoken")




router.get("/LoginRoute", async (req, res) => {
    const [Email, senha] = req.headers.usc.replace(".willys", "").split(":")
    const userDECODADO = {
        Email: new Buffer(Email, "base64").toString("ascii"),
        Senha: new Buffer(senha, "base64").toString("ascii")
    }









})
























module.exports = router