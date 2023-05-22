const Discord = require("discord.js");
const { Player } = require("discord-player");
const { loopMessage } = require("../config.json");

module.exports = class EndTimeout {
  constructor() {
    this.timeouts = new Map();
  }

  setTimeout(queue) {
    let timeout = setTimeout(async () => {
      queue.connection.disconnect();
      queue.destroy(true);
      await queue.metadata.send({
        embeds: [
          new MessageEmbed()
            .setColor("#ffff66")
        ],
      });
    }, leave_on_end * 1000);
    this.timeouts.set(queue.guild.id, timeout);
  }

  clearTimeout(queue) {
    let timeout = this.timeouts.get(queue.guild.id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(queue.guild.id);
    }
  }
};

module.exports = (client) => {
  client.player = new Player(client);
  client.commands = new Discord.Collection();
  const player = client.player;

  const _Fail = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("<:failed:942871973669789726> Error!")
    .setTimestamp();

  const _Succes = new Discord.MessageEmbed()
    .setColor("#4FE538")
    .setTitle("<:passed:942871973439082566> Success!")
    .setTimestamp();

  player.on("error", (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
  });

  player.on("connectionError", (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
  });

  player.on("trackStart", (queue, track) => {
    const timestamp = queue.getPlayerTimestamp();
    if (timestamp.progress > 0) return;

    if (!loopMessage && queue.repeatMode !== 0) return;

    const saveButton = new Discord.MessageButton()
      .setLabel("Save Song")
      .setCustomId("save-track")
      .setStyle("SUCCESS");

    const skipButton = new Discord.MessageButton()
      .setLabel("Skip")
      .setCustomId("skip-button")
      .setStyle("PRIMARY");

    const pauseresumeButton = new Discord.MessageButton()
      .setLabel("Pause/Resume")
      .setCustomId("pause-resume-button")
      .setStyle("PRIMARY");

    const loopButton = new Discord.MessageButton()
      .setLabel("Loop")
      .setCustomId("loop-button")
      .setStyle("PRIMARY");

    const stopButton = new Discord.MessageButton()
      .setLabel("Stop")
      .setCustomId("stop-button")
      .setStyle("DANGER");

    const row = new Discord.MessageActionRow().addComponents(
      skipButton,
      pauseresumeButton,
      loopButton,
      stopButton,
      saveButton
    );

    const _Embed = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setURL(track.url)
      .setTitle("<a:music:943935237921071176> Music!")
      .addField(`Title`, track.title, true)
      .addField(`\u200b`, `\u200b`, true)
      .addField(`Author`, track.author, true)
      .addField(
        `Duration`,
        track.duration == "0:00" ? "🔴 LIVE" : track.duration,
        true
      )
      .addField(`\u200b`, `\u200b`, true)
      .addField(`Channel`, queue.connection.channel.toString(), true)
      .setThumbnail(track.thumbnail)
      .setFooter({
        text: "Induced by: " + track.requestedBy.username,
        iconURL: track.requestedBy.avatarURL({ dynamic: true }),
      })
      .setTimestamp();

    queue.metadata.send({ embeds: [_Embed], components: [row] });
  });

  player.on("trackAdd", (queue, track) => {
    const timestamp = queue.getPlayerTimestamp();

    if (!queue.playing) return;
    queue.metadata
      .send({
        embeds: [
          _Succes
            .setTitle(`<a:music:943935237921071176> Added to playlist`)
            .setDescription(`**${track.title}** added to playlist.`)
            .setColor("WHITE")
            .setFooter({
              text: "Induced by: " + track.requestedBy.username,
              iconURL: track.requestedBy.avatarURL({ dynamic: true }),
            }),
        ],
      })
      .then((m) => setTimeout(() => m.delete(), 3500));
  });

  player.on("botDisconnect", (queue) => {
    queue.metadata.send({
      embeds: [
        _Fail
          .setTitle(`<a:music:943935237921071176> Disconnected`)
          .setColor("WHITE")
          .setDescription(
            "Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared!"
          ),
      ],
    });
  });

  player.on("channelEmpty", (queue) => {
    queue.metadata.send({
      embeds: [
        _Fail
          .setTitle(`<a:music:943935237921071176> Channel empty`)
          .setColor("WHITE")
          .setDescription(
            "I left the audio channel because there is no one on my audio channel."
          ),
      ],
    });
  });

  player.on("queueEnd", (queue, endTimeout) => {
    if (!queue.playing) {
      setTimeout(() => queue.destroy(), 25000);
    }
  });
};
