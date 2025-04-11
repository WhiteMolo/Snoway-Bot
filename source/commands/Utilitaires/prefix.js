import { RinBot } from "../../structures/client/index.js";
import { Message } from "discord.js";

export default {
  name: 'prefix',
  description: {
    fr:'Change le prefix du bot sur le serveur',
    en: "Change the prefix of the bot on the server"
  },
  usage: {
    fr:{"prefix <préfixe>": 'Change le prefix du bot sur le serveur'},
    en: {"prefix <prefix>": 'Change the prefix of the bot on the server'}
  },
  /**
   * 
   * @param {RinBot} client
   * @param {Message} message
   * @param {string[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    const newPrefix = args[0];
    const exPrefix = await client.db.get(`prefix_${message.guild.id}`)
    if (!newPrefix) {
      return message.channel.send(await client.lang('prefix.noperfix'));
    }

    if(newPrefix === exPrefix) {
      return message.channel.send(await client.lang('prefix.invalide'));

    }
    
    await client.db.set(`prefix_${message.guild.id}`, newPrefix)

    return message.channel.send(`${await client.lang('prefix.set')} \`${newPrefix}\``);
  },
};