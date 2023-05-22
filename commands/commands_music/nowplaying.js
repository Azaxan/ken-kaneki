const Discord = require('discord.js');

module.exports = {
    name: 'nowplaying',
    description: 'Shows the currently playing song!',
    usage: 'nowplaying',
    aliases: ['np', 'n'],
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
        .setColor('WHITE')
        .setTitle('<:passed:942871973439082566> Now playing!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        const track = queue.current;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        const saveButton = new Discord.MessageButton()
        .setLabel('Save Song')
        .setCustomId('save-track2')
        .setStyle('SUCCESS')

        const row = new Discord.MessageActionRow()
            .addComponents(saveButton);

        const progress = queue.createProgressBar();

        const _Embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setTitle('<a:music:943935237921071176> Now playing!')
        .addField(`Title`, track.title, true)
        .addField(`\u200b`, `\u200b`, true)
        .addField(`Author`, track.author, true)
        .addField(`Progress`, (track.duration == "0:00" ? "🔴 LIVE" : `${progress} (**${timestamp.progress}**%)`))
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: track.requestedBy.avatarURL({ dynamic: true })
        })
        .setTimestamp()

        message.channel.send({ embeds: [_Embed], components: [row] });
    },
};