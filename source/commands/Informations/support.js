import { EmbedBuilder } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "support",
    aliases: ["RinBot"],
    description: {
        fr: "Invite sur le support du bot !",
        en: "Invite to the bot support!"
    },
    /**
     *
     * @param {RinBot} client
     * @param {RinBot} message
     * @param {RinBot} args
     * @returns
     */
    run: async (client, message, args) => {

        await message.channel.send({
            embeds: [new EmbedBuilder().setColor(client.color).setDescription(`[Clique ici pour rejoindre le support RinBot Bots](${client.support})`)]
        })
    }
};