import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'ratio',
    description: {
        fr: "Ratio un membre",
        en: "Single member ratio"
    },
    /**
     *
     * @param {RinBot} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {

       message.react('✅')
       message.react('❌')
    }
};