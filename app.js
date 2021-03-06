
'use strict'

const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const config = require('./src/config');
const bot = require('./src')

const app = express();
const port = config.PORT || 3000;

app.get('/', (req, res) => { res.send('\n 👋 🌍 \n') });


app.listen(port, (err) => {
  if(err) throw err;

  if (config.SLACK_TOKEN) {
    console.log('🤖 The schnitzel bot is alive in port:', port);
    bot.start(config.SLACK_TOKEN).catch(err => console.log('>>> err', err));
  } else {
    console.log('SLACK_TOKEN missing! Bot is not alive');
  }
});
