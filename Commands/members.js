const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "members",
    description: "Palauttaa jäsenien määrän palvelimella",
    async execute(interaction) {
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '953020412718121001') {
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .addFields(
                    /*{name: "Palvelin:", value:`${interaction.guild.name}`, inline: false},*/
                    { name: "Jäseniä yhteensä:", value: `${interaction.guild.memberCount}`, inline: false }
                );
            await interaction.reply({ embeds: [embed], ephemeral: true });
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