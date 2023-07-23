const roleMessageSchema = require('../Models/role-message-schema');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const prefix = 'button-roles-';
module.exports = {
    name: 'btnrole',
    description: 'Lisää #roolit kanavalle roolinappi',
    options: [
        {
            name: "rooli",
            description: 'Roolin nimi',
            type: 8,
            required: true,
        },
        {
            name: "emoji",
            description: 'Roolille emoji',
            type: 3,
            required: true,
        },
        {
            name: "label",
            description: 'Teksti napissa',
            type: 3,
            required: true,
        }
    ],
    async execute(interaction) {
        const { options, channel, member, guild } = interaction
        const mbr = member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';
        /* TARKISTETAAN KANAVA */
        /* #roolit TAI #komennot */
        if (channel.id === '953020412718121001' || channel.id === '953020631505567814') {
            /* TARKISTETAAN ROOLI */
            if (mbr.has(johtajat) || mbr.has(nortti)) {
                /* OPTIONS */
                const role = options.getRole('rooli');
                const emoji = options.getString('emoji');
                const label = options.getString('label');

                const data = await roleMessageSchema.findById(guild.id)
                if (!data) interaction.reply({ content: `Rooliviestiä ei löydetty. Luo se ensin /btnmsg-komennolla.`, ephemeral: true });

                const { channelId, messageId } = data;
                const msgChannel = guild.channels.cache.get(channelId);
                const roleMsg = await msgChannel.messages.fetch(messageId);

                const rows = roleMsg.components
                const button = new MessageButton()
                .setLabel(label)
                .setEmoji(emoji)
                .setStyle(1)
                .setCustomId(`${prefix}${role.id}`)

                let added = false;

                for(const row of rows){
                    if(row.components.length < 5){
                        row.addComponents(button)
                        added = true;
                        break;
                    }
                }

                if(!added){
                    if(rows.length >= 5){
                        interaction.reply({content: `Ei voi lisätä enää nappeja viestiin. (max 25)`})
                    }

                    rows.push(new MessageActionRow().addComponents(button));
                }
                roleMsg.edit({
                    components: rows,
                });
                interaction.reply({content: `Lisätty nappi roolikanavalle.`, ephemeral: true});
            } else {
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
                    Komennon voi suorittaa ainoastaan kanavilla:   <#953020412718121001> ja <#953020631505567814>`);

            interaction.reply({ embeds: [warning], ephemeral: true });
        }

    }
}