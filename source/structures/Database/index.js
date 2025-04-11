import perm from "./guild.js";

export class Model {
    constructor(client, database) {
        this.client = client;
        this.db = database;
        this.start();
    }

    async start() {
        perm(this.client, this.db);
    }
}