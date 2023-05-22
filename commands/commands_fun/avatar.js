const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: `Show your avatar, or mentioned person's avatar!`,
    aliases: ['pfp', 'awatar', 'profilepicture'],
    usage: 'avatar <user>',
    execute (message, args, client, prefix, userColor) {

        const user = message.mentions.users.first() || message.author;

        const Response = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle('<:6535_SteamNoAvatar:941723456884572190> Avatar')
        .setDescription(`User avatar **${user.username}**`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })

        message.channel.send({ embeds: [Response] });
    }
}