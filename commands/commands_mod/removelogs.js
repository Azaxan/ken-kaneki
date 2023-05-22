const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'removelogs',
    description: 'Removes logs',
    aliases: ['remove-logs'],
    usage: 'removelogs <channel>',
    execute (message, args, client, prefix, userColor) {
        const setlogs = JSON.parse(fs.readFileSync('./json/setlogs.json', 'utf-8'));

        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if(!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply({ embeds: [_Fail.setDescription('You do not have enough permissions!\nRequired permission `Administrator`!')] });
        }

        setlogs[message.guild.id] = {
            channel: null
        }

        fs.writeFile('./json/setlogs.json', JSON.stringify(setlogs), (err) => {if(err) console.log(err)})

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Success!')
        .setDescription('You have successfully deleted the logs')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        message.channel.send({ embeds: [_Succes] })

    }
}