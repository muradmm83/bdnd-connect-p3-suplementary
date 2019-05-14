class Block {
    constructor(data) {
        this.height = 0;
        this.body = data;
        this.hash = '';
        this.preHash = '';
        this.time = Date.now();
    }
}

module.exports = Block;