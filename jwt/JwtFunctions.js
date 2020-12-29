const jwt = require("jsonwebtoken")
const env = require("dotenv").config({path: "../.env"})

const SECRET_KEY = "SAKDJAKDASJDWI219132IASDJKASJDKASDNXZCNMNWJKHQJSDNJQOJ2OISKDJALSNDJKH2891JASCMSXJSKDHUIQWHQDJSAD"
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

console.log(SECRET_KEY)

const verify = (token) => jwt.verify(token, SECRET_KEY)


const decode = (token) => jwt.decode(token)


module.exports = {Sign, verify, decode}