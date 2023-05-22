const Discord = require('discord.js');
const { authorid, simbaid } = require(__dirname + '/../../config.json');
const { version, dependencies } = require(__dirname + '/../../package.json');

module.exports = {
    name: "botinfo",
    description: "Show informations about bot!",
    aliases: ['info'],
    usage: "botinfo",
    execute (message, args, client, prefix, userColor) {

        const author = client.users.cache.get(authorid);

        const botInfo = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle(`<:shield:943119902435311616> **Informations about bot**`)
        .addField(`**Name**`, `<:yo:942515686939430933> ${client.user}`, true)
        .addField(`**ID**`, `${client.user.id}`, true)
        .addField(`**Version**`, version, true)
        .addField(`**Author**`, `<:developer:942943341971144756> \`${author.tag}\``, true)
        .addField(`**Author ID**`, authorid, true)
        .addField(`**Discord.js**`, dependencies["discord.js"].slice(1), true)
        .addField(`**Support**`, `<:Graham:943123918468841493> \`Simba👑#6611\``)
        .addField(`**Important links!**`, `[<:cinnacoffee:940994017829748737> Buy a coffee!](https://buycoffee.to/azaxan)\n[<:kk_invite:943140105265225770> Invite bot to your server!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=387151&scope=bot)`, false)
        .setTimestamp()
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })

        message.channel.send({ embeds: [botInfo] });
    }
}