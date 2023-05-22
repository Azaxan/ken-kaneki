const Discord = require('discord.js');

module.exports = {
    name: 'skip',
    description: 'Skips the currently playing song!',
    usage: 'skip',
    aliases: ['s', 'sk'],
    voiceChannel: true,

    execute(message, args, client, prefix, userColor) {

        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Skip!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Skip!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });


        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        const success = queue.skip();

        return success ? message.channel.send({ embeds:[_Succes.setDescription(`**${queue.current.title}**, Skipped song has stopped`)]}).then(m => setTimeout(() => m.delete(), 3500)) : message.channel.send({ embeds:[_Fail.setDescription(`${message.author}, Something went wrong`)]});
    },
};