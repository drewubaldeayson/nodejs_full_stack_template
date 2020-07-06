var _Model = require("./_model")._Model

class Payload extends _Model{
    constructor() { super() }

    set(exp, data) {
        this.exp = exp
        this.data = data.toJson()
    
        return this
    }

    setFromToken(token) {
        this.exp = token.token.exp
        this.data = token.token.data

        return this
    }

    init(obj) {
        this.exp = obj.exp
        this.data = obj.data
    
        return this
    }

    getExp(){
        return this.exp
    }

    getData() {
        return this.data
    }

    setDefault(data) {
        var seconds = 3600
        this.exp = Math.floor(Date.now() / 1000) + (seconds) // expires in one hour
        this.data = JSON.stringify(data)

        return this
    }

    deserializeToken(serialized) {
        const obj = JSON.parse(serialized);
        this.exp = obj.token.exp
        this.data = obj.token.data
        return this
    }
}



module.exports.Payload = Payload
