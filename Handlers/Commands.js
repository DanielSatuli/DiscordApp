const fs = require('fs');
module.exports = async (client, REST, Routes,commandsArray) => {
    /* COMMAND HANDLER  - START*/
    const directoryPath = 'C:/Users/Juju/Desktop/Projektit/Bot_JS/Commands';
    const commandFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`../Commands/${file}`);
        if (!command.name) console.log(`❌ Komennosta puuttuu nimi.`, file);
        if (!command.description) console.log(`❌ Komennosta puuttuu kuvaus.`, file);
        
        commandsArray.push(command);
        client.commands.set(command.name, command);
    }
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    try {
        console.log(`✔ Started refreshing application (/) commands.`);
        await rest.put(Routes.applicationGuildCommands("819990691718627338", "952991441716674610"), { body: commandsArray },);
        console.log(`✔ Successfully reloaded application (/) commands.`);
    } catch (error) { console.error(error); }
    /* COMMAND HANDLER  - END*/
}