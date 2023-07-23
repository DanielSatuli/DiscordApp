const { ButtonInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const prefix = 'button-roles-';
module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const { guild, customId } = interaction;
        const Button = interaction.client.buttons.get(interaction.customId);
        /* Roolinapit */
        if (interaction.isButton() && interaction.customId.startsWith(prefix)) {

            if (!guild || !customId.startsWith(prefix)) {
                return;
            }

            const roleId = customId.replace(prefix, '');
            const member = interaction.member;
            const owner = guild.members.cache.get('164797068370640897');
            if (roleId === '952991504534741052' || roleId === '952992453072392233') {
                const role = guild.roles.cache.get(roleId);
                const embed = new MessageEmbed()
                    .setColor('YELLOW')
                    .setTitle(`**Roolihakemus**`)
                    .setDescription(`Käyttäjä **${member.user.username}** haluaa roolin **${role.name}**`)

                const approve = new MessageButton()
                    .setLabel('Hyväksy')
                    .setStyle(3)
                    .setCustomId(`approve-${roleId}`)

                const deny = new MessageButton()
                    .setLabel('Hylkää')
                    .setStyle(4)
                    .setCustomId(`deny-${roleId}`)

                if (member.roles.cache.has(roleId)) {
                    interaction.reply({ content: `Sinulla on jo rooli <@&${roleId}>`, ephemeral: true });
                } else {
                    const row = new MessageActionRow().addComponents([approve, deny])
                    owner.send({ embeds: [embed], components: [row] });
                    interaction.reply({ content: `Hakemus lähetetty. Saat vastauksen mahdollisimman pian.`, ephemeral: true });
                }
            } else {
                if (member.roles.cache.has(roleId)) {
                    member.roles.remove(roleId);
                    interaction.reply({ content: `Sinulla ei ole enää roolia <@&${roleId}>`, ephemeral: true });
                } else {
                    member.roles.add(roleId);
                    interaction.reply({ content: `Sinulla on nyt rooli <@&${roleId}>`, ephemeral: true });
                }
            }
        } else if (interaction.isButton() && interaction.customId.startsWith('approve-')) {
            const roleId = interaction.customId.replace('approve-', '');
            const mbrName = interaction.message.embeds[0].description.split('**')[1];
            const guild = interaction.client.guilds.cache.get('952991441716674610');
            const role = guild.roles.cache.get(roleId);
            const member = guild.members.cache.filter(m => m.user.username === mbrName);
            member.forEach((m) => {
                m.roles.add(roleId);
                m.user.send(`Roolihakemus hyväksytty. Sinulla on nyt rooli @${role.name}`)
            });

            interaction.reply({ content: `Roolihakemus hyväksytty.`, ephemeral: true });
        } else if (interaction.isButton() && interaction.customId.startsWith('deny-')) {
            const roleId = interaction.customId.replace('deny-', '');
            const mbrName = interaction.message.embeds[0].description.split('**')[1];
            const guild = interaction.client.guilds.cache.get('952991441716674610');
            const role = guild.roles.cache.get(roleId);
            const member = guild.members.cache.filter(m => m.user.username === mbrName);
            member.forEach(m => m.user.send(`Roolihakemus hylätty. Et saanut roolia @${role.name}`));
            interaction.reply({ content: `Roolihakemus hylätty.`, ephemeral: true });
        } else {
            Button.execute(interaction, interaction.client);
        }

        /* TO DO - Paremmat permissionit*/
        /*if(Button.permission && !interaction.member.permissions.has(Button.permission))
        return interaction.reply({content: `Sinulta puuttuu oikeudet.`, ephemeral: true});

        if(Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
        return interaction.reply({content: `Omistajalla on ainoastaan oikeus tähän.`, ephemeral: true});*/

    }
}