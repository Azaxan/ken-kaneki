const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Shows the queue!',
    usage: 'queue',
    aliases: ['q','que'],
    voiceChannel: true,

    execute(message, args, client, prefix, userColor) {
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
        .setTitle('<:passed:942871973439082566> Queue!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });


 
        if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        if (!queue.tracks[0]) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, No music in queue after current.`)]});

        const embed = new Discord.MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('WHITE');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`<a:music:943935237921071176> Server Queue - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Started by <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `And **${songs - 5}** Other Song...` : `There are **${songs}** Songs in the Queue.`;

        embed.setDescription(`Currently Playing: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true })
        });

        message.channel.send({ embeds: [embed] });
    },
};