const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'ticket',
    description: 'Send ticket to a support!',
    aliases: ['report'],
    usage: 'ticket',
    async execute(message, args, client, prefix, userColor) {

        const categoryJSON = JSON.parse(fs.readFileSync('./json/category.json', 'utf-8'));

        let category;

        if(!categoryJSON[message.guild.id]) { 
            category = await message.guild.channels.create('Tickets', { type: 'GUILD_CATEGORY' });
                    categoryJSON[message.guild.id] = {
                        category: category.id
                    }
                    fs.writeFile('./json/category.json', JSON.stringify(categoryJSON), (err) => { if(err) console.log(err) })
        } else {
                if(!categoryJSON[message.guild.id].category) {
                    category = await message.guild.channels.create('Tickets', { type: 'GUILD_CATEGORY' });
                    categoryJSON[message.guild.id] = {
                        category: category.id
                    }
                    fs.writeFile('./json/category.json', JSON.stringify(categoryJSON), (err) => { if(err) console.log(err) })
                }
            }

        const categoryID = categoryJSON[message.guild.id].category;
        category = message.guild.channels.cache.get(categoryID);

        if(!category) {
            category = await message.guild.channels.create('Tickets', { type: 'GUILD_CATEGORY' });
                categoryJSON[message.guild.id] = {
                    category: category.id
                }
                fs.writeFile('./json/category.json', JSON.stringify(categoryJSON), (err) => { if(err) console.log(err) })
        }

        const button1 = new Discord.MessageButton()
        .setCustomId('lock-button')
        .setLabel('Lock')
        .setEmoji('🔒')
        .setStyle('SECONDARY')

        const button3 = new Discord.MessageButton()
        .setCustomId('unlock-button')
        .setLabel('Unlock')
        .setEmoji('🔓')
        .setStyle('SECONDARY')
        
        const button2 = new Discord.MessageButton()
        .setCustomId('delete-button')
        .setLabel('Delete')
        .setEmoji('🗑️')
        .setStyle('DANGER')

        const row = new Discord.MessageActionRow()
            .addComponents(button1, button3, button2);

        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`, {
            type: 'GUILD_TEXT',
            parent: category.id
        });

        channel.permissionOverwrites.edit(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        });
        


        const embed = new Discord.MessageEmbed()
        .setTitle('<:support:943524123638906941> Support')
        .addField(`**Administrator will be in touch with you soon!**`, message.author.toString(), true)
        .addField('\u200B', '\u200B', true)
        .addField(`**Ticket Status** `, `<:passed:942871973439082566> Open`, true) 
        .setColor('#23A6F0')
        .setTimestamp()
        .setFooter({
            text: ` - Support Team`,
        })


        channel.send({ ephemeral: true, embeds: [embed], components: [row] })


        const replyToTicket = new Discord.MessageEmbed()
        .setTitle('<:support:943524123638906941> Support')
        .addField(`**Ticket has been created on channel**`, `===>`+channel.toString()+`<===`)
        .setColor('#23A6F0')

        message.channel.send({ embeds: [replyToTicket] }).then((msg) =>{
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        });
    }
}