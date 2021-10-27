require('dotenv').config();
const { Client, Intents } = require('discord.js');

// The function that we are going to run when the bot
// logs in
const initialize = require('./utils/startUp/initialize');

const bot = new Client({
  // This is very important
  intents: [
    Intents.FLAGS.GUILDS, // Bot needs to respond to guild messages 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ]
});

// Fired when bot starts
bot.on('ready', () => {
  //! Fill out the prefix in the second parameter
  initialize(bot, 'YOUR PREFIX HERE');
});

// You put the token in the ".env" file
bot.login(process.env.TOKEN);