const Consul = require('consul');

class ConsulService {
    constructor() {
        const serviceName = 'nodestarter';
        const username = process.env.CONSUL_USER;
        const password = process.env.CONSUL_PASSWORD;
        const auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
        //new client
        this.consul = new Consul({
            host: process.env.CONSUL_HOSTNAME,
            port: 443,
            secure: true,
            promisify: true,
            headers: {
                "Authorization" : auth
            },
        });
    }

    async getConfig(key) {
        const result = await this.consul.kv.get(key);
        if (!result) {
            return Promise.reject(key + ' does not exist!');
        }
        return JSON.parse(result.Value);
    }

    async getWatch(key) {
        const watch = this.consul.watch({
            method: this.consul.kv.get,
            options: { key: key },
            backoffFactor: 1000,
        });
        return watch;
    }
}

module.exports = ConsulService;