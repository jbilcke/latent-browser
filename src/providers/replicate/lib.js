const BASE_URL = "https://api.replicate.com/v1"
const DEFAULT_POLLING_INTERVAL = 5000

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms))
const isNode = typeof window === 'undefined'


class Replicate {

    constructor({ token, proxyUrl, httpClient, pollingInterval } = {}) {
        this.token = token;
        this.baseUrl = proxyUrl ? `${proxyUrl}/${BASE_URL}` : BASE_URL;
        this.httpClient = httpClient;
        this.pollingInterval = pollingInterval;

        // Uses some lesser-known operators to make null-safety easy
        this.pollingInterval ||= DEFAULT_POLLING_INTERVAL;
        // this.token ||= (isNode) ? process?.env?.REPLICATE_API_TOKEN : null;

        if (!this.token && !proxyUrl)
            throw new Error('Missing Replicate token')

        if (!this.httpClient)
            this.httpClient = new DefaultFetchHTTPClient(this.token);

        // Syntax sugar to support replicate.models.get()
        this.models = {};
        this.models.get = (path, version) => Model.fetch({ path: path, version: version, replicate: this })
    }

    async callHttpClient({ url, method, event, body }) {
        url = `${this.baseUrl}${url}`
        return await this.httpClient[method]({ url, event, body, token: this.token });
    }

    async getModel(path) {
        const request = { url: `/models/${path}/versions`, method: 'get', event: 'getModelDetails' }
        return await this.callHttpClient(request)
    }

    async getPrediction(id) {
        const request = { url: `/predictions/${id}`, method: 'get', event: 'getPrediction' };
        return await this.callHttpClient(request);
    }

    async startPrediction(modelVersion, input) {
        const body = { "version": modelVersion, "input": input };
        const request = { url: '/predictions', method: 'post', event: 'startPrediction', body }
        return await this.callHttpClient(request);
    }
}

class Model {

    static async fetch(options) {
        const model = new Model(options);
        await model.getModelDetails();
        return model;
    }

    constructor({ path, version, replicate }) {
        this.path = path;
        this.version = version;
        this.replicate = replicate;
    }

    async getModelDetails() {
        const response = await this.replicate.getModel(this.path);
        const modelVersions = response.results;
        const mostRecentVersion = modelVersions[0];
        const explicitlySelectedVersion = modelVersions.find((m) => m.id == this.version);
        this.modelDetails = explicitlySelectedVersion ? explicitlySelectedVersion : mostRecentVersion;
        if (this.version && this.version !== this.modelDetails.id) {
            console.warn(`Model (version:${this.version}) not found, defaulting to ${mostRecentVersion.id}`);
        }
    }

    async *predictor(input) {
        const startResponse = await this.replicate.startPrediction(this.modelDetails.id, input);
        let predictionStatus;
        do {
            const checkResponse = await this.replicate.getPrediction(startResponse.id);
            predictionStatus = checkResponse.status;
            await sleep(this.replicate.pollingInterval);
            // TODO: only yield if there is a new prediction
            yield checkResponse.output;
        } while (['starting', 'processing'].includes(predictionStatus))
    }

    async predict(input) {
        let prediction;
        for await (prediction of this.predictor(input)) {
            // console.log(prediction);
        }
        return prediction;
    }
}

// This class just makes it a bit easier to call fetch -- interface similar to the axios library
export class DefaultFetchHTTPClient {

    constructor(token) {
        this.headers = {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    async get({ url }) {
        const response = await fetch(url, { headers: this.headers });
        return await response.json();
    }

    async post({ url, body }) {
        const fetchOptions = { method: 'POST', headers: this.headers, body: JSON.stringify(body) }
        const response = await fetch(url, fetchOptions);
        return await response.json();
    }
}

export default Replicate