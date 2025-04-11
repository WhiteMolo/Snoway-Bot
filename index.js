import { RinBot } from "./source/structures/client/index.js";
export const client = new RinBot()

process.on("uncaughtException", (e) => {
      if (e.code === 50013) return;
       if (e.code === 50001) return;
       if (e.code === 50035) return;
       if (e.code === 10062) return;
     
       console.log(e)
   })