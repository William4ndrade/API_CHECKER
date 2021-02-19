const jwt = require("jsonwebtoken")
const env = require("dotenv").config({path: "../.env"})

const SECRET_KEY = process.env.SECRET_KEY
const Sign = (id, name) => {
    const token = jwt.sign({ 
        username: name , 
        info: {
            user: id,
            master: false, 
            godmod: "amor você é tudo que eu preciso, com vc eu to no céu eu to no paraiso",
            
        } 
    }, SECRET_KEY, {expiresIn: 120000})

    return token

}


const verify = (token) => jwt.verify(token, SECRET_KEY)


const decode = (token) => jwt.decode(token)


module.exports = {Sign, verify, decode}