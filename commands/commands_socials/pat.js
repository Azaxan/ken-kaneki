const { default: Axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'pat',
    description: 'Pat a user!',
    aliases: ['pats'],
    usage: 'pat <@user>',
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
            .setTitle('(>᎑<๑)/♡')
            .setTimestamp()
            .setFooter({
                    text: 'Induced by: '+ message.author.tag,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });

        const Target = message.mentions.users.first();

        Axios.get('https://nekos.life/api/v2/img/pat').then (res => {

            if(!args[0] || Target == message.author) {
                const cuddleYourself = message.author;
                return message.channel.send({ embeds: [Embed
                    .setDescription(`<a:pat:943264053713862676> - **${cuddleYourself}** pats himself :c`)
                    .setImage(res.data.url)] })
            }
    
            if(Target) {
                message.channel.send({embeds: [Embed
                    .setDescription(`<a:pat:943264053713862676> - **${message.author}** pats **${Target}**`)
                    .setImage(res.data.url)] })
            } else {
                return message.reply({ embeds: [_Fail.setDescription(`User not found!`)] });
            }  
        }) 
    }
}