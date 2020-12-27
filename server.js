const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const cookieparser = require("cookie-parser")

// ROTAS 
const RegisterRoute = require("./Routes/Auth/RegisterRoute")
const LoginRoute = require("./Routes/Auth/LoginRoute")
const cookieParser = require("cookie-parser")

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", ["Content-Type", "usc"] );
    next()
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(RegisterRoute)
app.use(LoginRoute)












app.listen(8080, () => console.log("Listen on port 8080"))