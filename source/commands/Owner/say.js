import { RinBot } from "../../structures/client/index.js";
import Discord from "discord.js";

export default {
    name: 'say',
    usage: {
        fr: {
            'say <message>': "Envoie un message sous l'aparence du bot"
        }, en: {
            "say <message>": "Sends a message in the bot's guise",
        }
    },
    description: {
        fr: "Envoie un message sous l'aparence du bot",
        en: "Send a message as a bot",
    },
    /**
     *
     * @param {RinBot} client
     * @param {Discord.Message} message
     * @param {Discord.args} args
     */
    run: async (client, message, args) => {
        const tosay = args.join(" ");
        if (!tosay) return;
        message.delete();
        if (message.reference && message.reference.messageId) {
            const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
            if (message.guild.members.me.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
                repliedMessage.edit(tosay);
            } else {
                message.channel.send(tosay);
            }
        } else {
            message.channel.send(tosay);
        }



    }
};