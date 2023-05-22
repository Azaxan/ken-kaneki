const Discord = require('discord.js');

module.exports = {
    name: 'pause',
    description: 'Pause the currently playing song!',
    usage: 'pause',
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
        .setTitle('<:passed:942871973439082566> Paused!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });


        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ embeds: [_Fail.setDescription(`${message.author}, There is no music currently playing!.`)]});

        const success = queue.setPaused(true);

        if(success) {
            message.channel.send({ embeds:[_Succes.setTitle('<:passed:942871973439082566> Paused!').setDescription(`${message.author} has paused **${queue.current.title}**`)]}).then(m => setTimeout(() => m.delete(), 3500));
        } else {
            queue.setPaused(false);
            message.channel.send({ embeds:[_Succes.setTitle('<:passed:942871973439082566> Resumed!').setDescription(`${message.author} has resumed **${queue.current.title}**`)]}).then(m => setTimeout(() => m.delete(), 3500));;
        }

        // return success ? message.channel.send({ embeds:[_Succes.setDescription(`The currently playing music named **${queue.current.title}** has stopped`)]}) : message.channel.send({ embeds:[_Fail.setDescription(`${message.author}, Something went wrong.`)]});
    },
};