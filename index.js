const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.Bot_Token);

bot.start((ctx) => ctx.reply('Welcome to Jay Singh bot'));
bot.command('jaySingh', (ctx) => ctx.reply('jay singh is busy with some work'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

const launchBot = async () => {
  try {
    await bot.launch();
    console.log('Bot launched successfully');
  } catch (err) {
    if (err.response && err.response.error_code === 409) {
      console.log('Another instance detected. Exiting...');
      process.exit(1);
    } else {
      console.error('Error launching bot:', err);
    }
  }
};

launchBot();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))