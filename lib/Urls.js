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
        return this.getApiUrl() + relativeUrl;
    }

    static constructDryRunUrl(deviceToken) {
        return this.constructApiUrl(`/dry-run?auth_token=${deviceToken}`);
    }

    static constructRegisterUrl(userToken) {
        return this.constructApiUrl(`/registerDevice/${userToken}`);
    }

    static constructTestUrl() {
        return this.constructApiUrl(`/tests`);
    }
};