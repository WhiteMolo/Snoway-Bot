import fetch from "node-fetch";
import Zip from "adm-zip";
import { RinBot } from "../../structures/client/index.js";
import Discord from "discord.js";
import ms from "../../structures/Utils/ms.js";

export default {
    name: 'zipemoji',
    aliases: ["emojizip", "emojitozip"],
    description: {
        fr: "Crée un Zip des emojis d'un discord",
        en: 'Create a Zip of discord emojis'
    },
    /**
     * 
     * @param {RinBot} client
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        try {
            let guildd = client.guilds.cache.get(args[0]) || message.guild;
            if (!guildd) return message.reply(`Aucun serveur trouvé !`);

            const emojis = [...guildd.emojis.cache.values()];
            if (!emojis.length) return message.reply('Aucun emojis trouvé...');

            const msg = await message.reply('Merci de patienter !');
            const chan = msg.channel;
            const zip = new Zip();
            let i = 0;
            const totalEmojis = emojis.length;

            for (const emoji of emojis) {
                const buffer = await fetch(emoji.url).then(res => res.arrayBuffer());
                zip.addFile(`${emoji.name}.${emoji.animated ? 'gif' : 'png'}`, Buffer.from(buffer));
                i++;
                const progress = Math.round((i / totalEmojis) * 100);
                await msg.edit(`[\`${progress}%\`] Emoji${totalEmojis > 0 ? "s" : ""} ${i}/${totalEmojis} `);
            }

            await msg.edit({
                content: null,
                files: [{ attachment: zip.toBuffer(), name: `RinBot_${guildd.id}.zip` }]
            });
        } catch (err) {
            console.error(err);
        }
    }
};
