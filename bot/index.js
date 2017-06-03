const Botkit = require('botkit');

let botInstance;
let botController;

function connect(botInstance){
  if(!botInstance) throw new Error('No instance of bot found');
  return new Promise((resolve, reject) => {
    botInstance.startRTM((err, bot, payload) => {
      if(err) reject(err);
      resolve(bot);
    });
  });
}

async function createBot(opts = {}, token) {
  if(!token) throw new Error('No token was defined');
  const spawnBot = (controller, token) => controller.spawn({ token });

  botController = Botkit.slackbot(opts);
  botInstance = await connect(spawnBot(botController, token));
  // TODO. Remove exposure of bot controller
  return { botController, botInstance };
}

module.exports = {
  createBot,
  // addHearCommand,
};
