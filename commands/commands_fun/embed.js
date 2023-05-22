const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Sends your message in embed!',
    usage: 'embed <message>',
    execute (message, args, client, prefix, userColor) {
        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if(!args[0]) {
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] })
        }

        const command = args.splice(0, 0);

        const _CatchMessage = args.join(" ");

        message.delete().catch();

        const _Embed = new Discord.MessageEmbed()
        .setAuthor({
            name: message.author.tag,
            iconURL: message.author.avatarURL({ dynamic: true})
        })
        .setDescription(_CatchMessage)
        .setColor(userColor)

        message.channel.send({ embeds: [_Embed]});
    }
}