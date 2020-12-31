const express = require("express")
const router = express.Router()
const AuthorizationRouteMiddleware = require("./AuthorizationMiddleware")


router.get("/isauth", AuthorizationRouteMiddleware ,async (req, res) => {
    
     res.status(200).send({
        ok: true, 
        statusmensage: "Authenticaded", 
        user: req.Auth.username
    })
})



module.exports = router