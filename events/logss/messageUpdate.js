const Discord = require('discord.js');
const fs = require('fs');

module.exports = (client, oldmessage, newmessage) => {
    const setlogs = JSON.parse(fs.readFileSync('./json/setlogs.json', 'utf-8'));

    if(!setlogs[oldmessage.guild.id]) { return } else { 
        if(setlogs[oldmessage.guild.id].channel) {
            if(!oldmessage.content) return;
            if(oldmessage.content === newmessage.content) return;
            if(oldmessage.author.bot) return;
            const messageDelete = new Discord.MessageEmbed()
            .setTitle('<:kk_court:941096433031991317> Edited message')
            .setColor('#ffda47')
            .addField('Message author: ', oldmessage.author.toString(), false)
            .addField('Author ID: ', oldmessage.author.id, false)
            .addField('Message content before edit: ', oldmessage.content)
            .addField('Message content after edit: ', newmessage.content)
            .addField('Message edited in channel: ', oldmessage.channel.toString()+' '+oldmessage.channel.name)

            if(messageDelete.fields[2].value.length >= 1024) {
                messageDelete.fields[2].value = messageDelete.fields[2].value.substr(0, 950)
            }
            if(messageDelete.fields[3].value.length >= 1024) {
                messageDelete.fields[3].value = messageDelete.fields[3].value.substr(0, 950)
            }
            const channelLogID = setlogs[oldmessage.guild.id].channel;
            const channelLog = oldmessage.guild.channels.cache.get(channelLogID);

            if(!channelLog) return
            process.once('unhandledRejection', err => console.log(err))
            channelLog.send({ embeds: [messageDelete] });
        }
    }
}