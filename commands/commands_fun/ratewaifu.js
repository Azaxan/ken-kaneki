const Discord = require('discord.js');

module.exports = {
    name: 'ratewaifu',
    description: 'Just rates your waifu from zero to 100. Results may vary.',
    usage: 'ratewaifu <@user>',
    aliases: ['rw', 'rate'],
    execute (message, args, client, prefix, userColor) {

        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const person = message.mentions.users.first()

        if(!person || person == message.author) {

            const rate = Math.random() * 100;

            let maxRate = 100;

            const rateEmbed = new Discord.MessageEmbed()
            .setColor('#ffa5ec')
            .setTitle(`<:heart:942515330507481118> I rate your waifu with a **${Math.floor(rate)}/${maxRate}**`)
            // .setDescription(`I rate your waifu with a **${Math.floor(rate)}/${maxRate}**`)
            .setTimestamp()
            .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

            message.channel.send({ embeds: [rateEmbed] });
        } else {

            const rate = Math.random() * 100;

            let maxRate = 100;

            const rateEmbed = new Discord.MessageEmbed()
            .setColor('#ffa5ec')
            .setTitle(`<:heart:942515330507481118> I rate your waifu with a **${Math.floor(rate)}/${maxRate}**`)
            // .setDescription(`I rate ${person}'s waifu with a **${Math.floor(rate)}/${maxRate}**`)
            .setTimestamp()
            .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

            message.channel.send({ embeds: [rateEmbed] });
        }
    }
}