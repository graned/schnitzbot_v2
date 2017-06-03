
const google = require('google');
const R = require('ramda');
const { createBot } = require('../bot');

async function start(token) {
  const bot = await createBot({ debug: false }, token);
  // bot.addHearCommand(['hello','hi'], fn);

  bot.botController.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message, 'Hello! :) - from localhost');
  });
  bot.botController.hears(
    ['search', 'search for'],
    ['direct_message','direct_mention','mention'],
    (bot, message) => {
      bot.reply(message, '(From localhost) HALLO! here are your results... enjoy!');
      foodRecomendations(message, (err, result) => {
        if(err) {
          console.log(err);
          bot.reply(message, `O no! there was an error: ${err}`);
        }
        R.map(e => {
          bot.reply(message, `:ice_cream_parrot: ${e.link}`)
        }, result);
      });
    }
  );
}

function foodRecomendations(message) {
  const query = R.replace(R.toLower(message.match[0]),'', message.text);

  console.log('query', query);
  return googleSearch(query);
}

async function googleSearch(text) {
  const resultsPerPage = 3; // TODO. get this value by asking
  google.protocol = 'http';

  return new Promise((resolve, reject) => {
    google(text, (err, response) => {
      if(err) reject(err);
      resolve(response.links);
    });
  });
}

module.exports = { start };
