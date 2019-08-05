class Result {
    constructor(msg = "", code = 200 ,data = null) {
        this.msg = msg;
        this.data = data;
        this.code = code
    }
}

module.exports = Result