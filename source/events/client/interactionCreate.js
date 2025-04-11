import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'interactionCreate',
    /**
     *
     * @param {RinBot} client
     * @param {Discord.Interaction} interaction
     * @returns
     */
    run: async (client, interaction) => {
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const SlashCommands = client.slashCommands.get(interaction.commandName);
            if (!SlashCommands) return;
            try {
                await SlashCommands.run(client, interaction);

            } catch (error) {
                console.log(error);
            }
        }
    }
};