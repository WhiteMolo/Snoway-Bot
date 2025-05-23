import Discord from "discord.js";
import { RinBot } from "../../structures/client/index.js";
import ms from "../../structures/Utils/ms.js";


export default {
    name: "ready",
    /**
     *
     * @param {RinBot} client
     */
    run: async (client) => {
        setInterval(() => { 
        client.guilds.cache.forEach(async guild => {
            const color = await client.db.get(`color_${guild.id}`) || client.config.color;
            const channelID = await client.db.get(`pfp_${guild.id}`);

            if (!channelID) return;

            const channel = client.channels.cache.get(channelID);
            if (!channel) return;
            

            const guildObj = client.guilds.cache.get(guild.id);

            const memberArray = Array.from(guildObj.members.cache.values());
            
            const randomMember = memberArray[Math.floor(Math.random() * memberArray.length)];

            const avatarURL = randomMember.user.displayAvatarURL({ dynamic: true, size: 256 });
            const bannerURL = randomMember.user.bannerURL({ dynamic: true, size: 256 }) || randomMember.user.displayAvatarURL({ dynamic: true, size: 256 }) ;

            const randomImageURL = Math.random() < 0.5 ? avatarURL : bannerURL;

            const embed = new Discord.EmbedBuilder()
                .setColor(color)
                .setDescription(`[${randomMember.user.discriminator !== 0 ? randomMember.user.tag : randomMember.user.username}](https://discord://-/users/${randomMember.user.id})`)
                .setImage(randomImageURL)
                .setFooter(client.footer);

            channel.send({ embeds: [embed] });
        });
    }, ms('10s'))
    }
};
