const Discord = require('discord.js');

module.exports = {
    name: 'guildlistid',
    description: `Command only for developer!`,
    usage: 'guildlistid',
    execute (message, args, client, prefix, userColor) {
        if(message.author.id == '823186277871779853') {
            const GuildsID = client.guilds.cache.map(guild => guild.id);
            message.member.send(`<:user_info:943446977667006475> **GuildID list:**\n${GuildsID}`);
            const _Fail = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<:failed:942871973669789726> Error!')
            .setTimestamp()
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });
            message.reply({ embeds: [_Fail.setDescription(`This command doesn't work!`)]});
        } else {
            const _Fail = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<:failed:942871973669789726> Error!')
            .setTimestamp()
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });
            message.reply({ embeds: [_Fail.setDescription(`This command doesn't work!`)]});
        }
    }
}