const {Modal, TextInputComponent, showModal } = require('discord-modals');
const {ButtonInteraction, Client} = require('discord.js');

module.exports = {
    id: 'create-submit',
    ownerOnly: false,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const modal = new Modal()
        .setCustomId('create-modal')
        .setTitle('Luo tapahtuma')
        .addComponents(
            new TextInputComponent()
            .setCustomId('peli-modal')
            .setLabel('Peli')
            .setStyle('LONG')
            .setMinLength(5)
            .setMaxLength(30)
            .setPlaceholder('Syötä pelattava peli.')
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('aika-modal')
            .setLabel('Ajankohta')
            .setStyle('SHORT')
            .setMinLength(11)
            .setMaxLength(11)
            .setPlaceholder('Syötä ajankohta. Esim: 18:00 11.05')
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('maara-modal')
            .setLabel('Pelaaja määrä')
            .setStyle('SHORT')
            .setMinLength(1)
            .setMaxLength(2)
            .setPlaceholder('Syötä maksimi pelaajamäärä')
            .setRequired(true),
        );
        showModal(modal,{
            client: client,
            interaction: interaction,
        })
    }
}