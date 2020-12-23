const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")

// ROTAS 
const RegisterRoute = require("./Routes/RegisterRoute")

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(RegisterRoute)












app.listen(8081, () => console.log("Listen on port 8080"))