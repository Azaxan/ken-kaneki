const Discord = require('discord.js');

module.exports = {
    name: 'hello',
    description: 'Hello =)',
    usage: 'hello',
    execute: async(message, args, client, prefix, userColor) => {
        const _hello = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setTitle('<:hi:942950110738923580> Hello! =)');

        message.reply({ embeds: [_hello] });
    }
}