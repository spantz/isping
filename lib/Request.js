'use strict';

const Urls = require('./Urls');
const Messenger = require('./Messenger');
const request = require('request');
const Response = require('./Response');

const ACCEPTED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

class Request {
    constructor(relativeUrl, method, params, headers) {
        if (!relativeUrl.startsWith('/')) {
            relativeUrl = `/${relativeUrl}`;
        }
        this.requestUrl = Urls.constructApiUrl(relativeUrl);

        if (typeof method !== 'string') {
            method = 'GET';
        }
        if (!ACCEPTED_METHODS.includes(method)) {
            Messenger.debug(`Request method "${method}" is not in list of accepted methods. Defaulting to GET.`);
            method = 'GET';
        }
        this.method = method;

        if (typeof params === 'undefined') {
            params = {};
        }
        this.setParams(params);

        this.initializeHeaders(headers);
    }

    initializeHeaders(headers) {
        if (typeof headers === 'undefined') {
            headers = {};
        }
        if (!headers.hasOwnProperty('Accept')) {
            headers['Accept'] = 'application/json';
        }
        if (!headers.hasOwnProperty('Content-Type')) {
            headers['Content-Type'] = 'application/json';
        }
        this.setHeaders(headers);
    }

    getRequestUrl() {
        return this.requestUrl;
    }

    getMethod() {
        return this.method;
    }

    getParams() {
        return this.params;
    }

    getHeaders() {
        return this.headers;
    }

    setHeaders(headers) {
        if (typeof headers !== 'object') {
            return;
        }
        this.headers = headers;
    }

    setParams(params) {
        if (typeof params !== 'object') {
            return;
        }
        this.params = params;
    }

    execute() {
        return new Promise((resolve, reject) => {
            request(this.getRequestUrl(), {
                method: this.getMethod(),
                json: true,
                body: this.getParams(),
                headers: this.getHeaders()
            }, (err, res, body) => {
                const response = new Response(err, res, body);
                if (!response.isOK()) {
                    return reject(response);
                }

                return resolve(response);
            });
        });
    }
}

module.exports = Request;