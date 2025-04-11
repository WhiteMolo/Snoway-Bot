import ms from "../../structures/Utils/ms.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
    name: 'ready',
    /**
     * 
     * @param {RinBot} client
     */
    run: async (client) => {
        setInterval(async () => {
            const giveaways = await client.db.all();
            for (let giveaway of giveaways) {
                if (giveaway.id.startsWith('giveaway_')) {
                    const [, guildId, code] = giveaway.id.split('_');
                    giveaway = giveaway.value;
                    if (!giveaway.end && giveaway.endTime && Date.now() >= giveaway.endTime) {
                        const guild = client.guilds.cache.get(guildId);
                        const giveawayChannel = guild.channels.cache.get(giveaway.salon);
                        if (!giveawayChannel) return;

                        const participants = giveaway.participant;
                        const message = await giveawayChannel.messages.fetch(giveaway.messageId);

                        if (!message) return;

                        if (participants.length === 0) {
                            const embed = new EmbedBuilder(message.embeds[0]);
                            embed.setTitle('Giveaway Terminé');
                            embed.setDescription('Aucun participant. Le giveaway a été annulé.');

                            const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setEmoji(giveaway.emoji)
                                        .setCustomId('giveaway_entry_' + code)
                                        .setDisabled(true)
                                        .setStyle(1),
                                    new ButtonBuilder()
                                        .setLabel('Liste des participants')
                                        .setDisabled(true)
                                        .setCustomId('giveaway_list_' + code)
                                        .setStyle(2)
                                );

                            await message.edit({ embeds: [embed], components: [row] });
                            await message.reply("Aucun participant. Le giveaway a été annulé.");

                            giveaway.end = true;
                            await client.db.set(`giveaway_${guildId}_${code}`, giveaway);
                        } else {
                            const winners = [];
                            const remainingWinners = Math.min(giveaway.wins || 1, participants.length);
                            for (let i = 0; i < remainingWinners; i++) {
                                const winnerIndex = Math.floor(Math.random() * participants.length);
                                const winnerId = participants.splice(winnerIndex, 1)[0];
                                const winnerMember = await client.users.fetch(winnerId);
                                const memberGuild = guild.members.cache.get(winnerMember.id);
                                if (!giveaway.vocal || (giveaway.vocal && memberGuild.voice.channel)) {
                                    winners.push(`<@${winnerMember.id}>`);
                                }
                            }

                            const embed = new EmbedBuilder(message.embeds[0]);
                            if (winners.length === 0) {
                                embed.setTitle('Giveaway Terminé');
                                embed.setDescription("Aucune personne n'a respecté les conditions du giveaway");
                                const row = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(giveaway.emoji)
                                            .setCustomId('giveaway_entry_' + code)
                                            .setDisabled(true)
                                            .setStyle(1),
                                        new ButtonBuilder()
                                            .setLabel('Liste des participants')
                                            .setDisabled(true)
                                            .setCustomId('giveaway_list_' + code)
                                            .setStyle(2)
                                    );
                                await message.edit({ embeds: [embed], components: [row] });
                                await message.reply("Aucune personne n'a respecté les conditions du giveaway");
                            } else {
                                embed.setTitle('Giveaway Terminé');
                                embed.setDescription(`Félicitations ${winners.join(', ')} ! Vous avez gagné le ${giveaway.prix}`);
                                const row = new ActionRowBuilder()
                                    .addComponents(
                                        new ButtonBuilder()
                                            .setEmoji(giveaway.emoji)
                                            .setCustomId('giveaway_entry_' + code)
                                            .setDisabled(true)
                                            .setStyle(1),
                                        new ButtonBuilder()
                                            .setLabel('Liste des participants')
                                            .setDisabled(true)
                                            .setCustomId('giveaway_list_' + code)
                                            .setStyle(2)
                                    );
                                await message.edit({ embeds: [embed], components: [row] });
                                await message.reply(`Félicitations ${winners.join(', ')} ! Vous avez gagné le ${giveaway.prix}`);
                            }
                            giveaway.end = true;
                            await client.db.set(`giveaway_${guildId}_${code}`, giveaway);
                        }
                    }
                }
            }
        }, ms('1s'));
    }
};
