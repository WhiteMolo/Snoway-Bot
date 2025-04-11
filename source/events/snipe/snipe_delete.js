import { RinBot } from "../../structures/client/index.js";
import Discord from "discord.js";

export default {
    name: "messageDelete",
    /**
     * @param {RinBot} client
     * @param {Discord.Message} message
     */
    run: async (client, message) => {
        if (!message.guild || message.bot || !message.author || !message.author.id) return;
        const channelId = message.channel.id;

        client.SnipeMsg.set(channelId, {
            content: message.content,
            author: message.author.id,
            timestamp: Date.now(),
        })
    }
};
