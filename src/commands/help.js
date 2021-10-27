// You can remove this command if you want

const { Constants, MessageEmbed, GuildMember, TextChannel } = require("discord.js");

module.exports = {
  aliases: ['help', 'h'],
  description: 'Displays the help menu',
  maxArgs: 1,
  slash: 'both',
  syntax: [
    {
      name: 'command',
      description: 'The command you want to know',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.STRING,
    }
  ],
  category: 'Utility',
  callback: ({ msg, bot, commands, args, prefix, interaction }) => {
    const e = new MessageEmbed();

    const {
      member,
      channel,
    } = msg || interaction;

    if(interaction) args = [interaction.options.getString('command')];

    const allowedCommands = allowedListCheck(commands, member, channel);
    const categories = categoryCalc(allowedCommands);
    
    e.setTitle(`${bot.user.username}'s Help Screen`)
    .setColor('RANDOM')
    .setAuthor(bot.user.username, bot.user.avatarURL());
    if(!args[0]) {

      for (const category of categories) {
        const result = [];
        let res = '';
        for (const command of allowedCommands) {
          if (command.category == category) {
            result.push(command.aliases[0]);
          }
        }
        res = result.map((cmd) => `\`${cmd}\``).join(' ');
        if(res) e.addField(category, res, true);
      }
			e.setFooter(`Use ${prefix}help <command> to get more info on a command!`);

    } else if(args[0]) {
      let found = false; // Finding the alias specified

      for(const command of allowedCommands) {
        for(const alias of command.aliases) {
          if(alias == args[0].toLowerCase()) {
            found = true;

            const expectedArgs = command.syntax?.map(v => `${v?.required !== false ? `<${v?.name}>` : `[<${v?.name}>]` }`).join(' ');
            const mappedAliases = command.aliases.map(v => `\`${v}\``).join(' ');
            const mappedPermissions = command.permissions?.map(v => `\`${v}\``).join(' ');

            e.setTitle(`Command: ${alias}`)
            .setDescription(
              `Correct Syntax: \`${command.slash == true ? '/' : prefix}${alias}${expectedArgs ? ` ${expectedArgs}` : ''}\`\nAliases: ${mappedAliases}\n` + 
              `${mappedPermissions ? `Permissions: ${mappedPermissions}\n` : ``}` +
              `${command.slash ? command.slash == 'both' ? 'This command can be executed using both `slash commands` or `prefix commands`'
              : 'This command can only be executed using `slash commands`' : 'This command can only be executed using `prefix commands`'}\n\n` +
              `*${command.description ? command.description : 'No description set.'}*`,
            );
          }
        }
      }
      if(!found) e.setTitle(`Command: ${args[0]} not found!`);
    }

    if(msg) msg.channel.send({ embeds: [e] });  
    if(interaction) interaction.reply({ embeds: [e], ephemeral: true });
  }
};

/**
 * 
 * @param {import("../../typings/commandObj").CommandObj[]} commands 
 * @param {GuildMember} member 
 * @param {TextChannel} channel
 */
const allowedListCheck = (commands, member, channel) => {
  const allowed = []
  for(const command of commands) {
    if(command.nsfw && !channel.nsfw) continue;
    if(!checkPerms(command.permissions, member)) continue;
    allowed.push(command);
  }
  return allowed;
}

/**
 * 
 * @param {import("discord.js").PermissionString} permissions 
 * @param {GuildMember} member 
 */
const checkPerms = (permissions, member) => {
  if(!permissions?.[0]) return true;
  for (const permission of permissions) {
    if (!member.permissions.has(permission)) {
      return false
    }
  }
  return true;
}

/**
 * 
 * @param {import("../../typings/commandObj").CommandObj[]} commands 
 */
const categoryCalc = (commands) => {
  const categories = [];
  for(const command of commands) {
    if(!categories.includes(command.category)) {
      categories.push(command.category);
    } 
  }
  return categories;
} 