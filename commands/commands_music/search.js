const Discord = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'Search a song!',
    usage: 'search <name>',
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
        .setTitle('<:passed:942871973439082566> Searched!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const _Embed = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true })
        })
        .setTimestamp()

      
if (!args[0]) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, Please enter a valid song name.`)]});

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, No search results found.`)]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new Discord.MessageEmbed();

        embed.setColor('WHITE');
        embed.setTitle(`<a:music:943935237921071176> Searched Music: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n<a:markwhite:942870298087288852> Choose a song from **1** to **${maxTracks.length}** write send or write **cancel** and cancel selection.`);

        embed.setTimestamp();
        embed.setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true })
        });

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({ embeds: [_Succes.setDescription(`Call cancelled.`)]}) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({ embeds: [_Fail.setDescription(`Select a song **1** to **${maxTracks.length}** and write send or type **cancel** and cancel selection.`)]});

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, I can't join audio channel.`)]});
            }

            await message.channel.send({ embeds: [_Succes.setDescription(`Loading your music call.`)]});

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, Song search time expired ❌`)]});
        });
    },
};