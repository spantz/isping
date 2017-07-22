'use strict';

const fs = require('fs');

class TokenRepository {
    constructor() {
        this.json = undefined;
        this.parsed = undefined;
    }

    getFilePath() {
        return `${__dirname}/../.token`;
    }

    getToken() {
        const data = this.getParsed();

        if (typeof data === 'undefined') {
            return null;
        }

        return data.token;
    }

    tokenSaved() {
        return (this.getToken() !== null);
    }

    getFileContents() {
        if (typeof this.json === 'undefined') {
            this.json = fs.readFileSync(this.getFilePath());
        }

        return this.json;
    }

    getParsed() {
        if (typeof this.parsed === 'undefined') {
            this.parsed = JSON.parse(this.getFileContents());
        }

        return this.parsed;
    }

    saveToken(authToken) {
        console.log(this.getFilePath());
        fs.writeFileSync(this.getFilePath(), JSON.stringify({token: authToken}));
    }
}

module.exports = new TokenRepository();