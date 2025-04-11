import { RinBot } from "../../structures/client/index.js";

export default {
    name: "ready",
    /**
     *
     * @param {RinBot} client
     */
    run: async (client) => {
       setInterval(async () => {
            const db = await client.db.get(`status`)
            const presenceOptions = {
                status: db?.status || 0,
                activities: [{
                    name: db?.name || "RinBot V" + client.version + " .gg/RinBot",
                    type: db?.type || 4,
                    url: "https://twitch.tv/oni145"

                }]
            };
            client.user.setPresence(presenceOptions)

        }, 5000)
    }
};
