module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.channelId === '1100131945050034317' && message.author.id !='819990691718627338') {
            try {
                await message.reply("<@164797068370640897>")
            } catch (error) {
                if (error) console.log(error);
            }
        }
    }
}