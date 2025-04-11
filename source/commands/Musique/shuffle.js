import { useQueue } from "discord-player";
import { EmbedBuilder, Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "shuffle",
    description: {
        fr: "Mélangez la file d'attente actuelle !",
        en: "Shuffle the current queue!"
    },
    /**
     * @param {RinBot} client
     * @param {Message} message
     */

    run: async (client, message) => {
        const queue = useQueue(message.guild.id);
        if (!queue || !queue.currentTrack) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setFooter(client.footer)
                .setDescription("Il n'y a pas de musique en cours de lecture");
            return message.reply({ embeds: [embed] });
        }

        queue.tracks.shuffle()

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setFooter(client.footer)
            .setDescription("je viens de shuffle la queue !");
        return message.reply({ embeds: [embed] });
    }
};
