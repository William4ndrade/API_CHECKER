const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const axios = require("axios").default


// heroku cheat
   setInterval(() => {
        axios.get("https://checker-api-heroku.herokuapp.com/").then(e => console.log("bateu")).catch(e=> console.log("bateu com erro"))
   }, 600000)


// ROTAS 
const RegisterRoute = require("./Routes/Auth/RegisterRoute")
const LoginRoute = require("./Routes/Auth/LoginRoute")
const IsAuth = require("./Routes/Auth/IsAuthenticaded")
const Loggout = require("./Routes/Auth/LoggoutRoute")
const NewList = require("./Routes/services/Newlist")
const PushList = require("./Routes/services/pushList")
const check = require("./Routes/services/check")
const search = require("./Routes/services/search")



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "https://ch3cker.herokuapp.com");
    res.header("Access-Control-Allow-Headers", ["Content-Type", "usc", "skip","pushNum", "code"] );
    res.header("Access-Control-Allow-Methods", ["PUT", "GET", "DELETE", "POST"])
    next()
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(RegisterRoute)
app.use(LoginRoute)
app.use(IsAuth)
app.use(Loggout)
app.use(NewList)
app.use(PushList)
app.use(check)
app.use(search)












app.listen(process.env.PORT || 8080, () => console.log("Listen on port 8080"))