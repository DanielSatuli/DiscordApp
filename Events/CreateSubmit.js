const { Modal } = require('discord-modals');
const { MessageEmbed } = require('discord.js');
var id = 0;
module.exports = {
    name: "modalSubmit",
    /**
     * @param {Modal} modal 
     */
    async execute(modal) {
        if (modal.customId !== 'create-modal') return;

        await modal.deferReply();
        /* Arvot modalista */
        const Peli = modal.getTextInputValue('peli-modal');
        const Aika = modal.getTextInputValue('aika-modal');
        const PMäärä = modal.getTextInputValue('maara-modal');
        /* Tarkistetaan Aika */
        if (checkTime(Aika)) {
            const kello = Aika.split(' ')[0];
            const tunti = kello.split(':')[0];
            const minuutti = kello.split(':')[1];
            const päiväys = Aika.split(' ')[1];
            const kuukausi = päiväys.split("/")[1];
            const päivä = päiväys.split("/")[0];
            const thisYear = new Date().getFullYear();
            const modified = new Date(thisYear, parseInt(kuukausi) - 1, parseInt(päivä),tunti,minuutti);
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`Peli: **${Peli}**`)
                .setDescription(``)
                .addFields(
                    {
                        name: `Päivämäärä:`,
                        value: `<t:${parseInt(modified.getTime() / 1000)}:F>`,
                        inline: true,
                    },
                    {
                        name: `Maksimi pelaajamäärä: `,
                        value: `${PMäärä}`,
                        inline: true,
                    },
                    {
                        name: `ID: `,
                        value: `${id}`,
                        inline: true,
                    },
                    {
                        name: `Ilmoittautuneet: 0/${PMäärä}`,
                        value: `\u200B`
                    }
                )
            id++;
            modal.followUp({ embeds: [embed] });
        } else {
            const warning = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**HUOMIO!** Väärä aikamuoto.\n
                    **SYÖTETTY AIKA:** ${Aika}\n
                    **VAADITTU AIKAMUOTO:** Esim. 07/05 (pp/kk)`);

            modal.followUp({ embeds: [warning], ephemeral: true });
        }


    }
}
function checkTime(aika) {
    if (!aika.includes('/')|| !aika.includes(':') ||!aika.includes(' ')) {
        return false;
    }
    const kello = aika.split(' ')[0]
    const päivä = aika.split(' ')[1]
    const mpäivä = päivä.split('/');
    if (isNaN(parseInt(mpäivä[0]))) {
        return false;
    } else if (isNaN(parseInt(mpäivä[1]))) {
        return false;
    } else if (mpäivä[0].length !== 2) {
        return false;
    } else if (mpäivä[1].length !== 2) {
        return false;
    } else if(isNaN(kello.split(':')[0])){
        return false;
    } else if(isNaN(kello.split(':')[1])){
        return false;
    } else{
        return true;
    }

}