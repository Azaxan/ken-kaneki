const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show list of avaiable commands!',
    aliases: ['commands', 'hlep', 'pomoc'],
    usage: 'help <command>',
    execute (message, args, client, prefix, userColor) {

            const command = client.commands.get(args[0]);
            const avatar = client.user.displayAvatarURL({ dynamic: true });

            if(!command) {
                if(args[0]) {
                    const commandNotFound = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('<:failed:942871973669789726> Error!')
                    .setDescription('Command not found!')
                    .setTimestamp()
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.avatarURL({ dynamic: true })
                    });
                    message.reply({ embeds: [commandNotFound] })
                } else {
                    const helpEmbed = new Discord.MessageEmbed()
                    .setColor('WHITE')
                    .setTitle(`<:help:943116165629243422> Command list`)
                    .setDescription(`Type \` ${prefix+this.usage} \` for more informations about command!`)
                    .addField(`<a:markred:942870298045345892> **Admin (8)**`, '> `ban`, `kick`, `clear`, `setprefix`, `setlogs`, `removelogs`, `setticket`, `membed`')
                    .addField(`<a:markwhite:942870298087288852> **Info (5)**`, '> `botinfo`, `userinfo`, `invite`, `mlist`, `help` ')
                    .addField(`<a:music:943935237921071176>  **Music (11)**`, '> `play`, `skip`, `search`, `pause`, `resume`, `stop`, `queue`, `loop`, `nowplaying`, `back`, `save` ')
                    .addField(`<:members:942943341702676521> **4fun (8)**`, '> `avatar`, `poll`, `ship`, `ratewaifu`, `embed`, `cat`, `hello`, `hi`')
                    .addField(`<a:funhamster:943272477990223992> **Socials (8)**`, '> `cuddle`, `feed`, `hug`, `kiss`, `pat`, `poke`, `slap`, `tickle`')
                    .addField(`<:kenkaneki:943281890662682654>  **Anime (4)**`, '> `waifu`, `neko`, `baka`, `foxgirl` ')
                    .addField(`<a:catkeyboard:941052103592411226> **Quizz (1)**`, '> `anime` ')
                    .addField(`<:support:943524123638906941> **Support (1)**`, '> `ticket` ')
                    // .addField(`<:nsfw:944214321485983804> **NSFW List**`, '> `nsfw` ')
                    .addField(`**Important links!**`, `[<:cinnacoffee:940994017829748737> Buy a coffee!](https://buycoffee.to/azaxan)\n[<:kk_invite:943140105265225770> Invite bot to your server!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=387151&scope=bot)`, false)
                    .setFooter({
                        text: 'Induced by: '+ message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
        
                    message.channel.send({ embeds: [helpEmbed]});
                }
        } else {
            const helpEmbed2 = new Discord.MessageEmbed()
            .setAuthor({
                name: client.user.username,
                iconURL: avatar,
            })
            .setTitle(`> `+prefix+command.usage)
            .setDescription(command.description)
            .setFooter({
                text: 'Induced by: '+ message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp()

            message.channel.send({ embeds: [helpEmbed2] });
        }
    }
}