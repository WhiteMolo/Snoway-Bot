import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'stats',
    description: {
        fr: "Affiche les statistiques du serveur",
        en: "Displays server statistics"
    },
    /**
     * 
     * @param {RinBot} client
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const members = await message.guild.members.fetch();
        const onlineMembers = members.filter(member => member.presence?.status !== 'offline');
        const voiceMembers = members.filter(member => member.voice.channel);
        const boosts = message.guild.premiumSubscriptionCount;

        const embed = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setThumbnail(message.guild.iconURL())
            .setTitle(message.guild.name + ' ➔ Statistiques')
            .setDescription(
                `Membres: **${members.size}**\n` +
                `En ligne: **${onlineMembers.size}**\n` +
                `En vocal: **${voiceMembers.size}**\n` +
                `Boosts: **${boosts}**`
            )

        message.channel.send({ embeds: [embed] });
    },
};
