import { QuickDB } from "quick.db";
import config from "../../../config/config.js";

const db = new QuickDB();

export default { owner, buyer };

export async function owner(userId) {
    const database = await db.get(`owner`) || []
    return database.includes(userId)
}

export async function buyer(userId) {
    return config.buyers.includes(userId)
}