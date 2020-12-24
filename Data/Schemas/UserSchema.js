const mongoose = require("../MongodbConnect")


const UserSchema = new mongoose.Schema({

    Email: {
        required: true,
        unique: true, 
        type: String, 

    },

    Password: {
        required: true, 
        type: String, 
        select: false
    },

    Date: {
        type: Date, 
        default: Date.now()
    }


})


mongoose.model("User", UserSchema)

const user = mongoose.model("User")


module.exports = user