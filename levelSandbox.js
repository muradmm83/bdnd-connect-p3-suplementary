const level = require('level');
const sha256 = require('crypto-js/sha256');

class LevelSandbox {
    constructor() {
        this.db = level('./BlockData');
    }

    getHeight() {
        let self = this;

        return new Promise((res, rej) => {
            let height = 0;

            self.db.createReadStream()
                .on('data', data => {
                    height++;
                })
                .on('error', err => {
                    rej(err);
                })
                .on('end', () => {
                    res(height);
                })
        });
    }

    get(height) {
        return this.db.get(height);
    }

    async add(block) {
        try {
            let height = await this.getHeight();

            block.height = height;

            if (height > 0) {
                let preBlock = JSON.parse(await this.db.get(height - 1));
                block.preHash = preBlock.hash;
            }

            block.hash = sha256(JSON.stringify(block)).toString();

            await this.db.put(height, JSON.stringify(block));

            return block;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = LevelSandbox;