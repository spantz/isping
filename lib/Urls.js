'use strict';

module.exports = class Urls {
    static getRootUrl() {
        return `http://speed.app`;
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

    static constructDryRunPath(deviceToken) {
        return `/dry-run?auth_token=${deviceToken}`;
    }

    static constructRegisterPath(userToken) {
        return `/registerDevice/${userToken}`;
    }
};