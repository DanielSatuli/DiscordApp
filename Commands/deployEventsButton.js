const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'deployeventsbutton',
    description: 'Alustaa Tapahtumanapin',
    permission: 'ADMINISTRATOR',
    execute(interaction){
        const member = interaction.member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';

        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`Klikkaa **Luo** luodaksesi uuden pelitapahtuman.\nKlikkaa **Muokkaa** muokataksesi olemassa olevaa tapahtumaa.\nKlikkaa **Poista** poistaaksesi olemassa olevan tapahtuman.\n**Muokkaa** ja **Poista** vaativat olemassa olevan tapahtuman ID:n.`)

        const Row = new MessageActionRow()
        Row.addComponents(
            new MessageButton()
            .setCustomId('create-submit')
            .setStyle('SUCCESS')
            .setLabel('Luo'),
            new MessageButton()
            .setCustomId('create-modify')
            .setStyle('PRIMARY')
            .setLabel('Muokkaa'),
            new MessageButton()
            .setCustomId('create-delete')
            .setStyle('DANGER')
            .setLabel('Poista')
        );
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '972625567893585940') {
            /* TARKISTETAAN ROOLI */
            if (member.has(johtajat) || member.has(nortti)) {
                interaction.reply({embeds: [embed], components: [Row]})
            }else {
                /* JOS VÄÄRÄ ROOLI*/
                const warning = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**HUOMIO!** Sinulla ei ole oikeuksia käyttää tätä komentoa.\n
             **VAADITTAVAT ROOLIT:**  <@&${johtajat}>, <@&${nortti}>`);

                interaction.reply({ embeds: [warning], ephemeral: true });
            }
        } else {
            /* JOS VÄÄRÄ KANAVA */
            const warning = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**HUOMIO!** Väärä kanava komennolle.\n
                    Komennon voi suorittaa ainoastaan kanavalla:   <#972625567893585940>`);

            interaction.reply({ embeds: [warning], ephemeral: true });
        }
        
        
    }
}