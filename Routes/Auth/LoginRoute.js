const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserMONGO = require("../../Data/Schemas/UserSchema")
const jwt = require("jsonwebtoken")




router.get("/LoginRoute", async (req, res) => {
    const [Email, senha] = req.headers.usc.replace(".willys", "").split(":")
    const userDECODADO = {
        Email: new Buffer(Email, "base64").toString("ascii"),
        Senha: new Buffer(senha, "base64").toString("ascii")
    }

    if(userDECODADO.Email && userDECODADO.Senha){
        const UserTest = await UserMONGO.findOne({Email: userDECODADO.Email}).select({Password: 1, Email: 1, Nome: 1})
        if(UserTest !== null){
            const Password = await bcrypt.compare(userDECODADO.Senha, UserTest.Password)
            if(Password){
                const token =  jwt.sign({ 
                    username: UserTest.Nome , 
                    info: {
                        user: "user1",
                        master: false, 
                        godmod: "amor você é tudo que eu preciso, com vc eu to no seu eu to no paraiso",
                        
                    } 
                }, "winaggen123", {expiresIn: (60000 * 60) * 24})

                res.cookie("Auth", token, {maxAge: new Date(Date.now() + 9999999), httpOnly: true, sameSite: "lax"})

                res.status(202).send({
                    ok: true, 
                    statusmensage: "Login executado com sucesso"
                })



            }else{
                res.status(401).send({
                    ok: false,
                    statusmensage: "Senha incorreta"
                })


            }

            

        }else{
            res.status(401).send({
                ok: false, 
                statusmensage: "Email não encontrado"
            })
        }



    }else{
        res.status(400).send({
            ok: false, 
            statusmensage: "Dados incorretos"
        })








    }

    








})
























module.exports = router