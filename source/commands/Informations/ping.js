import { EmbedBuilder } from "discord.js";
import { RinBot } from "../../structures/client/index.js";

export default {
  name: 'ping',
  aliases: ['latency', "latence", "ms"],
  description: {
    fr: "Affiche la latence du bot",
    en: "Displays bot latency"
  },
  /**
   *
   * @param {RinBot} client
   * @param {RinBot} message
   * @param {RinBot} args
   */
      run: async(client, message, args) => {

    message.channel.send({content: await client.lang('ping.ping') +` **${client.ws.ping}ms**` });
  }
};
