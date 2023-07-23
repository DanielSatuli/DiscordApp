const { MessageEmbed } = require('discord.js');
const roleMessageSchema = require('../Models/role-message-schema');

module.exports = {
    name: 'buttonmsg',
    description: 'Alustaa roolinapit',
    type: 1,
    async execute(interaction) {
        const member = interaction.member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';
        const { channel, guild } = interaction;
        /* Tarkistetaan kanava */
        if (channel.id === '953020412718121001') {
            /* Tarkistetaan rooli */
            if (member.has(johtajat) || member.has(nortti)) {
                
                const kanava = guild.channels.cache.get('953020631505567814'); 
                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Klikkaa roolia, jonka haluat lisätä.\nToisen kerran painamalla poistat roolin.\n Napissa oleva kohta "hakemus" tarkoittaa, että palvelimen omistaja hyväksyy tai hylkää roolin lisäämisen. `)
                
                const sentMsg = await kanava.send({embeds: [embed]});

                await new roleMessageSchema({
                    _id: guild.id,
                    channelId: kanava.id,
                    messageId: sentMsg.id,
                }).save()

                await interaction.reply({content: 'Viesti lisätty!', ephemeral: true})
            } else {
                /* JOS VÄÄRÄ ROOLI */
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
                    Komennon voi suorittaa ainoastaan kanavalla:   <#953020412718121001>`);

            interaction.reply({ embeds: [warning], ephemeral: true });
        }
    }
}