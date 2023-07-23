const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    name: "ready",
    once: true,
    async execute(client,commandsArray) {
        console.log(`✔ Kirjauduttu sisään. Botti käynnissä.`)
        client.user?.setActivity("Development", { type: "PLAYING" });

        if (!process.env.DATABASE) return;
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`✔ Tietokantaan yhdistäminen onnistui.`);
        }).catch((error) => {
            console.log(`❌ Tietokantaan yhdistäminen epäonnistui.`);
        });
    }
}