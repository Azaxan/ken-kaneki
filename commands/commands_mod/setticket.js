const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setticket',
    description: 'Sets up category where tickets will be created!',
    aliases: ['set-ticket', 'set-category', 'category'],
    usage: 'setticket <category>',
    execute (message, args, client, prefix, userColor) {

        const categoryJSON = JSON.parse(fs.readFileSync('./json/category.json', 'utf-8'));
        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if(!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply({ embeds: [_Fail.setDescription('You do not have enough permissions!\nRequired permission `Administrator`!')] });
        }

        if(!args[0]) {
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] })
        }

        const command = args.splice(0, 0);

        const _CatchMessage = args.join(" ");

        const category = message.guild.channels.cache.find(channel => channel.id == _CatchMessage) || message.guild.channels.cache.find(channel => channel.name.toLowerCase() == _CatchMessage.toLowerCase());

        if(!category) {
            const categoryNotFound = new Discord.MessageEmbed()
            .setTitle('<:failed:942871973669789726> Category not found!') 
            .setColor('#ff0000')
            .setTimestamp()
            return message.channel.send({ embeds: [categoryNotFound] })
        }

        categoryJSON[message.guild.id] = {
            category: category.id
        }
        fs.writeFile('./json/category.json', JSON.stringify(categoryJSON), (err) => { if(err) console.log(err) })

        const categoryFound = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Category have been successfully set!')
        .setTimestamp()

        message.channel.send({ embeds: [categoryFound] })
    }
}