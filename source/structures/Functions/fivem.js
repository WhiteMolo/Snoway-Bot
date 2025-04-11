import { QuickDB } from "quick.db";
import FiveM from "fivem";

const db = new QuickDB();

export async function getStatus() {
    const ipserv = await getServerdb();

    try {
        const srv = new FiveM.Server(ipserv);
        const data = await srv.getServerStatus();
        return data.online;
    } catch (error) {
        console.error("Erreur:", error);
        return false; 
    }
}

export async function getPlayerMax() {
    const ipserv = await getServerdb();
    try {
        const srv = new FiveM.Server(ipserv);
        const data = await srv.getMaxPlayers();
        return {
            max: data
        };
    } catch (error) {
        if(error.message === "Error: Please provide an IP.") {
            return {
                max: "Impossible à récupérer"
            };   
        }
    }
}

export async function getAllPlayer() {
    const ipserv = await getServerdb();

    try {
        const srv = new FiveM.Server(ipserv);
        console.log(await srv.getPlayersAll())
        const data = await srv.getPlayersAll();
        return {
            serv: data
        };
    } catch (error) {
        if(error.message === "Error: Please provide an IP.") {
            return {
                serv: "Impossible à récupérer"
            };   
        }
    }
}

export async function getServerdb() {
    const dbs = await db.get(`fivemip`);
    if (dbs) return ''; 

    const { ip, port } = dbs;
    return `${ip}:${port}`;
}