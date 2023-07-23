const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete',
    description: 'Poistaa viestejä valitun määrän',
    type: 1,
    options: [
        {
            name: 'määrä',
            description: 'Valitse poistettavien viestien määrä.',
            type: 10,
            required: true,
        },
        {
            name: 'kohde',
            description: 'Valitse kohde, jonka viestejä poistetaan.',
            type: 6,
            required: false,
        }
    ],
    async execute(interaction) {
        const member = interaction.member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';
        /* Tarkistetaan kanava */
        if (interaction.channelId === '953020412718121001' || interaction.channelId === '1100131945050034317') {
            /* Tarkistetaan rooli */
            if (member.has(johtajat) || member.has(nortti)) {
                const { channel, options } = interaction;
                const Amount = options.getNumber("määrä");
                const Target = options.getMember("kohde");
                const Messages = await channel.messages.fetch();
                const Response = new MessageEmbed()
                    .setColor("LUMINOUS_VIVID_PINK");
                if (Target) {
                    let i = 0;
                    const filtered = [];
                    (await Messages).filter((m) => {
                        if (m.author.id === Target.id && Amount > i) {
                            filtered.push(m);
                            i++;
                        }
                    })

                    await channel.bulkDelete(filtered).then(messages => {
                        Response.setDescription(`🧹 Poistettu **${messages.size}** viestiä käyttäjältä ${Target}.`);
                        interaction.reply({ embeds: [Response],ephemeral: true });
                    }).catch(e => console.log(e))
                } else {
                    if (Amount > 100 || Amount <= 0) {

                        Response.setDescription(`Määrä ei voi olla isompi kuin 100 tai alle 1.`)

                        return interaction.reply({ embeds: [Response] })
                    }
                    await channel.bulkDelete(Amount).then(messages => {
                        Response.setDescription(`🧹 Poistettu **${messages.size}** viestiä tältä kanavalta.`);
                        interaction.reply({ embeds: [Response],ephemeral: true });
                    }).catch(e => console.log(e))
                }
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