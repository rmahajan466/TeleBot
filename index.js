const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

// replace the value below with the Telegram token you receive from @BotFather to create a new BOT
const TOKEN = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    const text = msg.text;

    console.log("Message received: ", text);

    bot.sendMessage(msg.chat.id, `You said: ${text}`);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to the TeleBot!");
});

bot.onText(/\/joke/, async (msg) => {
    const joke = await axios.get('https://official-joke-api.appspot.com/jokes/random');

    const setup = joke.data.setup;
    const punchline = joke.data.punchline;

    bot.sendMessage(msg.chat.id, setup);
    bot.sendMessage(msg.chat.id, punchline);
});