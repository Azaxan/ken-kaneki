const { QueueRepeatMode } = require('discord-player');
const Discord = require('discord.js');

module.exports = {
    name: 'loop',
    description: 'Loops the queue!',
    usage: 'loop',
    aliases: ['l'],
    voiceChannel: true,

    execute(message, args, client, prefix, userColor) {

        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Looped!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });


        const queue = client.player.getQueue(message.guild.id);

 
if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send({ embeds: [_Succes.setDescription(`Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**`)] }).then(m => setTimeout(() => m.delete(), 3500));
    },
};