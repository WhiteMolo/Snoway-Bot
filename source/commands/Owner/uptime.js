import { RinBot } from "../../structures/client/index.js";
import Discord from "discord.js";

export default {
    name: 'uptime',
    description: {
        fr: "Affiche depuis quand le bot est connecté",
        en: "Shows how long the bot has been connected"
    },
    /**
   * 
   * @param {RinBot} client 
   * @param {Discord.Message} message 
   * @param {RinBot} args 
   * @returns 
   */
    run: async (client, message, args) => {
        const uptime = `<t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R>`;
        message.reply({
            content: `${await client.lang('uptime')} ${uptime}`
        })
    },
};
