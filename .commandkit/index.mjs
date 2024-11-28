

;await (async()=>{
  'use strict';
// --- CommandKit require() polyfill ---
  if (typeof require === "undefined") {
    const { createRequire } = await import("node:module");
    const __require = createRequire(import.meta.url);
    Object.defineProperty(globalThis, "require", {
      value: (id) => {
        return __require(id);
      },
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
// --- CommandKit require() polyfill ---


})();



import {
  __dirname,
  __require,
  init_esm_shims
} from "./chunk-M3OKE2XU.mjs";

// src/index.js
init_esm_shims();
__require("dotenv/config");
var { Client, IntentsBitField } = __require("discord.js");
var { CommandKit } = __require("commandkit");
var { join } = __require("path");
var mongoose = __require("mongoose");
var client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});
new CommandKit({
  client,
  eventsPath: join(__dirname, "events"),
  commandsPath: join(__dirname, "commands"),
  devUserIds: ["944060279082340433"],
  devGuildIds: ["872260926055776267"],
  bulkRegister: true
});
mongoose.set("strictQuery", false);
await mongoose.connect(process.env.MONGO_URI);
client.login(process.env.TOKEN);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJyZXF1aXJlKCdkb3RlbnYvY29uZmlnJyk7XG5cbmNvbnN0IHsgQ2xpZW50LCBJbnRlbnRzQml0RmllbGQgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcbmNvbnN0IHsgQ29tbWFuZEtpdCB9ID0gcmVxdWlyZSgnY29tbWFuZGtpdCcpO1xuY29uc3QgeyBqb2luIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcblxuY29uc3QgY2xpZW50ID0gbmV3IENsaWVudCh7XG4gICAgaW50ZW50czogW1xuICAgICAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRzLFxuICAgICAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRNZW1iZXJzLFxuICAgICAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuR3VpbGRNZXNzYWdlcyxcbiAgICAgICAgSW50ZW50c0JpdEZpZWxkLkZsYWdzLk1lc3NhZ2VDb250ZW50LFxuICAgIF0sXG59KTtcblxubmV3IENvbW1hbmRLaXQoe1xuICAgIGNsaWVudCxcbiAgICBldmVudHNQYXRoOiBqb2luKF9fZGlybmFtZSwgJ2V2ZW50cycpLFxuICAgIGNvbW1hbmRzUGF0aDogam9pbihfX2Rpcm5hbWUsICdjb21tYW5kcycpLFxuICAgIGRldlVzZXJJZHM6IFsnOTQ0MDYwMjc5MDgyMzQwNDMzJ10sXG4gICAgZGV2R3VpbGRJZHM6IFsnODcyMjYwOTI2MDU1Nzc2MjY3J10sXG4gICAgYnVsa1JlZ2lzdGVyOiB0cnVlLFxuXG59KTtcblxubW9uZ29vc2Uuc2V0KCdzdHJpY3RRdWVyeScsIGZhbHNlKTtcbmF3YWl0IG1vbmdvb3NlLmNvbm5lY3QocHJvY2Vzcy5lbnYuTU9OR09fVVJJKTtcblxuY2xpZW50LmxvZ2luKHByb2Nlc3MuZW52LlRPS0VOKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBLFVBQVEsZUFBZTtBQUV2QixJQUFNLEVBQUUsUUFBUSxnQkFBZ0IsSUFBSSxVQUFRLFlBQVk7QUFDeEQsSUFBTSxFQUFFLFdBQVcsSUFBSSxVQUFRLFlBQVk7QUFDM0MsSUFBTSxFQUFFLEtBQUssSUFBSSxVQUFRLE1BQU07QUFFL0IsSUFBTSxXQUFXLFVBQVEsVUFBVTtBQUVuQyxJQUFNLFNBQVMsSUFBSSxPQUFPO0FBQUEsRUFDdEIsU0FBUztBQUFBLElBQ0wsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxFQUMxQjtBQUNKLENBQUM7QUFFRCxJQUFJLFdBQVc7QUFBQSxFQUNYO0FBQUEsRUFDQSxZQUFZLEtBQUssV0FBVyxRQUFRO0FBQUEsRUFDcEMsY0FBYyxLQUFLLFdBQVcsVUFBVTtBQUFBLEVBQ3hDLFlBQVksQ0FBQyxvQkFBb0I7QUFBQSxFQUNqQyxhQUFhLENBQUMsb0JBQW9CO0FBQUEsRUFDbEMsY0FBYztBQUVsQixDQUFDO0FBRUQsU0FBUyxJQUFJLGVBQWUsS0FBSztBQUNqQyxNQUFNLFNBQVMsUUFBUSxRQUFRLElBQUksU0FBUztBQUU1QyxPQUFPLE1BQU0sUUFBUSxJQUFJLEtBQUs7IiwKICAibmFtZXMiOiBbXQp9Cg==