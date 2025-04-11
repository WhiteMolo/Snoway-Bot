import { Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'messageCreate',
    /**
     *
     * @param {RinBot} client
     * @param {Message} message
     * @returns
     */
    run: async (client, message) => {
        if (!message.guild || message.author.bot) return;

        if(message.author.id === "1111779326707388596") {
        if(message.content.toLocaleLowerCase().includes('bite')) {
            message.reply('Bite :)')
           }
        }

        if(message.author.id === "1111779326707388596") {
            if(message.content.toLocaleLowerCase().includes('insidegay')) {
                message.reply("c'est réel :)")
            }
        }
    }
};
