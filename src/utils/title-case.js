const toTitleCase = (str) => {
if(!str) return str;
  const noUnderscore = str.replace(/(_)/g, ' ');
  return noUnderscore.replace(
  /\w\S*/g,
  function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  },
  );
};

module.exports = toTitleCase;