const Discord = require('discord.js');

module.exports = {
    name: 'back',
    description: 'Plays a previous song!',
    usage: 'back',
    aliases: ['previous', 'b'],
    voiceChannel: true,

    async execute(message, args, client, prefix, userColor) {
        const queue = client.player.getQueue(message.guild.id);

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
        .setTitle('<:passed:942871973439082566> Withdrawn!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if (!queue || !queue.playing) return message.channel.send({embeds: [_Fail.setDescription`${message.author}, No music currently playing!`]});

        if (!queue.previousTracks[1]) return message.channel.send({embeds: [_Fail.setDescription`${message.author}, There was no music playing before!`]});

        await queue.back();

        message.channel.send({ embeds:[_Succes.setDescription(`Previous music started playing...`)] }).then(m => setTimeout(() => m.delete(), 3500));;
    },
};