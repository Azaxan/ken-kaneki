const Discord = require('discord.js');
const fs = require('fs');

module.exports = (client, message, prefix) => {
    const setlogs = JSON.parse(fs.readFileSync('./json/setlogs.json', 'utf-8'));

    if(!setlogs[message.guild.id]) { return } else { 
        if(setlogs[message.guild.id].channel) {
            if(!message.content) return;
            if(message.author.bot) return;
            const messageDelete = new Discord.MessageEmbed()

            .setTitle('<:kk_think:942870298678689792> Deleted message')
            .setColor('#ffda47')
            .addField('Message author: ', message.author.toString(), false)
            .addField('Author ID: ', message.author.id, false)
            .addField('Message content: ', message.content)
            .addField('Message deleted in a channel: ', message.channel.toString()+' '+message.channel.name)

            if(messageDelete.fields[2].value.length >= 1024) {
                messageDelete.fields[2].value = messageDelete.fields[2].value.substr(0, 950)
            }
            const channelLogID = setlogs[message.guild.id].channel;
            const channelLog = message.guild.channels.cache.get(channelLogID);

            if(!channelLog) return
            process.once('unhandledRejection', err => console.log(err))
            channelLog.send({ embeds: [messageDelete] });
        }
    }
}