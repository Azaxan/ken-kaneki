const Discord = require('discord.js');

module.exports = async(client, interaction) => {
    if (!interaction.isSelectMenu()) return;
    if(!interaction) return;

    if(interaction.customId) {
        if(interaction.customId === 'select') {

            const helpEmbed = new Discord.MessageEmbed()
            .setColor('WHITE')
            .setAuthor({
                name: 'Induced by: '+ interaction.member.user.tag,
                iconURL: interaction.member.user.avatarURL({ dynamic: true })
            })
            .setFooter({
                text: 'Please choose a category in the dropdown menu',
            })
            .setTimestamp()

            if(interaction.values == 'mod') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<a:markred:942870298045345892> **Moderation** (8)`, '> `ban`, `kick`, `clear`, `setprefix`, `setlogs`, `removelogs`, `setticket`, `membed`')
                    ]})
            }
            if(interaction.values == 'info') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<a:markwhite:942870298087288852> **Info (5)**`, '> `botinfo`, `userinfo`, `invite`, `mlist`, `help` ')
                    ]})
            }
            if(interaction.values == 'music') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<a:music:943935237921071176>  **Music (11)**`, '> `play`, `skip`, `search`, `pause`, `resume`, `stop`, `queue`, `loop`, `nowplaying`, `back`, `save` ')
                    ]})
            }
            if(interaction.values == '4fun') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<:members:942943341702676521> **4fun (8)**`, '> `avatar`, `poll`, `ship`, `ratewaifu`, `embed`, `cat`, `hello`, `hi`')
                    ]})
            }
            if(interaction.values == 'socials') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<a:funhamster:943272477990223992> **Socials (8)**`, '> `cuddle`, `feed`, `hug`, `kiss`, `pat`, `poke`, `slap`, `tickle`')
                    ]})
            }
            if(interaction.values == 'anime') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<:kenkaneki:943281890662682654>  **Anime (4)**`, '> `waifu`, `neko`, `baka`, `foxgirl` ')
                    ]})
            }
            if(interaction.values == 'trivia') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<a:catkeyboard:941052103592411226> **Quizz (1)**`, '> `anime` ')
                    ]})
            }
            if(interaction.values == 'support') {
                await interaction.channel.send({ embeds: [helpEmbed
                    .addField(`<:support:943524123638906941> **Support (1)**`, '> `ticket` ')
                    ]})
            }

            interaction.deferUpdate()
        }
    }
}