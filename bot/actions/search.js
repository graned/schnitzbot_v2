const google = require('google');
const R = require('ramda');

async function search(bot, message) {
  const searchResults = await foodRecomendations(message);
  bot.reply(message, 'here are your results... enjoy!');
  const links = searchResults.map(r => `:ice_cream_parrot: ${r.link}\n`);

  bot.reply(message, `${links}`);
}

function foodRecomendations(message) {
  const query = R.replace(R.toLower(message.match[0]),'', message.text);
  return googleSearch(query);
}

async function googleSearch(text) {
  google.resultsPerPage = 3; // TODO. get this value by asking
  google.protocol = 'http';

  return new Promise((resolve, reject) => {
    google(text, (err, response) => {
      if(err) reject(err);
      resolve(response.links);
    });
  });
}

module.exports = search;
