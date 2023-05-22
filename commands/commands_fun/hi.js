const Discord = require('discord.js');

module.exports = {
    name: 'hi',
    description: 'Hi =)',
    usage: 'hi',
    execute: async(message, args, client, prefix, userColor) => {
        message.reply('<:hi:942950110738923580> Hi! =)');
    }
}