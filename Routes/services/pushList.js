const express = require("express")
const router = express.Router()
const UserMONGO = require("../../Data/Schemas/UserSchema")
const AuthorizationRoute = require("../Auth/AuthorizationMiddleware")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")

const Limite = rateLimit({
    windowMs: 1 * 60 * 1000 ,
    max: 50,
    message: "too many requests"
})


router.get("/Pushmylists",Limite, AuthorizationRoute , async (req,res) => {
    
    const user = req.Auth
    const [skip, push]= [parseInt(req.headers.skip),parseInt(req.headers.pushnum)]
    if(user.info.user.length !== 24){
        res.status(400).send({
            ok: false,
            statusmensage: "invalid userid"
        })
    }
    
    const Lists = await UserMONGO.aggregate([
        {$match: {_id: mongoose.Types.ObjectId(user.info.user)}},
        {$unwind: "$Lists"},
        {$project: {Lists: 1, _id: 0}},
        {$sort: {"Lists._id": -1}}
       
        
    ]).skip(skip).limit(push)

    if(Lists.length > 0){
        res.status(200).send({
            ok: true,
            data: Lists
        })

    }else{
        res.status(200).send({
            ok: false, 
            statusmensage: "no content",
            data: []

        })


    }


})

router.get("/Pushlist/:listid", Limite, AuthorizationRoute ,async (req, res) => {
    
    const userid = req.Auth.info.user
    const listid = req.params.listid
    if(userid.length !== 24  ||  listid.length !== 24){
        res.status(400).send({
            ok: false, 
            statusmensage: "invalid id(s)",
            id_wrong: userid.length === 24  ? "listid" : "userid",
            list: []
        })
        return
    }


    UserMONGO.aggregate([
        {$match: {_id: mongoose.Types.ObjectId(userid)}},
        {$project: {"Lists": 1, _id: 0}},
        {$unwind: "$Lists"},
         {$match: {"Lists._id": mongoose.Types.ObjectId(listid)  }}
    ]).then(mylistselect => {
            if(mylistselect.length > 0){
                    res.status(200).send({
                        ok: true, 
                        statusmensage: "successful at get list",
                        list: mylistselect[0],

                    })
                }else{
                    res.status(200).send({
                        ok: true, 
                        statusmensage: "no content",
                        list: [],

                    })
                }
    }).catch(err => {
        res.status(400).send({
            ok: false,
            statusmensage: "mongoose aggregate error ",
            list: []
        })

        // tem q melhorar o back aqui um pouco dps / tem umas porra q da pra da pra derrubar o server
        // vai no chao doidona tu q pica entao toma


    })



    

    


})














module.exports = router