const { default: Axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'foxgirl',
    description: 'Send a random fox girl!',
    usage: 'foxgirl',
    aliases: ['a-foxgirl'],
    execute (message, args, client, prefix, userColor) {
        if (message.channel.nsfw) {

            const Embed = new Discord.MessageEmbed()
            .setColor(userColor)
            .setTitle('(>᎑<๑)/♡')
            .setTimestamp()
            .setFooter({
                    text: 'Induced by: '+ message.author.tag,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });

            Axios.get('https://nekos.life/api/v2/img/fox_girl').then (res => {

            if(!args[0]) {
                return message.channel.send({ embeds: [Embed
                    .setImage(res.data.url)] })
            }
        }) 
        } else {
            const _Fail = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<:failed:942871973669789726> Error!')
            .setDescription(`NSFW is not enabled on this channel.`)
            .setTimestamp()
            .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

            return message.channel.send({ embeds: [_Fail] })
        }
    }
}