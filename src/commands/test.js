const { Constants } = require("discord.js");

// The three lines below is useful to get intellisense
/**
 * @type {import("../typings/commandObj").CommandObj}
 */
// This is a template command
module.exports = {
  aliases: ['test', 't'], // This will be the word used to execute
  // the command. Like !test
  category: 'Test', // The category of command
  // this will be displayed in the in-built help command
  description: 'Testing testing', // The description
  // this will also be in the help command
  minArgs: 0, // Optional, this defaults to 0 
  // the minimum amount of arguments that the command needs
  maxArgs: 100, // This is optional, will be infinity if not specified
  // the maximum amount of arguments that the commmand needs
  permissions: ['CONNECT'], // The permissions that the command needs
  // you can find the permissions in the valid-permissions.js file
  // inside of the variables folder
  // "ROOT/src/variables/valid-permissions.js"
  slash: 'both', // Can be true, false, or 'both'
  // Enables slash commands
  syntax: [
    {
      name: 'E', // If this command wasnt a slash command then the 
      // only field needed here is "name"
      description: 'description here',
      required: false, // If the argument is required
      type: Constants.ApplicationCommandOptionTypes.STRING,
    },
  ],
  // Below is the main function that will run when they
  // use the command
  callback: ({ msg, bot, commands, args, text, prefix, interaction }) => {
    if(msg) {
      msg.reply('Helllo');
    } else if(interaction) {
      interaction.reply('Hello')
    }
  }
}