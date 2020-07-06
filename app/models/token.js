var _Model = require("./_model")._Model


class Token extends _Model{
    constructor(token) { 
        super() 
        this.token = token
    }
    
    validate() {
        if (true) {
            return this
        } else {
            return null
        }
    }
}


module.exports.Token = Token
