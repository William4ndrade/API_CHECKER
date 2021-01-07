const express = require("express")
const router = express.Router()
const UserMONGO = require("../../Data/Schemas/UserSchema")
const AuthorizationRoute = require("../Auth/AuthorizationMiddleware")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")
const Limite = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: "too many requests"
})


router.post("/newList", Limite,AuthorizationRoute, async (req, res) => {
    const List = req.body.List
    const { title, itens } = List
    const ADDid = {
        title,
        itens, 
        _id: mongoose.Types.ObjectId()
    }

    const { user } = req.Auth.info

   
    const validado = List.itens.some(e => {
       return e.value && e.value.length <= 250 
    })

    if(List.title && List.title.length <= 30 && List.itens.length > 0 && validado){
       await UserMONGO.findByIdAndUpdate({_id: user}, {$push: {Lists: ADDid}}).then(e => {
            res.status(201).send({
                ok: true, 
                statusmensage: "Criado com sucesso"
            })
        }).catch(err => {
            res.status(400).send({
                ok: false, 
                statusmensage: "erro: " + err
            })

        })




    }else{
        res.status(404).send({
            ok: false,
            statusmensage: "invalid data"
        })
    }






    






})






















module.exports = router