const Botkit = require('botkit');
const google = require('google');
const R = require('ramda');

const baseOpts = {
  resultsPerPage: 3
};
function start(token) {
  const botController = Botkit.slackbot({ debug: false });
  const bot = botController.spawn({ token });

  bot.startRTM((err, bot, payload) => {
    if (err) {
      throw new Error(`Could not connect to slack: ${err}`);
    }
  });
  botController.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message, 'Hello! :)');
  });
  botController.hears(
    ['search'],
    ['direct_message','direct_mention','mention'],
    (bot, message) => {
      bot.reply(message, 'HALLO! here are your results... enjoy!');
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

function foodRecomendations(message, callback) {
  const query = R.replace(R.toLower(message.match[0]),'', message.text);
  console.log('query', query);
  googleSearch(query, baseOpts, (err, res) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, res);
  });
}


function googleSearch(text, opts, callback) {
  google.resultsPerPage = opts.resultsPerPage;
  google.protocol = 'http';
  google(text, (err, response) => {
    if(err) {
      callback(new Error(err));
      return;
    }
    callback(null, response.links);
  })
}

module.exports = { start };
