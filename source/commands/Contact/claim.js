import { RinBot } from "../../structures/client/index.js";
import { Message } from "discord.js";

export default {
    name: 'claim',
    description: {
        fr: "Claim un ticket",
        en: "Claiming a ticket"
    },
    /**
     * @param {RinBot} client
     * @param {Message} message
     */
    run: async (client, message) => {
        const ticketuser = await client.db.get(`ticket_user_${message.guild.id}`) || [];
        const result = ticketuser.find(ticket => ticket.salon === message.channel.id);
        if (!result) return message.channel.send({ content: `\`❌\` Erreur : Ce salon n'est pas un de mes ticket` });
        if (result.author === message.author.id) return message.channel.send({ content: `\`❌\` Erreur : Vous ne pouvez pas claim votre propre ticket` });
        if (result.claim) return message.channel.send({ content: `\`❌\` Erreur : Le ticket a déjà été réclamé par <@${result.claim}>` });
        result.claim = message.author.id;

        await client.db.set(`ticket_user_${message.guild.id}`, ticketuser);
        return message.channel.send({
            content: `Le ticket a été pris en charge par <@${message.author.id}>`
        });
    },
};
