const { default: Axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'neko',
    description: 'Send a random neko!',
    usage: 'neko',
    execute (message, args, client, prefix, userColor) {

        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const Embed = new Discord.MessageEmbed()
            .setColor(userColor)
            .setTitle('૮₍ ˃ ⤙ ˂ ₎ა')
            .setTimestamp()
            .setFooter({
                    text: 'Induced by: '+ message.author.tag,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });

        Axios.get('https://nekos.life/api/v2/img/neko').then (res => {

            if(!args[0]) {
                return message.channel.send({ embeds: [Embed
                    .setImage(res.data.url)] })
            }
        }) 
    }
}