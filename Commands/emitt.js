const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'emitt',
    description: 'Simuloi käyttäjän lisäämisen/poistamisen',
    type: 1,
    permission: 'ADMINISTRATOR',
    options: [
        {
            name: "event",
            description: 'Käyttäjä tapahtuma',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd'
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                },
                {
                    name: 'guildMemberUpdate',
                    value: 'guildMemberUpdate'
                }
            ]
        }
    ],
    async execute(interaction) {
        const member = interaction.member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '953020412718121001') {
            /* TARKISTETAAN ROOLI */
            if (member.has(johtajat) || member.has(nortti)) {
                const choices = interaction.options.getString("event");

                switch (choices) {
                    case "guildMemberAdd": {
                        interaction.client.emit("guildMemberAdd", interaction.member);
                        interaction.reply({ content: "Käyttäjän lisäys simuloitu", ephemeral: true });
                    }
                        break;
                    case "guildMemberRemove": {
                        interaction.client.emit("guildMemberRemove", interaction.member);
                        interaction.reply({ content: "Käyttäjän poistuminen simuloitu", ephemeral: true });
                    }
                        break;
                    case "guildMemberUpdate": {
                        interaction.client.emit("guildMemberUpdate", interaction.member);
                        interaction.reply({ content: "Nitro boost simuloitu", ephemeral: true });
                    }
                }
            } else {
                /* JOS VÄÄRÄ ROOLI*/
                const warning = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**HUOMIO!** Sinulla ei ole oikeuksia käyttää tätä komentoa.\n
             **VAADITTAVAT ROOLIT:**  <@&${johtajat}> , <@&${nortti}>`);

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

    },
}