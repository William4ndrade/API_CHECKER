const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserMONGO = require("../../Data/Schemas/UserSchema")
const Jwt = require("../../jwt/JwtFunctions")



router.post("/RegisterRoute", async (req, res) => { 
    const userencode = req.body.Data.replace(".willys", "").split(":")
    const [Email, password, nome] = userencode
    const userDECODADO = {
        Email: new Buffer(Email, "base64").toString("ascii"),
        Password: new Buffer(password, "base64").toString("ascii"),
        Nome: new Buffer(nome, "base64").toString("ascii")
    }    
    


    if(!userDECODADO.Email || !userDECODADO.Password || !userDECODADO.Nome){
        res.status(400).send({
            ok: false, 
            statusmensage: "No content"
        })
    }else{
        const emailcheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(emailcheck.test(userDECODADO.Email) && userDECODADO.Nome.length <= 12){
            await new UserMONGO({
                Email: userDECODADO.Email,
                Nome: userDECODADO.Nome.replace(/</g, "&lt").replace(/>/g, "&gt"),
                Password: await bcrypt.hash(userDECODADO.Password, 10)
            }).save().then(e => {
               const token =  Jwt.Sign(e.id, e.Nome)
                res.cookie("Auth", token, {maxAge: new Date(Date.now() + 9999999), httpOnly: true, sameSite: "lax"})
    
                res.status(201).send({
                    ok: true, 
                    statusmensage: "Created",
                })
                
    
            }).catch(err => {
                if(err.code === 11000){
                    res.status(400).send({
                        ok: false, 
                        statusmensage: "Email aready exists",
                        code: err.code
                    })
                }else{
                    res.status(400).send({
                        ok: false, 
                        statusmensage: "ERROR MENSAGE FROM MONGODB: " + err
                    })
    
                }
    
                
    
            })
            
        }else{
            res.status(400).send({
                ok: false, 
                statusmensage: "Dados incorretos"
            })

        }

       
        
        

       



    }
    


    
    
    

    
})










module.exports = router