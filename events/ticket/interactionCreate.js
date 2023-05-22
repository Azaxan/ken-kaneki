const Discord = require("discord.js");

module.exports = async (client, interaction) => {
  const button1 = new Discord.MessageButton()
    .setCustomId("lock-button")
    .setLabel("Lock")
    .setEmoji("🔒")
    .setStyle("SECONDARY");

  const button3 = new Discord.MessageButton()
    .setCustomId("unlock-button")
    .setLabel("Unlock")
    .setEmoji("🔓")
    .setStyle("SECONDARY");

  const button2 = new Discord.MessageButton()
    .setCustomId("delete-button")
    .setLabel("Delete")
    .setEmoji("🗑️")
    .setStyle("DANGER");

  const row = new Discord.MessageActionRow().addComponents(
    button1,
    button3,
    button2
  );

  if (!interaction.isButton()) return;
  if (!interaction) return;
  if (interaction.customId === "lock-button") {
    if (interaction.member.permissions.has("ADMINISTRATOR")) {
      const msg = interaction.channel.messages.cache.get(
        interaction.message.id
      );
      if (!msg.embeds[0]) return;
      const userID = msg.embeds[0].fields[0].value
        .replace(/<@/g, "")
        .replace(/>/g, "");

      const user = interaction.guild.members.cache.get(userID);
      await interaction.channel.permissionOverwrites.edit(user, {
        SEND_MESSAGES: false,
      });

      const lockedEmbed = new Discord.MessageEmbed()
        .setTitle("<:support:943524123638906941> Support")
        .addField(
          `**Administrator will be in touch with you soon!**`,
          user.toString(),
          true
        )
        .addField("\u200B", "\u200B", true)
        .addField(`**Ticket Status** `, `🔒 Locked`, true)
        .setColor("#23A6F0")
        .setTimestamp()
        .setFooter({
          text: ` - Support Team`,
        });

      await msg.edit({
        ephemeral: true,
        embeds: [lockedEmbed],
        components: [row],
      });
      interaction.deferUpdate();
    }
  }
  if (interaction.customId === "unlock-button") {
    if (interaction.member.permissions.has("ADMINISTRATOR")) {
      const msg = interaction.channel.messages.cache.get(
        interaction.message.id
      );
      if (!msg.embeds[0]) return;
      const userID = msg.embeds[0].fields[0].value
        .replace(/<@/g, "")
        .replace(/>/g, "");

      const user = interaction.guild.members.cache.get(userID);
      await interaction.channel.permissionOverwrites.edit(user, {
        SEND_MESSAGES: true,
      });

      const lockedEmbed = new Discord.MessageEmbed()
        .setTitle("<:support:943524123638906941> Support")
        .addField(
          `**Administrator will be in touch with you soon!**`,
          user.toString(),
          true
        )
        .addField("\u200B", "\u200B", true)
        .addField(
          `**Ticket Status** `,
          `<:passed:942871973439082566> Open`,
          true
        )
        .setColor("#23A6F0")
        .setTimestamp()
        .setFooter({
          text: ` - Support Team`,
        });

      await msg.edit({
        ephemeral: true,
        embeds: [lockedEmbed],
        components: [row],
      });
      interaction.deferUpdate();
    }
  }
  if (interaction.customId === "delete-button") {
    if (interaction.member.permissions.has("ADMINISTRATOR")) {
      const deletingEmbed = new Discord.MessageEmbed()
        .setTitle(`<:court:941096433031991317> Deleting ticket..`)
        .addField(
          `**The ticket will be removed within 5 seconds..**`,
          `<:support:943524123638906941> **Administrator:** ${interaction.user.tag}`
        )
        .setColor("#23A6F0");
      await interaction.channel
        .send({ embeds: [deletingEmbed] })
        .then((msg) => setTimeout(() => msg.channel.delete(), 5000));
      interaction.deferUpdate();
    }
  }
};
