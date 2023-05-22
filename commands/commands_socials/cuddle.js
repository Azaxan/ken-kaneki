const { default: Axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'cuddle',
    description: 'Cuddle a user!',
    aliases: ['cuddles'],
    usage: 'cuddle <@user>',
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
            .setColor('#ff0000')
            .setTitle('ʕっ•ᴥ•ʔっ')
            .setTimestamp()
            .setFooter({
                    text: 'Induced by: '+ message.author.tag,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });

        const Target = message.mentions.users.first();

        Axios.get('https://nekos.life/api/v2/img/cuddle').then (res => {

            if(!args[0] || Target == message.author) {
                const cuddleYourself = message.author;
                return message.channel.send({ embeds: [Embed
                    .setDescription(`<a:cuddle:943216623454679060> - **${cuddleYourself}** cuddled himself :c`)
                    .setImage(res.data.url)] })
            }
    
            if(Target) {
                message.channel.send({embeds: [Embed
                    .setDescription(`<a:cuddle:943216623454679060> - **${message.author}** cuddled **${Target}**`)
                    .setImage(res.data.url)] })
            } else {
                return message.reply({ embeds: [_Fail.setDescription(`User not found!`)] });
            }  
        }) 
    }
}