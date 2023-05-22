const Discord = require('discord.js');

module.exports = {
    name: 'resume',
    description: 'Resume the currently playing song!',
    usage: 'resume',
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
        .setTitle('<:passed:942871973439082566> Resumed!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });


        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        const success = queue.setPaused(false);


        if(success) {
            message.channel.send({ embeds:[_Succes.setTitle('<:passed:942871973439082566> Resumed!').setDescription(`${message.author} has resumed **${queue.current.title}**`)]}).then(m => setTimeout(() => m.delete(), 3500));
        } else {
            queue.setPaused(true);
            message.channel.send({ embeds:[_Succes.setTitle('<:passed:942871973439082566> Paused!').setDescription(`${message.author} has paused **${queue.current.title}**`)]}).then(m => setTimeout(() => m.delete(), 3500));;
        }
        // return success ? message.channel.send({ embeds:[_Succes.setDescription(`**${queue.current.title}**, The song continues to play.`)]}) : message.channel.send({ embeds:[_Fail.setDescription(`${message.author}, Something went wrong.`)]});
    },
};