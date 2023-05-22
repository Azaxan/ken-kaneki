const { Discord, Client, Collection, MessageEmbed, Intents } = require('discord.js');
const fs = require('fs');
const { Token, botid } = require('./config.json');
const { name, version, author, dependencies } = require('./package.json');
const commandHandler = require('./handler/commandHandler.js');
const eventHandler = require('./handler/eventHandler.js');
const musicHandler = require('./handler/musicHandler.js'); 

const client = new Client({ intents: 
    ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_INVITES', 'GUILD_VOICE_STATES']
});

musicHandler(client);
commandHandler(client);
eventHandler(client);

client.login(Token);

