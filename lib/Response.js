'use strict';

class Response {
    constructor(err, res, body) {
        this.err = err;
        this.res = res;
        this.body = body;
    }

    getError() {
        return this.err;
    }

    getRawResponse() {
        return this.res;
    }

    getBody() {
        return this.body;
    }

    getStatusCode() {
        return this.getRawResponse().statusCode;
    }

    isOK() {
        const statusCode = this.getStatusCode();
        return (statusCode > 199 && statusCode < 400) && this.noError();
    }

    noError() {
        return typeof this.getError() === 'undefined' || this.getError() === null;
    }
}

module.exports = Response;