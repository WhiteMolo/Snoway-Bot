import { EmbedBuilder } from "discord.js";

import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'messagelog',
    aliases: ["messageslogs", "msglog", "logsmsg"],
    description: {
        fr: "Permet de définir un channel pour les logs de message",
        en: "Allows setting a channel for message logs"
    },
    /**
     *
     * @param {RinBot} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply("Veuillez mentionner un channel pour les logs message");
        }
        
        const channelId = args[0].replace(/[<#>|]/g, '');
        
        const channel = client.channels.cache.get(channelId);

        if (!channel) {
            return message.reply("Erreur: Channel invalide !");
        }
        
        const logs = await client.db.get(`logs_${message.guild.id}`) || [
            { roles: null },
            { voice: null },
            { message: null },
            { mod: null },
            { raid: null },
            { channel: null },
            { boost: null },
            { flux: null }
        ];
        
        logs.find(obj => obj.hasOwnProperty('message')).message = channel.id;
        await client.db.set(`logs_${message.guild.id}`, logs);
        
        return message.reply(`Les logs de message ont été définis sur <#${channel.id}>`);
    },
};
