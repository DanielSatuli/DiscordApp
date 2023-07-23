const fs = require('fs');
const {commandsArray} = require('../Handlers/Commands');
module.exports = async (client, REST, Routes,commandsArray) => {
    /* EVENT HANDLER  - START*/
    const directoryPath = 'C:/Users/Juju/Desktop/Projektit/Bot_JS/Events';

    const eventFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
        const event = require(`../Events/${file}`);

        if (event.once) { client.once(event.name, (...args) => event.execute(...args, commandsArray)) }
        else { client.on(event.name, (...args) => event.execute(...args, commandsArray)) }
    }
    /* EVENT HANDLER  - END*/
}