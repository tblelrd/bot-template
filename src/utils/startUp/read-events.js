const { join } = require('path');
const fs = require('fs');

const notLoaded = [];
const events = [];
const re = (dir) => {
  const files = fs.readdirSync(join(__dirname, '../../', dir));

  for(const file of files) {
    const stat = fs.lstatSync(join(__dirname, '../../', dir, file));

    if(stat.isDirectory()) {
      re(join(dir, file));

    } else if(file.endsWith('.js')) {
      const options = require(join(__dirname, '../../', dir, file));

      if(!options.callback) {
        errorMsg('There was a problem loading', file);
      
      } else {
        events.push(options);

      }
    }  
  }
};

const errorMsg = (string, file) => {
  console.log(`Initialization >> ${string} in file: ${file}`)
  notLoaded.push(file);
};

const readEvents = () => {
  re('events');

  if(!notLoaded[0]) console.log(`Initialization >> All ${events.length} events loaded successfully`);
  if(notLoaded[0]) console.log(`Initialization >> ${events.length} events loaded, ${notLoaded.length} events failed to load`);
  return events;
}

module.exports = readEvents;