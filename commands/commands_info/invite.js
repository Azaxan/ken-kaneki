const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Send a message with invite link!',
    aliases: ['inv'],
    usage: 'invite',
    execute (message, args, client, prefix, userColor) {

        const invButton = new Discord.MessageButton()
        
        .setLabel('Invite')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=941356203773157466&permissions=387151&scope=bot`)
        .setStyle('LINK')
        .setEmoji('943140105265225770')

        const row = new Discord.MessageActionRow()
            .addComponents(invButton);

        const invite = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setAuthor({
                name: 'Induced by: '+ message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
        .setTitle(`INVITE THIS BOT TO YOUR SERVER (๑ᵔ⤙ᵔ๑)`)
        // .setDescription(`[<:invite:943140105265225770> Click here to add this bot =)!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=387151&scope=bot)`)
        // .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        // .setFooter({
        //     text: 'Induced by: '+ message.author.tag,
        //     iconURL: message.author.displayAvatarURL({ dynamic: true }),
        //     })
        message.channel.send({ embeds: [invite], components: [row] })
    }
}