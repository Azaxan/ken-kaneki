const { default: Axios } = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'kiss',
    description: 'Kiss a user!',
    usage: 'kiss <@user>',
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
            .setTitle('(♥ω♥*)')
            .setTimestamp()
            .setFooter({
                    text: 'Induced by: '+ message.author.tag,
                    iconURL: message.author.avatarURL({ dynamic: true })
                });

        const Target = message.mentions.users.first();

        Axios.get('https://nekos.life/api/v2/img/kiss').then (res => {

            if(!args[0] || Target == message.author) {
                const cuddleYourself = message.author;
                return message.channel.send({ embeds: [Embed
                    .setDescription(`<a:catkiss:943254363353276426> - **${cuddleYourself}** decided to kiss his elbow`)
                    .setImage(res.data.url)] })
            }
    
            if(Target) {
                message.channel.send({embeds: [Embed
                    .setDescription(`<a:catkiss:943254363353276426> - **${message.author}** kissed **${Target}**`)
                    .setImage(res.data.url)] })
            } else {
                return message.reply({ embeds: [_Fail.setDescription(`User not found!`)] });
            }  
        }) 
    }
}