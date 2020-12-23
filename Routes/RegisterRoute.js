const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")



router.post("/RegisterRoute", (req, res) => {
    
    
    if(1 == 1){
        res.status(401).send({
            ok: false
        })

    }
    

    
})










module.exports = router