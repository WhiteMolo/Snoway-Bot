import { ActionRowBuilder, EmbedBuilder, Message, StringSelectMenuBuilder } from "discord.js";

import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'sethelp',
    description: {
        fr: 'Configurer le type de help affiché',
        en: "Configure the type of help displayed"
    },
    /**
     * 
     * @param {RinBot} client
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        const options = [
            { label: 'Onepage', value: 'onepage' },
            { label: 'Menu', value: 'normal' },
        ];

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder(await client.lang("sethelp.menu"))
            .addOptions(options);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle('SetHelp')
            .setDescription(await client.lang("sethelp.description"));

        const messageOptions = {
            content: null,
            embeds: [embed],
            components: [row]
        };

        const helpMessage = await message.channel.send(messageOptions);

        const filter = i => i.customId === 'select';
        const collector = helpMessage.createMessageComponentCollector({ filter });

        collector.on('collect', async i => {
            if(i.user.id !== message.author.id) {
                return i.reply({
                    content: await client.lang('interaction'),
                    flags: 64
                })
            }
            const selectedValue = i.values[0];
            await client.db.set("module-help", selectedValue)
            await i.update({ content: await client.lang("sethelp.set"), components: [], embeds: [] });
        });
    }
};
