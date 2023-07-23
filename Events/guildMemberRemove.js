const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    /**
     * @param {GuildMember} member
     * 
     */
    execute(member){
        const {user, guild} = member;
        const Logout = new WebhookClient({
            id: "971882211227893850",
            token: "sAob7urotWN1mJ_5UumsJXfBpzsh-3oaAeN27cYza1VW7f4-HRUT2vtq097HWItupGpi"
        });
        const postuiEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`
        ${member} poistui palvelimelta\n
        Liittyi: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\n Poistui: <t:${parseInt(new Date().getTime()/1000)}:R>\nViimeisin jäsen määrä: **${guild.memberCount}**`);

        Logout.send({embeds: [postuiEmbed]});
    }
}