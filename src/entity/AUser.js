class AUser extends require('./Result') {
    constructor(username,pwd,token) {
        super();
        this.username = username
        this.token = token
        this.pwd = pwd
    }
}
module.exports = AUser