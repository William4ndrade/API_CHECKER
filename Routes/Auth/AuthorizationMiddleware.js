const jwt = require("../../jwt/JwtFunctions")

module.exports = authMiddleware = (req, res, next) => {

    const token = req.cookies.Auth
    console.log(req.cookies.Auth)
    if(token){
        try{
            const user = jwt.verify(token)
            req.Auth = user

            next()
            
        }catch(erro){
            res.status(401).send({
                ok:false,
                statusmensage: "token invalid"

            })

        }

        
    }else{
        res.status(401).send({
            ok: false,
            statusmensage: "token don't exist"
        })


    }

}


