const express = require("express")
const router = express.Router()
const UserMONGO = require("../../Data/Schemas/UserSchema")
const AuthorizationRoute = require("../Auth/AuthorizationMiddleware")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")

const Limite = rateLimit({
    windowMs: 1 * 60 * 1000 ,
    max: 100,
    message: "too many requests"
})


router.get("/Search", AuthorizationRoute, Limite, async (req, res) => {
        const word = new Buffer(req.headers.code, "base64").toString("ascii")   
        const user = req.Auth.info.user

        await UserMONGO.aggregate([
            {$match: {$and: [{_id: mongoose.Types.ObjectId(user)}]}},
            {$project: {Lists: 1, _id: 0}},
            {$unwind: "$Lists"}, 
            // /\[${current_counter}\]/g`
        {$match: {"Lists.title": {$regex: word }}}

        ]).then(e => {
            console.log(e)
            if(e.length > 0){
                res.status(200).send({
                    ok: true, 
                    data: e
                })


            }else{
                res.status(202).send({
                    statusmensage: "no content"
                })
                
            }




        })
       
        



})












module.exports = router
