const {Modal, TextInputComponent, showModal } = require('discord-modals');
const {ButtonInteraction, Client} = require('discord.js');

module.exports = {
    id: 'create-delete',
    ownerOnly: false,
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const modal = new Modal()
        .setCustomId('delete-modal')
        .setTitle('Poista tapahtuma')
        .addComponents(
            new TextInputComponent()
            .setCustomId('id-delete-modal')
            .setLabel('ID')
            .setStyle('SHORT')
            .setMinLength(1)
            .setMaxLength(2)
            .setPlaceholder('Syötä poistettavan tapahtuman ID.')
            .setRequired(true),
        );
        showModal(modal,{
            client: client,
            interaction: interaction,
        })
    }
}