
module.exports = {
    name: 'ping',
    description: 'Palauttaa Pong',
    async execute(interaction) {
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '953020412718121001') {
            console.log(interaction.client.buttons);
            await interaction.reply({ content: "Pong", ephemeral: true });
        } else {
            /* JOS VÄÄRÄ KANAVA */
            const warning = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**HUOMIO!** Väärä kanava komennolle.\n
                    Komennon voi suorittaa ainoastaan kanavalla:   <#953020412718121001>`);

            interaction.reply({ embeds: [warning], ephemeral: true });
        }
    }, 
};