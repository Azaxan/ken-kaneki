const Discord = require("discord.js");
const { QueueRepeatMode } = require("discord-player");

module.exports = (client, interaction) => {
  if (!interaction.isButton()) return;
  if (!interaction) return;

  const queue = client.player.getQueue(interaction.guildId);

  if (interaction.customId) {
    if (interaction.customId === "save-track") {
      const msg = interaction.channel.messages.cache.get(
        interaction.message.id
      );
      if (!msg.embeds[0]) return;
      const title = msg.embeds[0].fields[0].value;
      const author = msg.embeds[0].fields[2].value;

      const sendEmbed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle("Saved Song:")
        .setDescription(
          `Track: **${title}**\nAuthor: **${author}**\nSaved server: **${interaction.guild.name}**`
        );

      interaction.member
        .send({ embeds: [sendEmbed] })
        .then(() => {
          return interaction.reply({
            content: `> I sent you the informations in a private message`,
            ephemeral: true,
            components: [],
          });
        })
        .catch((error) => {
          return interaction.reply({
            content: `> I can't send you a private message.`,
            ephemeral: true,
            components: [],
          });
        });
    }
  }

  if (interaction.customId) {
    if (interaction.customId === "save-track2") {
      const msg = interaction.channel.messages.cache.get(
        interaction.message.id
      );
      if (!msg.embeds[0]) return;
      const title = msg.embeds[0].fields[0].value;
      const author = msg.embeds[0].fields[2].value;

      const sendEmbed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setTitle("Saved Song:")
        .setDescription(
          `Track: **${title}**\nAuthor: **${author}**\nSaved server: **${interaction.guild.name}**`
        );

      interaction.member
        .send({ embeds: [sendEmbed] })
        .then(() => {
          return interaction.reply({
            content: `> I sent you the informations in a private message`,
            ephemeral: true,
            components: [],
          });
        })
        .catch((error) => {
          return interaction.reply({
            content: `> I can't send you a private message.`,
            ephemeral: true,
            components: [],
          });
        });
    }
  }

  if (interaction.customId) {
    if (interaction.customId === "skip-button") {
      const queue = client.player.getQueue(interaction.guild.id);
      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(`<:failed:942871973669789726> Error!`)
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });
      if (!queue) return;

      if (!interaction.member.voice.channel) return;
      if (
        interaction.guild.me.voice.channel &&
        interaction.member.voice.channel.id !==
          interaction.guild.me.voice.channel.id
      )
        return;

      const _Succes = new Discord.MessageEmbed()
        .setColor("#4FE538")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });
      if (!queue || !queue.playing) {
        return interaction.channel
          .send({
            embeds: [
              _Fail.setDescription(
                `${interaction.member.user.toString()}, I can't skip beacause **queue** is empty!`
              ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      } else {
        queue.skip();
        interaction.channel
          .send({
            embeds: [
              _Succes
                .setTitle("<:passed:942871973439082566> Skipped!")
                .setDescription(
                  `${interaction.member.user.toString()} has skipped **${
                    queue.current.title
                  }**! `
                ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      }

      interaction.deferUpdate();
    }
  }

  if (interaction.customId) {
    if (interaction.customId === "pause-resume-button") {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue) return;

      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      if (!interaction.member.voice.channel) return;
      if (
        interaction.guild.me.voice.channel &&
        interaction.member.voice.channel.id !==
          interaction.guild.me.voice.channel.id
      )
        return;

      const _Succes = new Discord.MessageEmbed()
        .setColor("#4FE538")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      const success = queue.setPaused(true);

      if (success) {
        interaction.channel
          .send({
            embeds: [
              _Succes
                .setTitle("<:passed:942871973439082566> Paused!")
                .setDescription(
                  `${interaction.member.user.toString()} has paused **${
                    queue.current.title
                  }**`
                ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      } else {
        queue.setPaused(false);
        interaction.channel
          .send({
            embeds: [
              _Succes
                .setTitle("<:passed:942871973439082566> Resumed!")
                .setDescription(
                  `${interaction.member.user.toString()} has resumed **${
                    queue.current.title
                  }**`
                ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      }

      interaction.deferUpdate();
    }
  }

  if (interaction.customId) {
    if (interaction.customId === "loop-button") {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue) return;

      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      if (!interaction.member.voice.channel) return;
      if (
        interaction.guild.me.voice.channel &&
        interaction.member.voice.channel.id !==
          interaction.guild.me.voice.channel.id
      )
        return;

      const _Succes = new Discord.MessageEmbed()
        .setColor("#4FE538")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      if (!queue.playing)
        return interaction.channel.send({
          embeds: [
            _Fail.setDescription(
              `${interaction.author}, There is no music currently playing!.`
            ),
          ],
        });

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF
      );

      if (queue.repeatMode === 0) {
        interaction.channel
          .send({
            embeds: [
              _Succes
                .setTitle("<:passed:942871973439082566> Loop Inactive!")
                .setDescription(
                  `${interaction.member.user.toString()} has activated Loop Mode: **Inactive**`
                ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      } else {
        interaction.channel
          .send({
            embeds: [
              _Succes
                .setTitle("<:passed:942871973439082566> Loop Active!")
                .setDescription(
                  `${interaction.member.user.toString()} has activated Loop Mode: **Active**`
                ),
            ],
          })
          .then((m) => setTimeout(() => m.delete(), 3500));
      }

      interaction.deferUpdate();
    }
  }

  if (interaction.customId) {
    if (interaction.customId === "stop-button") {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue) return;

      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      if (!interaction.member.voice.channel) return;
      if (
        interaction.guild.me.voice.channel &&
        interaction.member.voice.channel.id !==
          interaction.guild.me.voice.channel.id
      )
        return;

      const _Succes = new Discord.MessageEmbed()
        .setColor("#4FE538")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + interaction.member.user.tag,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        });

      queue.destroy();
      interaction.channel
        .send({
          embeds: [
            _Succes
              .setTitle("<:passed:942871973439082566> Stopped!")
              .setDescription(
                `${interaction.member.user.toString()} has stopped the music. See you later! `
              ),
          ],
        })
        .then((m) => setTimeout(() => m.delete(), 3500));

      interaction.deferUpdate();
    }
  }
};
