// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const db = require('./helpers/mysql.js');

venom
  .create({
    session: 'whatsbot', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
    // headless: false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  console.log('Iniciando o Bot...');
  client.onMessage(async (msg) => {
    try {
      const user = msg.from.replace(/\D/g, '');
      const getUserFrom = await db.getUser(user);
      const Keyword = msg.body.tolowerCase();
      const replayMessage = await db.getReplay(Keyword);
      const getUserStatus = await db.getStatus(user);
      if (getUserFrom === false) {
        await db.setUser(user);
        const replyMessageWelcome = await db.getReplay('Oi');
        client.sendText(msg.from, replyMessageWelcome);
      }
      else if ( msg.body === '5') {
        await db.setStatusOff(user);
        client.sendText(msg.from, 'ChatBot OFF');
      }
      else if (msg.body === '4') {
        await db.setStatusOn(user);
        client.sendText(msg.from, 'ChatBot ON');
      }
      else if (replayMessage !== false && getUserStatus === 'on') {
        client.sendText(msg.from, replayMessage);
      }
    }
   catch (e) {
    console.log(e)
   }
  });
}