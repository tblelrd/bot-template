const { Client } = require("discord.js");

/**
 * @param {EventHandlerObj} x 
 */
const eventHandler = (x) => {
  const {
    bot,
    events,
    prefix,
    globalVars,
  } = x;

  for(const event of events) {
    event.callback({
      bot,
      globalVars,
      prefix,
    });
  }
}

module.exports = eventHandler;

/**
 * @typedef {object} EventHandlerObj
 * @prop {import('../typings/globalVars').GlobalVarObj} globalVars
 * @prop {Client} bot
 * @prop {import('../typings/eventObj').EventObj} events
 * @prop {string} prefix
 */
