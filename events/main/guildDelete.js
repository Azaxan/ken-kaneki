const { defaultprefix } = require('../../config.json')

module.exports = (client) => {
        client.user.setActivity(`${defaultprefix}help`)
        // client.user.setActivity(`${defaultprefix}help | Servers: ${client.guilds.cache.size}`)
        } 