import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'randomuser',
    description: {
        fr: "Tire un membre du serveur au hasard",
        en: "Shoot a server member at random"
    },
    /**
     *
     * @param {RinBot} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {

        let guildId = message.guild.id;
        const guild = await client.guilds.fetch(guildId);
        const members = await guild.members.fetch();
        const randomMember = members.random();

        message.channel.send({ content: `${randomMember}` });
    }
};