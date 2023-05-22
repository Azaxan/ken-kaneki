const Discord = require("discord.js");
const fs = require("fs").promises;
const { join } = require("path");

module.exports = (client) => {
  fs.readdir(join(__dirname, "../events/main")).then((files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.substring(0, file.indexOf(".js"));
      let eventModule = require(join(__dirname, `../events/main/${eventName}`));

      client.on(eventName, eventModule.bind(null, client));
    });
  });
  fs.readdir(join(__dirname, "../events/logss")).then((files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.substring(0, file.indexOf(".js"));
      let eventModule = require(join(
        __dirname,
        `../events/logss/${eventName}`
      ));

      client.on(eventName, eventModule.bind(null, client));
    });
  });
  fs.readdir(join(__dirname, "../events/ticket")).then((files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.substring(0, file.indexOf(".js"));
      let eventModule = require(join(
        __dirname,
        `../events/ticket/${eventName}`
      ));

      client.on(eventName, eventModule.bind(null, client));
    });
  });
  fs.readdir(join(__dirname, "../events/musicc")).then((files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.substring(0, file.indexOf(".js"));
      let eventModule = require(join(
        __dirname,
        `../events/musicc/${eventName}`
      ));

      client.on(eventName, eventModule.bind(null, client));
    });
  });
  fs.readdir(join(__dirname, "../events/help")).then((files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let eventName = file.substring(0, file.indexOf(".js"));
      let eventModule = require(join(__dirname, `../events/help/${eventName}`));

      client.on(eventName, eventModule.bind(null, client));
    });
  });
};
