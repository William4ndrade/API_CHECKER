const express = require("express")
const router = express.Router()




router.get("/loggout", (req, res) => {

     res.clearCookie('Auth', {path: "/"})

    res.status(200).send({
        ok: true,
        statusmensage: "Loggout feito com sucesso",
    })



})













module.exports = router