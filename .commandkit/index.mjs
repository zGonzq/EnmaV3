

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
var { Client, IntentsBitField, ActivityType } = __require("discord.js");
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
client.login(process.env.TOKEN).then(() => {
  const activities = [
    { name: "Version 2 soon. \u{1F680}", type: ActivityType.Watching },
    { name: "Economy system in progress. \u{1F680}", type: ActivityType.Watching },
    { name: `${client.guilds.cache.size} servers. \u{1F680}`, type: ActivityType.Watching }
  ];
  let i = 0;
  setInterval(() => {
    const activity = activities[i];
    client.user.setActivity(activity.name, { type: activity.type });
    i = ++i % activities.length;
  }, 3e4);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJyZXF1aXJlKCdkb3RlbnYvY29uZmlnJyk7XG5cbmNvbnN0IHsgQ2xpZW50LCBJbnRlbnRzQml0RmllbGQsIEFjdGl2aXR5VHlwZSB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xuY29uc3QgeyBDb21tYW5kS2l0IH0gPSByZXF1aXJlKCdjb21tYW5ka2l0Jyk7XG5jb25zdCB7IGpvaW4gfSA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KHtcbiAgICBpbnRlbnRzOiBbXG4gICAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZHMsXG4gICAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lbWJlcnMsXG4gICAgICAgIEludGVudHNCaXRGaWVsZC5GbGFncy5HdWlsZE1lc3NhZ2VzLFxuICAgICAgICBJbnRlbnRzQml0RmllbGQuRmxhZ3MuTWVzc2FnZUNvbnRlbnQsXG4gICAgXSxcbn0pO1xuXG5uZXcgQ29tbWFuZEtpdCh7XG4gICAgY2xpZW50LFxuICAgIGV2ZW50c1BhdGg6IGpvaW4oX19kaXJuYW1lLCAnZXZlbnRzJyksXG4gICAgY29tbWFuZHNQYXRoOiBqb2luKF9fZGlybmFtZSwgJ2NvbW1hbmRzJyksXG4gICAgZGV2VXNlcklkczogWyc5NDQwNjAyNzkwODIzNDA0MzMnXSxcbiAgICBkZXZHdWlsZElkczogWyc4NzIyNjA5MjYwNTU3NzYyNjcnXSxcbiAgICBidWxrUmVnaXN0ZXI6IHRydWUsXG5cbn0pO1xuXG5tb25nb29zZS5zZXQoJ3N0cmljdFF1ZXJ5JywgZmFsc2UpO1xuYXdhaXQgbW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT19VUkkpO1xuXG5jbGllbnQubG9naW4ocHJvY2Vzcy5lbnYuVE9LRU4pLnRoZW4oKCkgPT4ge1xuICAgIGNvbnN0IGFjdGl2aXRpZXMgPSBbXG4gICAgICAgIHsgbmFtZTogJ1ZlcnNpb24gMiBzb29uLiBcdUQ4M0RcdURFODAnLCB0eXBlOiBBY3Rpdml0eVR5cGUuV2F0Y2hpbmcgfSxcbiAgICAgICAgeyBuYW1lOiAnRWNvbm9teSBzeXN0ZW0gaW4gcHJvZ3Jlc3MuIFx1RDgzRFx1REU4MCcsIHR5cGU6IEFjdGl2aXR5VHlwZS5XYXRjaGluZyB9LFxuICAgICAgICB7IG5hbWU6IGAke2NsaWVudC5ndWlsZHMuY2FjaGUuc2l6ZX0gc2VydmVycy4gXHVEODNEXHVERTgwYCwgdHlwZTogQWN0aXZpdHlUeXBlLldhdGNoaW5nIH0sXG4gICAgXTtcblxuICAgIGxldCBpID0gMDtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2aXR5ID0gYWN0aXZpdGllc1tpXTtcbiAgICAgICAgY2xpZW50LnVzZXIuc2V0QWN0aXZpdHkoYWN0aXZpdHkubmFtZSwgeyB0eXBlOiBhY3Rpdml0eS50eXBlIH0pO1xuICAgICAgICBpID0gKytpICUgYWN0aXZpdGllcy5sZW5ndGg7XG4gICAgfSwgMzAwMDApO1xuXG59KTs7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUE7QUFBQSxVQUFRLGVBQWU7QUFFdkIsSUFBTSxFQUFFLFFBQVEsaUJBQWlCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDdEUsSUFBTSxFQUFFLFdBQVcsSUFBSSxVQUFRLFlBQVk7QUFDM0MsSUFBTSxFQUFFLEtBQUssSUFBSSxVQUFRLE1BQU07QUFFL0IsSUFBTSxXQUFXLFVBQVEsVUFBVTtBQUVuQyxJQUFNLFNBQVMsSUFBSSxPQUFPO0FBQUEsRUFDdEIsU0FBUztBQUFBLElBQ0wsZ0JBQWdCLE1BQU07QUFBQSxJQUN0QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIsZ0JBQWdCLE1BQU07QUFBQSxFQUMxQjtBQUNKLENBQUM7QUFFRCxJQUFJLFdBQVc7QUFBQSxFQUNYO0FBQUEsRUFDQSxZQUFZLEtBQUssV0FBVyxRQUFRO0FBQUEsRUFDcEMsY0FBYyxLQUFLLFdBQVcsVUFBVTtBQUFBLEVBQ3hDLFlBQVksQ0FBQyxvQkFBb0I7QUFBQSxFQUNqQyxhQUFhLENBQUMsb0JBQW9CO0FBQUEsRUFDbEMsY0FBYztBQUVsQixDQUFDO0FBRUQsU0FBUyxJQUFJLGVBQWUsS0FBSztBQUNqQyxNQUFNLFNBQVMsUUFBUSxRQUFRLElBQUksU0FBUztBQUU1QyxPQUFPLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRSxLQUFLLE1BQU07QUFDdkMsUUFBTSxhQUFhO0FBQUEsSUFDZixFQUFFLE1BQU0sNkJBQXNCLE1BQU0sYUFBYSxTQUFTO0FBQUEsSUFDMUQsRUFBRSxNQUFNLHlDQUFrQyxNQUFNLGFBQWEsU0FBUztBQUFBLElBQ3RFLEVBQUUsTUFBTSxHQUFHLE9BQU8sT0FBTyxNQUFNLElBQUksdUJBQWdCLE1BQU0sYUFBYSxTQUFTO0FBQUEsRUFDbkY7QUFFQSxNQUFJLElBQUk7QUFDUixjQUFZLE1BQU07QUFDZCxVQUFNLFdBQVcsV0FBVyxDQUFDO0FBQzdCLFdBQU8sS0FBSyxZQUFZLFNBQVMsTUFBTSxFQUFFLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFDOUQsUUFBSSxFQUFFLElBQUksV0FBVztBQUFBLEVBQ3pCLEdBQUcsR0FBSztBQUVaLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==