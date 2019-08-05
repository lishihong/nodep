const mongoose = require('mongoose')
const shaPwd = require('../utils/dealPwd')
let Schema = mongoose.Schema

const AUserSchema = new Schema({
    username: String,
    pwd: String,
    roleId: {
        type:String,
        default:0
    }
})

let aUserModel = mongoose.model('a_user', AUserSchema);

function insert(username,pwd) {
    let user = new aUserModel({
        username: username,
        pwd: shaPwd.getSha1(pwd),
    })
    user.save()
}

function find(username) {
    return aUserModel.findOne({username: username})
}

module.exports = {
    insert,
    find
}