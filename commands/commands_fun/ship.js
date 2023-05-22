const Discord = require('discord.js');

module.exports = {
    name: 'ship',
    description: 'Ship',
    aliases: ['love'],
    usage: 'ship <person1> <person2>',
    execute (message, args, client, prefix, userColor) {
        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        let user1 = args[0];
        let user2 = args[1];

        if(!args[1]) {
            user2 = message.author.tag;
        }
        if(!user1) {
            return message.channel.send({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)]})
        }

        const ship = Math.random() * 100;
        const shipIndex = Math.floor(ship / 10);
        const shipLevel = '<:heart_zt:942515330067071096> '.repeat(shipIndex) + '<:love2:942949635230670878>'.repeat(10 - shipIndex);

        const _Embed = new Discord.MessageEmbed()
        .setColor('#ffa5ec')
        .setTitle('<:nagatarolaugh:941284224063905803> Ship')
        .setDescription(`**${user1}** loves **${user2}** in \`${Math.floor(ship)}%\`\n\n${shipLevel}`)
        .setTimestamp()

        return message.channel.send({ embeds: [_Embed] })
    }
}