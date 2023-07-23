const fs = require('fs');
const path = require('path');
module.exports = async (client, REST, Routes,commandsArray) => {
    /* BUTTON HANDLER  - START*/
    const directoryPath = 'C:/Users/Juju/Desktop/Projektit/Bot_JS/Buttons'
    const buttonFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith(".js"));
        for (const file of buttonFiles) {
            const button = require(`../Buttons/${file}`);
            if (!button.id) console.log(`❌ Napilta puuttuu id.`, file);
    
            client.buttons.set(button.id, button);
        }
    /* BUTTON HANDLER  - END*/
}