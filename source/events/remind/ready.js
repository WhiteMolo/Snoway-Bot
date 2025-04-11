import { EmbedBuilder } from "discord.js";
import { RinBot } from "../../structures/client/index.js";
import ms from "../../structures/Utils/ms.js";

export default {
    name: "ready",
    /**
     * @param {RinBot} client
     */
    run: async (client) => {
        setInterval(() => { checkReminders(client); }, ms('10s'));
    }
};

async function checkReminders(client) {
    const db = await client.db.get(`reminders`);
    const color = parseInt(client.config.color.replace("#", ""), 16);
    if (Array.isArray(db)) {
        for (const reminder of db) {
            const now = Date.now();
            if (reminder.time <= now) {
                const user = client.users.cache.get(reminder.user);

                if (user) {
                    user.send({
                        content: null,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setFooter(client.footer)
                                .setDescription(`${await client.lang('remid.hello')} ${user}, ${await client.lang('remid.rappelle')} \`${reminder.reminder}\``)
                        ]
                    });
                }
                const updatedReminders = db.filter(r => r.id !== reminder.id);
                await client.db.set(`reminders`, updatedReminders);

            }
        }
    } else {
        return;
    }
}
