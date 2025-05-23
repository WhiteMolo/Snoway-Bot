import { useMainPlayer, useQueue } from "discord-player";
import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "pause",
    aliases: ["stop"],
    description: {
        fr: "Permet de couper la musique",
        en: "Mutes the music"
    },
    /**
     * @param {RinBot} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        try {
            const channel = message.member.voice.channel;
            if (!channel) return message.reply("> `❌` Erreur : Vous devez être dans un salon vocal");
            const queue = useQueue(message.guild.id);

            if (message.guild.members.me.voice.channelId !== channel.id)return message.reply({content: "> `❌` Erreur : Vous n'êtes pas dans ma vocal"})
            if (!queue || !queue.currentTrack) {
                return message.reply("Aucune musique n'est en lecture");
            }


            if (queue.node.isPaused()) {
                return message.reply("La musique est déjà en pause !");
            }

            queue.node.pause();
            return message.reply("Musique en pause !");
        } catch (error) {
            console.error('Erreur dans la commande pause :', error);
            message.reply('Une erreur s\'est produite.');
        }
    },
};
