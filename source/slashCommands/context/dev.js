import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "Développeurs RinBot",
    type: "2",
    /**
     * @param {RinBot} client
     * @param {Discord.Interaction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });
        const targetId = interaction.targetId;
        const user = client.users.cache.get(targetId);
        const isDev = client.dev.includes(targetId);
        return interaction.editReply({
            content: isDev ? `${user.username} est bien un développeur de RinBot.` : `${user.username} n'est pas un développeur de RinBot.`
        });
    }
};
