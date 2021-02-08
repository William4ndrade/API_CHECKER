const express = require("express")
const router = express.Router()
const UserMONGO = require("../../Data/Schemas/UserSchema")
const AuthorizationRoute = require("../Auth/AuthorizationMiddleware")
const rateLimit = require("express-rate-limit")
const mongoose = require("mongoose")


const Limite = rateLimit({
    windowMs: 1 * 60 * 1000 ,
    max: 20,
    message: "too many requests"
})


router.put("/check", Limite, AuthorizationRoute, async (req, res) => {

   const {id, boolean, index} = req.body
   const user = req.Auth.info.user
  

  const update = await UserMONGO.updateOne({_id: user, "Lists._id": mongoose.Types.ObjectId(id) }, { 
     [`Lists.$.itens.${index}.checked`] : boolean
  })

  if(update.nModified === 1){
        res.status(200).send({
                ok:true, 
                statusmensage: "check updated"
            })

  }else{
    res.status(500).send({
        ok:false, 
        statusmensage: "check no updated"
    })


  }


    
})



















module.exports = router