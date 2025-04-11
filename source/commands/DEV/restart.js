import { Message } from "discord.js";
import { RinBot } from "../../structures/client/index.js";
import { exec } from "child_process";


export default {
    name: "restart",
    description: "Redémarre le bot.",
    /**
     * @param {RinBot} client
     * @param {Message} message
     * @param {Array} args 
     */
    run: async (client, message, args) => {
        
        message.channel.send({ content: 'Redémarrage...' }).then(async () => {
            await client.db.set(`restartchannel`, message.channel.id);
            exec(`pm2 restart ${client.user.id}`, async (err, stdout, stderr) => {
                if (err.code === 1) {
                    return message.channel.send('Instance PM2 non existante...');
                }
                if (err) {
                    message.channel.send("Une erreur vient de se produire : \`\`\`js\n" + err.message + "\`\`\`");
                }
            });
        })
    }
};
