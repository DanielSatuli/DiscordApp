const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { connection } = require('mongoose');
require('../Events/ready');

module.exports = {
    name: 'status',
    description: 'Palauttaa botin ja tietokannan statuksen',
    async execute(interaction) {
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '953020412718121001') {
            const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`**Botti**: \`🟢 ONLINE\` - \`${interaction.client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(interaction.client.readyTimestamp / 1000)}:R>\n
        **Tietokanta**: \`${switchTo(connection.readyState)}\``);
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
}
function switchTo(value) {
    var status = " ";
    switch (value) {
        case 0: status = `🔴 DISCONNECTED`
            break;
        case 1: status = `🟢 CONNECTED`
            break;
        case 2: status = `🟡 CONNECTING`
            break;
        case 3: status = `🟠 DISCONNECTING`
            break;
    }
    return status;
}