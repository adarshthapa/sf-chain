const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(timestamp, lashHash, hash, data) {
        this.timestamp = timestamp;
        this.lashHash = lashHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block -  
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lashHash.substring(0, 10)}
            Hash: ${this.hash.substring(0, 10)}
            Data: ${this.data}`;

    }

    static genesis() {
        return new this('Genesis time', '0000000000000000000000000000000000000000000000000000000000000000', '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048', []);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;