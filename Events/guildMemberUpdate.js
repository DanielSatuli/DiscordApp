const { GuildMember, MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require("canvas");

module.exports = {
    name: 'guildMemberUpdate',
    /**
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     */
    async execute(oldMember, newMember) {
        const { guild } = newMember;
        const Thankyou = new MessageEmbed()
            .setColor("#fc49d9")
            .setAuthor({ name: `${newMember.displayName} boostasi palvelinta!`, iconURL:`https://styles.redditmedia.com/t5_2pkme6/styles/communityIcon_lwde2bam36251.png`})
        
        if (!oldMember.premiumSince && newMember.premiumSince) {
            /* Luodaan canvas ja asetetaan kuva*/
            const canvas = Canvas.createCanvas(800, 250);
            const ctx = canvas.getContext("2d");
            const background = await Canvas.loadImage('C:/Users/Juju/Desktop/Projektit/Bot_JS/Images/nitroboost.png'); //Images\nitroboost.png
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            /* Luodaan teskti canvaan keskelle*/
            ctx.strokeStyle = "#9B59B6";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = "38px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(newMember.user.tag, canvas.width / 2, canvas.height / 1.2);
            /* Avatar kuva - enabloi jos haluat sen esille*/
            /*const avatar = await Canvas.loadImage(newMember.user.displayAvatarURL({ format: "jpg" }));
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 25, 25, 200, 200);*/

            /* Luodaan viesti ja lähetetään palvelimelle*/
            const attachment = new MessageAttachment(canvas.toBuffer(), "nitroboost.png");
            Thankyou.setDescription(`Kiitos palvelimen boostaamisesta! Nauti uudesta roolista.`);
            Thankyou.setImage('attachment://nitroboost.png');
            await guild.systemChannel.send({embeds: [Thankyou], files: [attachment]}).catch((error)=> console.log(error));

            /* Luodaan viesti ja lähetetään käyttäjälle (boostaaja)*/
            Thankyou.setAuthor({ name: `Boostasit palvelinta **${guild.name}**`, iconURL:`https://styles.redditmedia.com/t5_2pkme6/styles/communityIcon_lwde2bam36251.png`})
            Thankyou.setDescription(`Kiitos palvelimen boostaamisesta! Nauti uudesta roolista.`)
            newMember.roles.add('972854239825117194');
            newMember.send({embeds: [Thankyou]});
        }
    }
}