const Discord = require('discord.js');

module.exports = {
    name: 'membed',
    description: 'Tworzenie lepszego embeda',
    aliases: ['modembed'],
    usage: 'membed <title> <description>',
    execute (message, args, client, prefix, userColor) {
        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        // const _Embed = new Discord.MessageEmbed()
        // .setAuthor({
        //     name: message.author.tag,
        //     iconURL: message.author.avatarURL({ dynamic: true })
        // })
        // .setFooter({
        //     text: message.author.tag,
        //     iconURL: message.author.avatarURL({ dynamic: true })
        // });

        // const embedColor = ['DEFAULT', 'WHITE', 'AQUA', 'GREEN', 'BLUE', 'YELLOW',
        // 'PURPLE', 'LUMINOUS_VIVID_PINK', 'FUCHISTA', 'GOLD', 'ORANGE', 'RED', 'GREY',
        // 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_VIVID_PINK',
        // 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'DARKER_GREY', 'LIGHT_GREY',
        // 'DARK_NAVY', 'BLURPLE', 'GREYPLE', 'DARK_BUT_NOT_BLACK', 'NOT_QUITE_BLACK', 'RANDOM'];*/

        // let color = args[2];

        if(message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('MANAGE_MESSAGES')) {
            if(!args[0] || !args[1]) {
                return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`**`)] });
            }

            let _title = args[0];
            let parametr2 = args.splice(0,1);
            let _description = args.join(" ");

            message.delete().catch();

            const _Embed = new Discord.MessageEmbed();
            message.channel.send({ embeds: [_Embed
                .setTitle(_title)
                .setDescription(_description)
                .setColor('#2fcfe0')
            ]});

        } else {
            return message.reply({ embeds: [_Fail.setDescription('You do not have enough permissions!\nRequired permission `Zarządzanie Wiadomościami`')] }); 
        }
    }
}