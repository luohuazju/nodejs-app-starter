const Consul = require('consul');

class ConsulService {
    constructor() {
        const serviceName = 'nodestarter';
        //new client
        this.consul = new Consul({
            host: 'centos7-master',
            port: 80,
            promisify: true,
        });
        //register
        this.consul.agent.service.register({
            id: 'nodestarter-centos7-worker2-8021',
            name: serviceName,
            address: 'centos7-worker2',
            port: 8021,
            check: {
                http: 'http://centos7-worker2:8021/api/v1/ping',
                interval: '10s',
                timeout: '5s',
                deregistercriticalserviceafter: '30s',
            },
            tags: [
                "traefik.enable=true",
                "traefik.http.routers.nodestarter.rule=Host(`nodestarter.sillycat.com`)",
                "traefik.http.services.nodestarter.loadbalancer.server.port=8021"
            ]
        }, function(err, result) {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log(serviceName + ' register success!');
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