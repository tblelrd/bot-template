// This is the main file for handling guild commands.

const { Client } = require('discord.js');

/**
 * @param {HandlerObj} x 
 */
const handler = (x) => {
  const {
    bot,
    commands,
    prefix,
  } = x;

  // This is sent when the user does not have valid permissions
  const permStr = 'You do not have the valid permissions to execute this command!'

  // Message commands
  bot.on('messageCreate', msg => {
    if(msg.author.bot || msg.channel.type == 'DM') return;

    const {
      content,
      member,
      channel,
    } = msg;

    for(const command of commands) {
      if(command.slash == true) continue;

      for(const alias of command.aliases) {
        // A check if the command exists
        if(content.toLowerCase().split(' ')[0] != `${prefix}${alias.toLowerCase()}`) continue;

        let {
          maxArgs = null,
          minArgs = 0,
          permissions = [],
          syntax,
          nsfw,
          callback,
        } = command;

        if(nsfw && !channel.nsfw) return msg.reply('You can only use NSFW commands in NSFW channels');


        for(const permission of permissions) {
          if(!member.permissions.has(permission)) {
            msg.reply(permStr);
            return;
          }
        }

        // Splitting args
        const args = content.split(/[ ]+/);
        args.shift(); // Getting rid of the prefix and alias

        if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
          const expectedArgs = syntax.map(v => `${v?.required !== false ? `<${v?.name}>` : `[<${v?.name}>]` }`).join(' ');

          msg.reply(`Incorrect Syntax! Use \`${prefix}${alias}${expectedArgs ? ` ${expectedArgs}` : ''}\``);
          return;
          
        }

        try {
          callback({
            msg,
            args,
            text: args.join(' '),
            bot,
            commands,
            prefix,
          });
        } catch(error) {
          // Something is up with the code?
          console.error(error);

          msg.reply('There was an error while running this command. Please inform the developer immediately.');
        }
      }
    }
  });

  // Slash commands
  bot.on('interactionCreate', interaction => {
    if(!interaction.isCommand()) return;

    const { commandName, member } = interaction;

    for(const command of commands) {
      if(!command.slash) continue;
      if(command.aliases[0] != commandName) continue;
      
      let {
        callback,
        permissions = [],
        nsfw,
      } = command;
      
      if(nsfw && !interaction.channel.nsfw) return interaction.reply({ content: 'You can only send NSFW commands in NSFW channels', ephemeral: true });

      for(const permission of permissions) {
        if(!member.permissions.has(permission)) {
          interaction.reply({
            content: permStr,
            ephemeral: true,
          });
          return;
        }
      }

      try {
        callback({
          interaction,
          bot,
          commands,
          prefix,
          queues,
          globalVars,
        });
      } catch (err) {
        console.error(err);

        interaction.reply({
          content: 'There was an error while running this command. Please inform the developer immediately.',
        });
      }
    }
  });
}

module.exports = handler; 


// Intellisensing

/**
 * @typedef {object} HandlerObj
 * @prop {Client} bot
 * @prop {import("../typings/commandObj").CommandObj[]} commands
 * @prop {string} prefix
 * @prop {import('./music').QueueMap} queues
 * @prop {import('../typings/globalVars').GlobalVarObj} globalVars
 */