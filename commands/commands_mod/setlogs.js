const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setlogs',
    description: 'Sets up logs on a given channel',
    aliases: ['set-logs'],
    usage: 'setlogs <channel>',
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

        if(!args[0] || args[1]) {
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] });
        }

        const channelLog = message.mentions.channels.first();

        if(!channelLog) {
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] });
        }

        setlogs[message.guild.id] = {
            channel: channelLog.id
        }

        fs.writeFile('./json/setlogs.json', JSON.stringify(setlogs), (err) => {if(err) console.log(err)})

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Success!')
        .setDescription('Correctly set up logs on the channel: '+`**${args[0]}**`)
        .setTimestamp()
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        message.channel.send({ embeds: [_Succes] })

    }
}