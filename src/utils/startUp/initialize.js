const { Client, ApplicationCommandManager } = require("discord.js");
// const mongoose = require('mongoose');

// "CHandler" is for commands and "EHandler" is for events
const handler = require('../../handlers/CHandler');
const eventHandler = require("../../handlers/EHandler");

const readCommands = require('./read-commands');
const readEvents = require("./read-events");

/**
 * @param {Client} bot 
 * @param {string} prefix
 */
module.exports = (bot, prefix) => {
  const commands = readCommands();
  const events = readEvents();

  handler({ bot, commands, prefix });
  eventHandler({ bot, events, prefix });
  slashCommands(bot, commands);

  // Connect to mongodb database
  // mongoose.connect(process.env.MONGOOSE, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  console.log(`Initialization >> ${bot.user.username} is online!`);
}

/**
 * 
 * @param {Client} bot 
 * @param {import("../../typings/commandObj").CommandObj[]} commands 
 */
const slashCommands = (bot, commands) => {
  // Slash command initialize

  // INFO: Please comment out 
  // line 45 and 46 and uncomment line 47
  // when actually deploying the bot

  // Enter guild ID below
  const guildID = 'GUILD ID HERE'; 
  const guild = bot.guilds.cache.get(guildID);
  // let guild;

  /**
   * @type {ApplicationCommandManager}
   */
  let slashCommands;
  if(guild) {
    slashCommands = guild.commands; // This is for testing
  } else {
    slashCommands = bot.application?.commands; // This may take up to an hour to load soo
  }
  for(const command of commands) {
    if(!command.slash) continue;

    const {
      aliases,
      syntax,
      description,
    } = command

    slashCommands.create({
      name: aliases[0],
      description,
      options: syntax,
    });
  }
}