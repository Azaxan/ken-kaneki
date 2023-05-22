const Discord = require('discord.js');

module.exports = {
    name: 'stop',
    description: 'Stops the queue!',
    usage: 'stop',
    aliases: ['st','disconnnect', 'dc'],
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
        .setTitle('<:passed:942871973439082566> Stoped!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        queue.destroy();

        message.channel.send({ embeds: [_Succes
            .setTitle(`<a:music:943935237921071176> Stopped`)
            .setColor('WHITE')
            .setDescription(`The music playing on this server has been turned off, see you next time`)
        ]});
    },
};