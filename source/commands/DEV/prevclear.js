import { Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "prevclear",
    description: "Supp les prevnames d'un id",
    /**
     * @param {RinBot} client 
     * @param {Message} message
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        const id = args[0];
        if (!id) {
            return message.reply('Veuillez spécifier un ID.');
        }
        try {
            const response = await client.api.prevclear(id);
            const count = response.num;
            message.channel.send({ content: `J'ai supprimé \`${count.toString()}\` prevname !` })

        } catch (error) {
            console.error('Erreur:', error);
            message.reply('Une erreur s\'est produite.');
        }
    }
};
