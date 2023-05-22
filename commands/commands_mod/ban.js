const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from server!',
    usage: 'ban <@user> <reason>',
    execute (message, args, client, prefix, userColor) {
        
        const _Fail = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('<:failed:942871973669789726> Error!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        const _Succes = new Discord.MessageEmbed()
        .setColor('#4FE538')
        .setTitle('<:passed:942871973439082566> Success!')
        .setTimestamp()
        .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.avatarURL({ dynamic: true })
            });

        if(!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply({ embeds: [_Fail.setDescription('You do not have enough permissions!\nRequired permission `Ban Members`!')] });
        }

        if(message.member.permissions.has(['KICK_MEMBERS', 'BAN_MEMBERS'])) 
        {
            if(!args[0]) {
                return message.reply({ embeds: [_Fail.setDescription(`Correct usage: **\` ${prefix+this.usage} \`** `)] });
            }

            let Target = message.mentions.users.first(); 

                if(!Target || !Target.id) {
                    return message.reply({ embeds: [_Fail.setDescription(`User not found!`)] });
                }

                Target = message.guild.members.cache.get(Target.id);

                if(Target.id == message.author.id) {
                    return message.reply({ embeds: [_Fail.setDescription(`You can't ban yourself!`)] });
                }

                if(Target.permissions.has('MANAGE_MESSAGES')) {
                    return message.reply({ embeds: [_Fail.setDescription(`I can't ban this user!`)] });
                }

            const command = args.splice(0, 1);

            const reason = args.join(" ");

            Target.ban()

            message.channel.send({ embeds: [_Succes
                .setAuthor({
                    name: Target.displayName,
                    iconURL: Target.displayAvatarURL({ dynamic: true })
                })
                .setTitle(`**${Target.displayName}** has been banned from this server!`)
                .setDescription(`Reason: **${reason}**, banned by **${message.author}**`)
            ] });

        } else {
            return message.reply({ embeds: [_Fail.setDescription(`I don't have enough permissions!`)] }); 
        }
    }
}