const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setprefix',
    description: 'Sets up custom prefix to bot',
    aliases: ['set-prefix'],
    usage: 'setprefix <prefix>',
    execute (message, args, client, prefix, userColor) {
        const setprefix = JSON.parse(fs.readFileSync('./json/setprefix.json', 'utf-8'));

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

        if(!args[0] || args[1]) {
            return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] });
        }

        setprefix[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile('./json/setprefix.json', JSON.stringify(setprefix), (err) => {if(err) console.log(err)})

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Success!')
        .setDescription('New bot prefix: '+`**${args[0]}**`)
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        message.channel.send({ embeds: [_Succes] })

    }
}