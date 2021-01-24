const express = require("express")
const router = express.Router()
const UserMONGO = require("../../Data/Schemas/UserSchema")
const AuthorizationRoute = require("../Auth/AuthorizationMiddleware")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")

const Limite = rateLimit({
    windowMs: 1 * 60 * 1000 ,
    max: 10,
    message: "too many requests"
})


router.get("/Pushmylists",Limite, AuthorizationRoute , async (req,res) => {
    
    const user = req.Auth
 //   const [pushNum,skip ] = [req.headers.pushNum, req.headers.skip]


    const Lists = await UserMONGO.aggregate([
        {$match: {_id: mongoose.Types.ObjectId(user.info.user)}},
        {$unwind: "$Lists"},
        {$project: {Lists: 1, _id: 0}}
        
    ]).limit(20)

    if(Lists.length > 0){
        res.status(200).send({
            ok: true,
            data: Lists
        })

    }


    
   

    
    




})














module.exports = router