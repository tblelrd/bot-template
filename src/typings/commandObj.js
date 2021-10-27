const { Message, CommandInteraction, Client } = require('discord.js');
module.exports = '';

/**
 * @typedef {object} CommandObj
 * @prop {string[]} aliases
 * @prop {import('discord.js').PermissionString[]} permissions
 * @prop {number} minArgs
 * @prop {number} maxArgs
 * @prop {SyntaxObj[]} syntax
 * @prop {string} category
 * @prop {string} description
 * @prop {boolean|'both'} slash
 * @prop {boolean} nsfw
 * @prop {(callback: CallbackObj) => any} callback
 */

/**
 * @typedef {object} CallbackObj 
 * @prop {Message} msg
 * @prop {string[]} args
 * @prop {string} text
 * @prop {Client} bot
 * @prop {CommandObj[]} commands
 * @prop {CommandInteraction} interaction 
 * @prop {string} prefix
 */

/**
 * @typedef {object} SyntaxObj
 * @prop {string} name
 * @prop {string} description
 * @prop {boolean} required
 * @prop {object} type
 */