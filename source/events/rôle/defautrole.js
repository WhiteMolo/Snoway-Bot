import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: "guildMemberAdd",
    /**
     *
     * @param {RinBot} client
     *
     */
    run: async (client, member) => {
        if(!member)return;
        const db = await client.db.get(`defautrole_${member.guild.id}`) || { roles: [] };
        for (const roleId of db.roles) {
            const role = member.guild.roles.cache.get(roleId);
            if (role) {
                member.roles.add(role).catch(e => { });
            }
        }
    }
};