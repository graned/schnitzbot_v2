const Botkit = require('botkit');
let bot;
function start() {
  const botController = Botkit.slackbot({ debug: false });
  bot = botController.spawn({ token:  process.env.SLACK_TOKEN });
  bot.startRTM((err, bot, payload) => {
    if (err) {
      throw new Error(`Could not connect to slack: ${err}`);
    }
  });
  botController.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello.");
  });
}

module.exports = { start };
