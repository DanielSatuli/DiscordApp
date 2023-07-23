const { MessageEmbed } = require('discord.js');
var id = 0;
module.exports = {
    name: 'create',
    description: 'Luo Pelitapahtuma',
    options: [
        {
            name: "peli",
            description: 'Peli, jota pelataan',
            type: 3,
            required: true,
        },
        {
            name: "aika",
            description: 'Aika, jolloin pelataan. Muotoa päivä/kuukausi.',
            type: 3,
            required: true,
        },
        {
            name: "määrä",
            description: 'Maksimi määrä pelaajia.',
            type: 4,
            required: true,
        }
    ],
    async execute(interaction) {
        const member = interaction.member.roles.cache;
        const johtajat = '952991504534741052';
        const nortti = '952992453072392233';
        const kansa = '952992335598350356';
        /* OPTIONS */
        const { options } = interaction
        const peli = options.getString('peli');
        const aika = options.getString('aika');
        const määrä = options.getInteger('määrä');
        /* TARKISTETAAN KANAVA */
        if (interaction.channelId === '972625567893585940') {
            /* TARKISTETAAN ROOLI */
            if (member.has(johtajat) || member.has(nortti) || member.has(kansa)) {
                console.log(peli, aika, määrä);
                if (checkaika(aika)) {
                    const splitattuaika = aika.split("/");
                    const thisYear = new Date().getFullYear();
                    const modified = new Date(thisYear, parseInt(splitattuaika[1])-1, parseInt(splitattuaika[0]));
                    const embed = new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription(`
                    Peli: **${peli}**\tID: ${id}\nPäivämäärä: <t:${parseInt(modified.getTime()/1000)}:d>\n Maksimi pelaajamäärä: **${määrä}**\n Ilmoittautuneet: 0/${määrä}`)
                    id++;
                    interaction.reply({ embeds: [embed]});


                } else {
                    /* JOS VÄÄRÄ AIKAMUOTO*/
                    const warning = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`**HUOMIO!** Väärä aikamuoto.\n
                    **SYÖTETTY AIKA:** ${aika}\n
                    **VAADITTU AIKAMUOTO:** Esim. 07/05 (pp/kk)`);

                    interaction.reply({ embeds: [warning], ephemeral: true });
                }
            } else {
                /* JOS VÄÄRÄ ROOLI*/
                const warning = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**HUOMIO!** Sinulla ei ole oikeuksia käyttää tätä komentoa.\n
             **VAADITTAVAT ROOLIT:**  <@&${johtajat}>, <@&${nortti}>, <@&${kansa}>`);

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
function checkaika(aika) {
    const oikein = aika.split('/');
    if (oikein[0].length === 2 && oikein[1].length === 2) {
        return true;
    } else {
        return false;
    }
}