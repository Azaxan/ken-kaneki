const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clears specified messages amount!',
    aliases: ['cls'],
    usage: 'clear <amount>',
    execute (message, args, client, prefix, userColor) {
        
        const _Fail = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('<:failed:942871973669789726> Error!')
            .setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)
            .setTimestamp()
            .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if(message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('MANAGE_MESSAGES')) {
            if(!args[0]) {
                return message.reply({ embeds: [_Fail] });
            }
            if(isNaN(args[0])) {
                return message.reply({ embeds: [_Fail.setDescription(`Invalid format!`)] });
            }
            if(args[0] > 100) {
                return message.reply({ embeds: [_Fail.setDescription(`You cannot delete more than 100 messages!`)] });
            }
            if(args[0] < 1) {
                return message.reply({ embeds: [_Fail.setDescription(`You must delete at least one message!`)] });
            }

            message.channel.bulkDelete(args[0]);
            if(args[0] == 1) {
                const deletingEmbed = new Discord.MessageEmbed()
                .setTitle(`<:court:941096433031991317> Clearing messages..`)
                .setDescription(`> **I have deleted ${args[0]} message!**`)
                .setColor('#23A6F0')
                return message.channel.send({ embeds: [deletingEmbed] })
                .then(m => setTimeout(() => m.delete(), 3000));
            }
            else {
                const deletingEmbed = new Discord.MessageEmbed()
                .setTitle(`<:court:941096433031991317> Clearing messages..`)
                .setDescription(`> **I have deleted ${args[0]} messages!**`)
                .setColor('#23A6F0')
                return message.channel.send({ embeds: [deletingEmbed] })
                .then(m => setTimeout(() => m.delete(), 3000));
            }
        }
        else {
            return message.reply({ embeds: [_Fail.setDescription('You do not have enough permissions!\nRequired permission `Manage Messages`!')] });
        }
    }
}