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
    },

    Nome: {
        type: String,
        required: true
    },

    Lists: {
        type: Array,
        ListID: new mongoose.Types.ObjectId(),
        default: []
    }
        
    


})


mongoose.model("User", UserSchema)

const user = mongoose.model("User")


module.exports = user