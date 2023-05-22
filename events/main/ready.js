const { defaultprefix } = require('../../config.json')

module.exports = (client) => {
        console.log(`Logged in as ${client.user.tag} | Servers: ${client.guilds.cache.size}`)
        // const GuildsID = client.guilds.cache.map(guild => guild.id);
        // console.log(GuildsID);
        // const GuildsName = client.guilds.cache.map(guild => guild.name);
        // console.log(GuildsName);
        client.user.setActivity(`${defaultprefix}help`)
        // client.user.setActivity(`${defaultprefix}help | Servers: ${client.guilds.cache.size}`)
        } 