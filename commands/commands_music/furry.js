const { QueryType } = require('discord-player');
const Discord = require('discord.js');

module.exports = {
    name: 'furry',
    usage: 'furry',
    aliases: ['furrys', 'pyrkon', 'furrasy', 'furryporn', 'h-furry', 'hentaifurry', 'pornfurry'],
    voiceChannel: true,

    async execute(message, args, client, prefix, userColor) {

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
        .setTitle('<:passed:942871973439082566> Played!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

            let kittenVID = "https://www.youtube.com/shorts/LTlzfzXq4ck?&ab_channel=Mementoe"

        const res = await client.player.search(kittenVID, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, No results found!`)]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, I can't join audio channel.`)]});
        }

        const _Embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle('<a:music:943935237921071176> Loading... ')
        .setDescription(`Please **wait** ${res.playlist ? 'Your Playlist' : 'Your Track'} is adding to queue!`)
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true })
        })
        .setTimestamp()

        await message.channel.send({ embeds: [_Embed] }).then((msg) =>
            setTimeout(() => msg.delete(), 3500));

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};