class Config {

    static PORT = 3333;

    static getAddress() {
        const os = require('os');
        for(let addresses of Object.values(os.networkInterfaces())) {
            for(let add of addresses) {
                if(add.address.startsWith('192.168')) {
                    return add.address;
                }
            }
        }
    }
}

module.exports = Config;