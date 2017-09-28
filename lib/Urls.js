'use strict';

module.exports = class Urls {
    static getRootUrl() {
        return `http://codeis.fun`;
    }

    static getApiPath() {
        return `/api`;
    }

    static getApiUrl() {
        return this.getRootUrl() + this.getApiPath();
    }

    static constructApiUrl(relativeUrl) {
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = `/${relativeUrl}`;
        }
        return this.getApiUrl() + relativeUrl;
    }

    static getDryRunPath() {
        return `/dry-run`;
    }

    static getRegisterPath() {
        return `/registerDevice`;
    }

    static getTestsPath() {
        return `/tests`;
    }
};