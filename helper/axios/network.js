import axios from "axios";

const CancelToken = axios.CancelToken;

const NETWORK_ERROR = "NETWORK_ERROR";

export class Network {
    constructor() {
        this.apiRoot = this.getApiRoot();
        this.onUnauthorizedRequest = null;
    }

    async get(apiMethod, qs, options) {
        return await this.sendSaveRequest(apiMethod, "json", "GET", {qs}, options);
    }

    async post(apiMethod, body, options) {
        return await this.sendSaveRequest(apiMethod, "json", "POST", {body}, options);
    }

    async put(apiMethod, body, options) {
        return await this.sendSaveRequest(apiMethod, "json", "PUT", {body}, options);
    }

    async patch(apiMethod, body, options) {
        return await this.sendSaveRequest(apiMethod, "json", "PATCH", {body}, options);
    }

    async delete(apiMethod, body, options) {
        return await this.sendSaveRequest(apiMethod, "json", "DELETE", {body}, options);
    }

    async formData(apiMethod, form, files, options) {
        return await this.sendSaveRequest(apiMethod, "formData", "POST", {form, files}, options);
    }

    async sendSaveRequest(apiMethod, type, method, {body, qs, form, files}, options = {}) {
        try {
            let url = new URL(`${this.apiRoot}${apiMethod}`);
            if (qs) {
                Object.keys(qs).forEach(key => url.searchParams.append(key, qs[key]));
            }
            body = this.transformBody(body);
            const response =
                type === "json"
                    ? await this.sendJsonRequest(url, method, body)
                    : await this.sendFormRequest(url, method, form, files, options);
            if (response.status === 401 && this.onUnauthorizedRequest && !options.withoutAuthorizationCheck) {
                this.onUnauthorizedRequest();
            }

            return {
                error: response.status !== 200,
                response: response.json ? await response.json() : response.data
            };
        } catch (e) {
            console.log(NETWORK_ERROR);
            return e;
        }
    }

    async sendJsonRequest(url, method, body) {
        return await fetch(url, {
            method,
            body: body && JSON.stringify(body),
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    async sendFormRequest(url, method, form, files, options = {}) {
        const data = new FormData();
        data.append("data", JSON.stringify(form));

        files && Object.keys(files).forEach(f => data.append(f, files[f]));

        const token = await this.bindCancelFunc(options);
        const config = {
            validateStatus: () => true,
            withCredentials: true,
            onUploadProgress: options.onUploadProgress,
            cancelToken: token
        };
        return await axios.post(url, data, config);
    }

    async bindCancelFunc(options) {
        const {saveCancelFunc} = options;
        if (!saveCancelFunc) {
            return null;
        }
        const {token, cancel} = CancelToken.source();
        await saveCancelFunc(cancel);
        return token;
    }

    transformBody(body) {
        if (!body) {
            return body;
        }
        Object.keys(body).forEach(k => {
            if (body[k] === undefined) body[k] = null;
        });
        return body;
    }

    getApiRoot() {
        if (process.env.TABSERA_API_URL) {
            return process.env.TABSERA_API_URL;
        }
        // return "https://local-tabsera.staging.forasoft.com/api/v1";

        return process.env.NODE_ENV === "development"
            ? `${location.protocol}//${location.hostname}:8889/api/v1`
            : `${location.origin}/api/v1`;
    }
}

export default new Network();
