class _Model {
    constructor() { }

    serialize() {
        const serialized = JSON.stringify(this)
        return serialized
    }

    toJson() {
        var that = this
        return this.serialize(that)
    }
}

module.exports._Model = _Model
