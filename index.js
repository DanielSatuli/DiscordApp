/* REQUIRED MODULES */
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
//const { Perms } = require('./Validation/Permissions');
const discordModals = require('discord-modals');
discordModals(client);
require('dotenv').config();

/* ID */
const Guild_ID = "952991441716674610";  //RatCave
const Client_ID = "819990691718627338"; //Botti
/* COLLECTIONS */
client.buttons = new Collection();
client.commands = new Collection();
const commandsArray = [];
/* ERROR HANDLING*/
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

/* HANDLERS */
['Commands', 'Events', 'Buttons'].forEach((handler)=>{
    require(`./Handlers/${handler}`)(client,REST,Routes,commandsArray);
});

/* BOT LOGIN/START */
client.login(process.env.TOKEN);