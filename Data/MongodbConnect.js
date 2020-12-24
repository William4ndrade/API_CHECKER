const mongodb = require("mongoose")


mongodb.Promise = global.Promise
mongodb.connect("mongodb://localhost/CHECKER", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(e => {
    console.log("mongo conectado")
}).catch(err => {
    console.log("ERRO AO CONECTAR AO MONGO:" + err)
})




module.exports = mongodb