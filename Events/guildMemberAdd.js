const {MessageEmbed, WebhookClient, GuildMember} = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param {GuildMember} member
     */
    execute(member){
        const {user, guild} = member;
        member.roles.add('952992335598350356');
        const Welcome = new WebhookClient({
            id: "971899531681746954",
            token: "HwGseAaJbkEeX4B2RzRi1ZI7gdKb4KyBpvmukOAAMGqGee89hFVEUamLO0VentHJHVRq"
        });
        const welcomeEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor({name: `${user.tag}`, iconURL : `${user.displayAvatarURL({dynamic: true, size: 512})}`})
        .setThumbnail(user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`
        Tervetuloa ${member} palvelimelle **${guild.name}**!\n Käy tutustumassa alla olevista linkeistä sääntöihin ja palvelimen rooleihin.`)
        .addFields({
            name: `📚 Säännöt`,
            value: `<#953020612366974976>`,
            inline: true
        },
        {
            name: `🎭 Roolit`,
            value: `<#953020631505567814>`,
            inline: true
        },
        /*{
            name: `Käyttäjä luotu: <t:${parseInt(user.createdTimestamp / 1000)}:R>`,
            value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
            inline: true
        },*/
        {
            name: `Viimeisin jäsen määrä:`,
            value: `**${guild.memberCount}**`,
            inline: true
        })
        .setFooter({text: ``, iconURL: `${user.displayAvatarURL({dynamic: true, size: 512})}`});

        Welcome.send({embeds: [welcomeEmbed]});
    }
}