import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
  name: 'ping',
  description: "Affiche la latence du bot",
  description_localizations: {
    "fr": "Affiche la latence du bot",
    "en-US": "Displays bot latency"
},
  type: "1",
  /**
   *
   * @param {RinBot} client
   * @param {Discord.Interaction} interaction
   */
  run: async (client, interaction) => {
    const start = Date.now()
    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({ content: "ping..." });
    const fin = Date.now()
    const time = fin - start
    interaction.editReply({ content: `API: **${client.ws.ping}ms**\nBot: **${time}ms**` });
  }
};