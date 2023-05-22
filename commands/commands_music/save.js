const Discord = require('discord.js');

module.exports = {
    name: 'save',
    description: 'Saves a song and sends in private message!',
    usage: 'save',
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
        .setTitle('<:passed:942871973439082566> Saved!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

            const embed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setDescription(`Track: **${queue.current.title}**\nAuthor: **${queue.current.author}**\nSaved server: **${message.guild.name}**`)

        message.author.send({ embeds: [embed] }) .then(() => {
            message.channel.send({ embeds: [_Succes.setDescription(`I sent the name of the music via private message.`)]});
        }).catch(error => {
            message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, Unable to send you private message.`)]});
        });
    },
};