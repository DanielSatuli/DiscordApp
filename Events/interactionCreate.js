module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                if (error) console.log(error);

                await interaction.reply({
                    content: "Virhe tapahtui komentoa suorittaessa.",
                    ephemeral: true,
                });
            }
        }

    }
}