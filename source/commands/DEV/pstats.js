import {  Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "pstats",
    description: "Affiche le nombre de prevname",
    /**
     * @param {RinBot} client 
     * @param {Message} message
     * @param {Array} args 
     */
    run: async (client, message, args) => {

        try {
            const response = await client.api.prevcount();
            const count = numm(response.count);
            message.channel.send({ content: `\`${count}\` prevnames dans la RinBot API !` })

        } catch (error) {
            console.error('Erreur:', error);
            message.reply('Une erreur s\'est produite.');
        }
    }
};

function numm(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
