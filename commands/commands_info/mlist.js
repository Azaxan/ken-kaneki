const Discord = require('discord.js');

module.exports = {
    name: 'mlist',
    description: `Show a list of music commands!`,
    aliases: ['musiclist', 'music'],
    usage: 'mlist',
    execute (message, args, client, prefix, userColor) {

        const command = client.commands.get(args[0]);
        const nsfwEmbed = new Discord.MessageEmbed()
        .setTitle('List of music commands!')
        .setColor('WHITE')
        // .addField(`> Play`, `- Plays the song!`)
        // .addField(`> Skip`, `- Skipping the currently playing song!`)
        // .addField(`> Search`, `- Search a song!`)
        // .addField(`> Pause`, `- Pause the currently playing song!`)
        // .addField(`> Resume`, `- Resume the currently playing song!`)
        // .addField(`> Stop`, `- Stops the queue!`)
        // .addField(`> Queue`, `- Shows the queue!`)
        // .addField(`> Loop`, `- Loops the queue!`)
        // .addField(`> Nowplaying`, `- Shows the currently playing song!`)
        // .addField(`> Back`, `- Plays a previous song!`)
        // .addField(`> Save`, `- Saves a song and sends in private message!`)
        .setDescription(
            `> ${prefix}play - Plays the song!\n
            > ${prefix}skip - Skips the currently playing song!\n
            > ${prefix}search - Search a song!\n
            > ${prefix}pause - Pause the currently playing song!\n
            > ${prefix}resume - Resume the currently playing song!\n
            > ${prefix}stop - Stops the queue!\n
            > ${prefix}queue - Shows the queue!\n
            > ${prefix}loop - Loops the queue!\n
            > ${prefix}nowplaying - Shows the currently playing song!\n
            > ${prefix}back - Plays a previous song!\n
            > ${prefix}save - Saves a song and sends in private message!
            `
            )
        .addField(`**Important links!**`, `[<:cinnacoffee:940994017829748737> Buy a coffee!](https://buycoffee.to/azaxan)\n[<:kk_invite:943140105265225770> Invite bot to your server!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=387151&scope=bot)`, false)
        .setFooter({
            text: 'Induced by: '+ message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp()
        
        message.channel.send({ embeds: [nsfwEmbed]});
    }
}