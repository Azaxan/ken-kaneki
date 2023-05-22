const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Create a poll!',
    usage: 'poll <question>',
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
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`**`)] });
        }

        const qCommand = args.splice(0, 0);

        const question = args.join(" ");

        const poll = new Discord.MessageEmbed()
        .setAuthor({
            name:message.author.tag, 
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setTitle(`IT'S' TIME TO VOTE ૮ ˶ᵔ ᵕ ᵔ˶ ა`)
        .setColor(userColor)
        .setDescription(`<:kenkaneki:943281890662682654> - **Question:** ${question}`)
        .setThumbnail('https://www.pngegg.com/en/png-efoae')

        message.delete().catch();
        message.channel.send({ embeds: [poll] }).then(messageReaction => {
            messageReaction.react('<:pepeyes:943428595433476157>')
            messageReaction.react('<:pepeno:943428595638997032>')
        })
    }
}