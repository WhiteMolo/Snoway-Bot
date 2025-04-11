import { Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "refreshconfig",
    description: "Rafraîchit la configuration du bot.",
    /**
     * @param {RinBot} client 
     * @param {Message} message
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        
        try {
            client.functions.bot.refreshConfig();
            message.channel.send({ content: 'Fichier config rechargé.' });
        } catch (error) {
            console.error('Erreur :', error);
            message.channel.send({ content: "Erreur." });
        }
    }
};
