import { Client, Collection, Routes } from "discord.js";
import fs, { readdirSync } from "fs";
import version from "../../../version.js";
import { REST } from "@discordjs/rest";
import { Player } from "discord-player";
import { DefaultWebSocketManagerOptions } from "@discordjs/ws";
import Functions from "../Functions/index.js";
import Utils from "../Utils/index.js";
import config0 from "../../../config/config.js";
import { Model as Database } from "../Database/index.js";
import { QuickDB } from "quick.db";
import { DefaultExtractors } from "@discord-player/extractor";


const db = new QuickDB();

DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord Android";

export class RinBot extends Client {
    constructor(
        options = {
            intents: [3276799],
            partials: [
                1, 2, 5, 3,
                4, 6, 0
            ],
        }
    ) {
        super(options);
        this.setMaxListeners(0);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.slashCommands = new Collection()
        this.context = new Collection()
        this.invites = new Map();
        this.vanityURL = new Map()
        this.SnipeMsg = new Map();
        this.SnipeMention = new Map();
        this.SnipeEdit = new Map();
        this.player = new Player(this);
        this.player.extractors.loadMulti(DefaultExtractors);

        this.functions = Functions
        this.utils = Utils
        this.config = config0;

        this.support = 'https://discord.gg/RinBot'
        this.footer = { text: "RinBot V3 by Sown & Inside" }
        this.dev = ["798973949189947459", "233657223190937601"],
            this.version = version;
        this.db = db
        this.api = this.functions.api

        this.CommandLoad();
        this.EventLoad();
        this.connect()
        this.slashEvent()

        this.lang = async function (key, guildId) {
            return new Promise(async (resolve, reject) => {
                const guildConfig = await this.db.get(`langue`);
                const langCode = guildConfig || "fr";
                const langFilePath = `../../../langue/${langCode}.json`;
                const keys = key.split(".");
                let text;

                let errorMessage;
                switch (langCode) {
                    case "en":
                        errorMessage = "No translation for this text";
                        break;
                    default:
                        errorMessage = "Aucune traduction pour ce texte";
                }

                try {
                    text = import(langFilePath);
                } catch (error) {

                    console.error(
                        `Impossible de charger le fichier de langue pour la langue "${langCode}" : ${error.message}`
                    );

                    return resolve(errorMessage);
                }

                for (const key of keys) {
                    text = text[key];
                    if (!text) {
                        console.error(
                            `Impossible de trouver une traduction pour "${key}", langue : ${langCode}`
                        );
                        return resolve(errorMessage);
                    }
                }

                return resolve(text);
            });
        }
    }

    connect() {
        return super.login(this.config.token)
            .catch(console.log)
            .then(() => {
                this.database = new Database(this, db);
            })
    };


    async slashEvent() {
        const data = [];
        for (const dir of readdirSync("./source/slashCommands/")) {
            let slashCommandFile = readdirSync(`./source/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

            for (const file of slashCommandFile) {
                let slashCommand = import(`../../slashCommands/${dir}/${file}`);

                this.slashCommands.set(slashCommand.name, slashCommand);

                data.push({
                    name: slashCommand.name,
                    description: slashCommand.description ? slashCommand.description : null,
                    description_localizations: slashCommand.description_localizations ? slashCommand.description_localizations : null,
                    type: slashCommand.type,
                    options: slashCommand.options ? slashCommand.options : null,
                });
            }
        }

        const rest = new REST({ version: '10' }).setToken(this.config.token);

        try {
            await rest.put(Routes.applicationCommands(this.config.botId), { body: data });
        } catch (error) {
            console.error(error);
        }
    }


    CommandLoad() {
        const subFolders = fs.readdirSync("./source/commands");
        let finale = new Collection();
        for (const category of subFolders) {
            const commandsFiles = fs
                .readdirSync(`./source/commands/${category}`)
                .filter((file) => file.endsWith(".js"));

            for (const commandFile of commandsFiles) {
                const command = import(`../../commands/${category}/${commandFile}`);
                command.category = category;
                command.commandFile = commandFile;

                console.log(`Commande chargée : ${command.name}`);
                if (!finale.has(command.name)) {
                    finale.set(command.name, command);
                }

                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach((alias) => {
                        if (!finale.has(alias)) {
                            finale.set(alias, command);
                        }
                    });
                }
            }
        }
        this.commands = finale;
    }


    EventLoad() {
        const subFolders = fs.readdirSync('./source/events');

        for (const category of subFolders) {
            const eventsFiles = fs
                .readdirSync(`./source/events/${category}`)
                .filter((file) => file.endsWith('.js'));

            for (const eventFile of eventsFiles) {
                const event = import(`../../events/${category}/${eventFile}`);
                const eventHandler = (...args) => event.run(this, ...args);
                this.on(event.name, eventHandler);
                if (category === 'anticrash') {
                    process.on(event.name, eventHandler);
                }

                console.log(`EVENT chargé : ${eventFile}`);
            }
        }
    }

};
