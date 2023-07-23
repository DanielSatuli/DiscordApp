const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "summon",
    description: "Lähettää kutsuviestin kohdekäyttäjälle. Vastaa @-mainintaa.",
    options: [
        {
            name: "käyttäjä",
            description: 'Käyttäjän nimi',
            type: 6,
            required: true,
        },
    ],
    async execute(interaction) {
        /* TARKISTETAAN KANAVA - #yleinen*/
        if (interaction.channelId === '952991442534555729') {
            const {guild,channel,options} = interaction;
            const user = options.getUser('käyttäjä')
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Sinut on kutsuttu!\nPalvelin: ${guild.name}\nKanava: <#${channel.id}>`)
            
            user.send({embeds: [embed], ephemeral: true})
            await interaction.reply({ content: `Viesti lähetetty käyttäjälle <@&${user.id}>`, ephemeral: true });
        } else {
            /* JOS VÄÄRÄ KANAVA */
            const warning = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**HUOMIO!** Väärä kanava komennolle.\n
                    Komennon voi suorittaa ainoastaan kanavalla:   <#952991442534555729>`);

            interaction.reply({ embeds: [warning], ephemeral: true });
        }
    },
};