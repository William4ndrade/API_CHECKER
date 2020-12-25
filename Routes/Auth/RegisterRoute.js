const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserMONGO = require("../../Data/Schemas/UserSchema")
const jwt = require("jsonwebtoken")




router.post("/RegisterRoute", async (req, res) => { 
    const userencode = req.body.Data.replace(".willys", "").split(":")
    const [Email, password] = userencode
    const userDECODADO = {
        Email: new Buffer(Email, "base64").toString("ascii"),
        Password: new Buffer(password, "base64").toString("ascii")
    }    
    if(!userDECODADO.Email || !userDECODADO.Password){
        res.status(400).send({
            ok: false, 
            statusmensage: "No content"
        })
    }else{
        await new UserMONGO({
            Email: userDECODADO.Email,
            Password: await bcrypt.hash(userDECODADO.Password, 10)
        }).save().then(e => {


           const token =  jwt.sign({
                id: e.id, 
                username: null // talvez dps eu faço algo em relação a isso
            }, "winaggen123", {expiresIn: (60000 * 60) * 24})

            res.cookie("Auth", token, {maxAge: new Date(Date.now() + 9999999), httpOnly: true, sameSite: "lax"})

            res.status(201).send({
                ok: true, 
                statusmensage: "Created",
            })
            

        }).catch(err => {
            if(err.code === 11000){
                res.status(400).send({
                    ok: false, 
                    statusmensage: "Email aready exists"
                })
            }else{
                res.status(400).send({
                    ok: false, 
                    statusmensage: "ERROR MENSAGE FROM MONGODB: " + err
                })

            }

            

        })
        
        

       



    }
    


    
    
    

    
})










module.exports = router