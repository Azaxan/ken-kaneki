const Discord = require('discord.js');

module.exports = {
    name: 'nsfw',
    description: `Show a list of NSFW commands!`,
    aliases: ['nsfwlist'],
    usage: 'nsfw',
    execute (message, args, client, prefix, userColor) {

        const nsfwEmbed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .addField(`<:nsfw:944214321485983804> **NSFW (13)**`, '> ||`h-pussy`||, ||`h-anal`||, ||`h-blowjob`||, ||`h-boobs`||, ||`h-cum`||, ||`h-ero`||, ||`h-erofeet`||, ||`h-erokemo`||, ||`h-eroyuri`||, ||`h-holoero`||, ||`h-solo`||, ||`h-tits`||, ||`h-random`||')
        .addField(`**Important links!**`, `[<:cinnacoffee:940994017829748737> Buy a coffee!](https://buycoffee.to/azaxan)\n[<:kk_invite:943140105265225770> Invite bot to your server!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=387151&scope=bot)`, false)
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        
        message.channel.send({ embeds: [nsfwEmbed]});
    }
}