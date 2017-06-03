const { createBot, addHearCommand } = require('../bot');
const botActions = require('../bot/actions');

const botMessageCommands = {
  greeting: ['hello','hi', 'hola', 'ahoy', 'que pasa!', 'hey'],
  search: ['search', 'search for'],
};
const botMessageRecognitionPttrn = ['direct_message','direct_mention','mention'];

async function start(token) {
  const bot = await createBot({ debug: false }, token);
  addHearCommand(botMessageCommands.greeting, botMessageRecognitionPttrn, botActions.greet);
  addHearCommand(botMessageCommands.search, botMessageRecognitionPttrn, botActions.search);
}

module.exports = { start };
