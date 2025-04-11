import { User } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'guildMemberAdd',
    /**
     * @param {RinBot} client
     * @param {User} member
     */
    run: async (client, member) => {
        const blacklist = await client.db.get('blacklist') || [];
        if (blacklist.some(entry => entry.userId === member.id)) {
            try {
                await member.ban({ reason: 'BLACKLIST' });
            } catch (error) {
                console.error(error);
            }
        }
    }
};