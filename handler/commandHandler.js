const Discord = require("discord.js");
const fs = require("fs");
const { join } = require("path");
const ascii = require("ascii-table");
const { name } = require("../commands/commands_info/help");
const table = new ascii().setHeading("Command", "Status");
const { defaultprefix } = require(__dirname + "/../config.json");

module.exports = (client) => {
  client.commands = new Discord.Collection();

  const commandFolders = fs.readdirSync(join(__dirname, "/../commands"));

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(join(__dirname, `/../commands/${folder}`))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(join(
        __dirname,
        `/../commands/${folder}/${file}`
      ));
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✅");
      } else {
        table.addRow(file, "❌");
        continue;
      }
    }
  }
  console.log(table.toString());

  client.on("messageCreate", async (message) => {
    const setprefix = JSON.parse(
      fs.readFileSync("./json/setprefix.json", "utf-8")
    );

    if (!setprefix[message.guild.id]) {
      setprefix[message.guild.id] = {
        prefixes: defaultprefix,
      };
    } else if (!setprefix[message.guild.id].prefixes) {
      setprefix[message.guild.id] = {
        prefixes: defaultprefix,
      };
    }

    const prefix = setprefix[message.guild.id].prefixes;

    const args2 = message.content.trim().split(" ");

    if (message.content.toLowerCase() === "tf") {
      message.react("<:tf:941099925700239430>");
    }

    if (message.content.toLowerCase() === "xd") {
      message.react("<a:yurilaugh:944222654490095666>");
    }

    if (
      message.content.startsWith(`<@!${client.user.id}>`) ||
      message.content.startsWith(`<@${client.user.id}>`)
    ) {
      if (!args2[1]) {
        const pingPrefix = new Discord.MessageEmbed()
          .setColor("WHITE")
          .setTitle("<:fade_exclamation:943131209700094003> Prefix")
          .setDescription(
            `This is my prefix: \`${prefix}\`\nType: \`${prefix}help\` for a list of available commands`
          )
          .setFooter({
            text: "Induced by: " + message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          });
        return message.channel.send({ embeds: [pingPrefix] });
      }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    const userColor = message.guild.members.cache.get(
      client.user.id
    ).displayHexColor;

    if (command && command.voiceChannel) {
      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: "Induced by: " + message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        });

      if (!message.member.voice.channel)
        return message.channel.send({
          embeds: [
            _Fail.setDescription(
              `${message.author}, You are not connected to an audio channel.`
            ),
          ],
        });
      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return message.channel.send({
          embeds: [
            _Fail.setDescription(
              `${message.author}, You are not on the same audio channel as me..`
            ),
          ],
        });
    }

    try {
      command.execute(message, args, client, prefix, userColor);
    } catch (error) {
      console.log(error);
      const _Fail = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("<:failed:942871973669789726> Error!")
        .setTimestamp()
        .setFooter({
          text: message.author.tag,
          iconURL: message.author.avatarURL({ dynamic: true }),
        });
      message.reply({
        embeds: [_Fail.setDescription(`This command doesn't work!`)],
      });
    }
  });
};
