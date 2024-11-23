const Vault = require('node-vault');

class VaultService {
    constructor() {
        const vault_token = process.env.VAULT_TOKEN;
        const vault_addr = process.env.VAULT_ADDR
        const options = {
            apiVersion: 'v1',
            endpoint: vault_addr, // default
            token: vault_token // optional client token; can be fetched after valid initialization of the server
        };
        //new client
        this.vault = Vault(options);
    }

    async getSecret(key) {
        const result = await this.vault.read(key);
        if (!result) {
            return Promise.reject(key + ' does not exist!');
        }
        return result;
    }
}

module.exports = VaultService;