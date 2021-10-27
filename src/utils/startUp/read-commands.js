const { join } = require('path');
const fs = require('fs');
const validPerms = require('../../variables/valid-permissions');

// Read commands in the commands folder

const commands = [];
const notLoaded = [];
const rc = (dir) => {
  const files = fs.readdirSync(join(__dirname, '../../', dir));

  for(const file of files) {
    const stat = fs.lstatSync(join(__dirname, '../../', dir, file));

    if(stat.isDirectory()) {
      rc(join(dir, file));

    } else if(file.endsWith('.js')) {
      const options = require(join(__dirname, '../../', dir, file));

      if(!options.aliases || !options.callback || !options.category || !options.description) {
        errorMsg('There was a problem loading', file);
      
      } else if(!validatePermissions(options.permissions)){
        errorMsg('Invalid permission node', file);

      } else if(options.slash && (!options.description || (options.syntax && !(options.syntax?.[0]?.name && options.syntax[0]?.description && options.syntax[0].type)))) {
        errorMsg('Slash command error', file);
      
      } else if((options.maxArgs > 0 || options.minArgs > 0) && !options.syntax?.[0]?.name) {
        errorMsg('Argument length provided but syntax was not', file);

      } else {
        commands.push(options);

      }
    }  
  }
};

const errorMsg = (string, file) => {
  console.log(`Initialization >> ${string} in file: ${file}`)
  notLoaded.push(file);
};

const validatePermissions = (permissions) => {
  if(!permissions) return true;
  for (const permission of permissions) {
      if (!validPerms.includes(permission)) {
          return false;
      }
  }
  return true;
};

const readCommands = () => {
  rc('commands');
  if(!notLoaded[0]) console.log(`Initialization >> All ${commands.length} files loaded successfully`);
  if(notLoaded[0]) console.log(`Initialization >> ${commands.length} files loaded, ${notLoaded.length} files failed to load`);
  return commands;
}

module.exports = readCommands;
