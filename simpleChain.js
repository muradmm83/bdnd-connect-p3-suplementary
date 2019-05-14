const Block = require('./block');
const Sandbox = require('./levelSandbox');

class SimpleChain {
    constructor() {
        this.db = new Sandbox();

        (async () => {
            try {
                let height = await this.db.getHeight();


                if (height == 0) {
                    await this.db.add(new Block('Geneses Block'));
                }
            } catch (err) {
                console.log(err);
            }
         })();
    }

    addBlock(data) {
        let block = new Block(data);
        return this.db.add(block);
    }

    getBlock(height) {
        return this.db.get(height);
    }
}

module.exports = SimpleChain;