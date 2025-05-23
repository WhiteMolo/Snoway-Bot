import { Presence } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'presenceUpdate',
    /**
     * @param {RinBot} client
     * @param {Presence} oldPresence
     * @param {Presence} newPresence
     * @returns
     */
    run: async (client, oldPresence, newPresence) => {
        const guildId = newPresence.guild.id;
        const db = await client.db.get(`soutien_${guildId}`) || {
            status: false,
            role: null,
            vanity: null
        };

        if (db.status && db.role) {
            const guild = client.guilds.cache.get(guildId);
            const member = guild.members.cache.get(newPresence.userId);
            const role = guild.roles.cache.get(db.role);

            if (newPresence.activities[0] && newPresence.activities[0].state?.includes(db.vanity) && role) {
                if (!member.roles.cache.has(role.id)) {
                    await member.roles.add(role).catch(() => {})
                }
            } else if (role) {
                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role).catch(() => {})
                }
            }
        }
    }
};
