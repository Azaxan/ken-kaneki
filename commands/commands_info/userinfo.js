const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  description: `Show your informations, or mentioned user's!`,
  aliases: ["user", "uinfo"],
  usage: "userinfo <@user>",
  execute(message, args) {
    const Target = message.mentions.users.first();

    if (!args[0] || Target == message.author) {
      let user = message.member.user;
      const userID = message.guild.members.cache.get(user.id);
      const userInfoPersonal = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle(`<:user_info:943446977667006475> **Informations about user**`)
        .addField(`**User**`, `${user}`, true)
        .addField(
          `**Highest role**`,
          `${userID.roles.highest.toString()}`,
          true
        )
        .addField(`**User ID**`, `${user.id}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        });
      return message.channel.send({ embeds: [userInfoPersonal] });
    }

    if (Target) {
      const userID = message.guild.members.cache.get(Target.id);
      const userInfo = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle(`<:user_info:943446977667006475> **Informations about user**`)
        .addField(`**User**`, `${Target}`, true)
        .addField(
          `**Highest role**`,
          `${userID.roles.highest.toString()}`,
          true
        )
        .addField(`**User ID**`, `${Target.id}`)
        .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        });
      return message.channel.send({ embeds: [userInfo] });
    } else {
      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        });
      return message.reply({
        embeds: [_Fail.setDescription(`User not found!`)],
      });
    }
  },
};
