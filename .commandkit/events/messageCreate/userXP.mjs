import {
  require_levels
} from "../../chunk-AH3CPMZU.mjs";
import {
  require_calc
} from "../../chunk-SRREMYUL.mjs";
import {
  __commonJS,
  __name,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/events/messageCreate/userXP.js
var require_userXP = __commonJS({
  "src/events/messageCreate/userXP.js"(exports, module) {
    init_esm_shims();
    var { Message, EmbedBuilder } = __require("discord.js");
    var Level = require_levels();
    var calc = require_calc();
    var cooldowns = /* @__PURE__ */ new Set();
    function getXpRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    __name(getXpRandom, "getXpRandom");
    module.exports = async (client, message) => {
      const embed = new EmbedBuilder();
      if (!message.inGuild || message.author.bot || cooldowns.has(message.author.id))
        return;
      const xp = getXpRandom(5, 20);
      const query = {
        guildId: message.guild.id,
        userId: message.author.id
      };
      try {
        const level = await Level.findOne(query);
        if (level) {
          level.xp += xp;
          if (level.xp > calc(level.level)) {
            level.xp = 0;
            level.level += 1;
            message.channel.send({ embeds: [embed.setTitle("\xA1Haz subido de nivel! \u{1F388}").setDescription(`Felicidades ${message.author} has subido de nivel a ${level.level}`).setColor("Random")] });
          }
          await level.save().catch((err) => console.log(`Error al guardar el nuevo nivel: ${err}`));
          cooldowns.add(message.author.id);
          setTimeout(() => {
            cooldowns.delete(message.author.id);
          }, 5e3);
        }
        if (!level) {
          const newLevel = new Level({
            guildId: message.guild.id,
            userId: message.author.id,
            xp,
            level: 0
          });
          await newLevel.save().catch((err) => console.log(`Error al guardar el nuevo nivel: ${err}`));
          cooldowns.add(message.author.id);
          setTimeout(() => {
            cooldowns.delete(message.author.id);
          }, 5e3);
        }
      } catch (error) {
        console.log("Error al ingresar la xp: " + error);
      }
    };
  }
});
export default require_userXP();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2V2ZW50cy9tZXNzYWdlQ3JlYXRlL3VzZXJYUC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBNZXNzYWdlLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgTGV2ZWwgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvbGV2ZWxzJyk7XHJcbmNvbnN0IGNhbGMgPSByZXF1aXJlKCcuLi8uLi91dGlscy9jYWxjJyk7XHJcbmNvbnN0IGNvb2xkb3ducyA9IG5ldyBTZXQoKTtcclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFhwUmFuZG9tKG1pbiwgbWF4KSB7XHJcbiAgICBtaW4gPSBNYXRoLmNlaWwobWluKTtcclxuICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcbi8qKiBcclxuICogQHBhcmFtIHtpbXBvcnQoJ2Rpc2NvcmQuanMnKS5DbGllbnR9IGNsaWVudCBcclxuICogQHBhcmFtIHtNZXNzYWdlfSBtZXNzYWdlIFxyXG4gKiBcclxuICogKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKGNsaWVudCwgbWVzc2FnZSkgPT4ge1xyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuXHJcbiAgICBpZighbWVzc2FnZS5pbkd1aWxkIHx8IG1lc3NhZ2UuYXV0aG9yLmJvdCAgfHwgY29vbGRvd25zLmhhcyhtZXNzYWdlLmF1dGhvci5pZCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB4cCA9IGdldFhwUmFuZG9tKDUsIDIwKTtcclxuXHJcbiAgICBjb25zdCBxdWVyeSA9IHtcclxuICAgICAgICBndWlsZElkOiBtZXNzYWdlLmd1aWxkLmlkLCAgXHJcbiAgICAgICAgdXNlcklkOiBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gYXdhaXQgTGV2ZWwuZmluZE9uZShxdWVyeSk7XHJcblxyXG4gICAgICAgIGlmKGxldmVsKXtcclxuICAgICAgICAgICAgbGV2ZWwueHAgKz0geHA7XHJcblxyXG4gICAgICAgICAgICBpZiAobGV2ZWwueHAgPiBjYWxjKGxldmVsLmxldmVsKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwueHAgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwubGV2ZWwgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKFwiXHUwMEExSGF6IHN1YmlkbyBkZSBuaXZlbCEgXHVEODNDXHVERjg4XCIpLnNldERlc2NyaXB0aW9uKGBGZWxpY2lkYWRlcyAke21lc3NhZ2UuYXV0aG9yfSBoYXMgc3ViaWRvIGRlIG5pdmVsIGEgJHtsZXZlbC5sZXZlbH1gKS5zZXRDb2xvcihcIlJhbmRvbVwiKV0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgbGV2ZWwuc2F2ZSgpLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGBFcnJvciBhbCBndWFyZGFyIGVsIG51ZXZvIG5pdmVsOiAke2Vycn1gKSk7XHJcblxyXG4gICAgICAgICAgICBjb29sZG93bnMuYWRkKG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb29sZG93bnMuZGVsZXRlKG1lc3NhZ2UuYXV0aG9yLmlkKTtcclxuICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighbGV2ZWwpe1xyXG4gICAgICAgICAgICBjb25zdCBuZXdMZXZlbCA9IG5ldyBMZXZlbCh7XHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBtZXNzYWdlLmd1aWxkLmlkLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBtZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgICAgICAgICAgIHhwOiB4cCxcclxuICAgICAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IG5ld0xldmVsLnNhdmUoKS5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhgRXJyb3IgYWwgZ3VhcmRhciBlbCBudWV2byBuaXZlbDogJHtlcnJ9YCkpO1xyXG5cclxuICAgICAgICAgICAgY29vbGRvd25zLmFkZChtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29vbGRvd25zLmRlbGV0ZShtZXNzYWdlLmF1dGhvci5pZCk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgYWwgaW5ncmVzYXIgbGEgeHA6IFwiK2Vycm9yKTtcclxuICAgICAgICBcclxuICAgIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUsU0FBUyxhQUFhLElBQUksVUFBUSxZQUFZO0FBQ3RELFFBQU0sUUFBUTtBQUNkLFFBQU0sT0FBTztBQUNiLFFBQU0sWUFBWSxvQkFBSSxJQUFJO0FBSzFCLGFBQVMsWUFBWSxLQUFLLEtBQUs7QUFDM0IsWUFBTSxLQUFLLEtBQUssR0FBRztBQUNuQixZQUFNLEtBQUssTUFBTSxHQUFHO0FBQ3BCLGFBQU8sS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLLE1BQU0sTUFBTSxFQUFFLElBQUk7QUFBQSxJQUN6RDtBQUpTO0FBV1QsV0FBTyxVQUFVLE9BQU8sUUFBUSxZQUFZO0FBQ3hDLFlBQU0sUUFBUSxJQUFJLGFBQWE7QUFFL0IsVUFBRyxDQUFDLFFBQVEsV0FBVyxRQUFRLE9BQU8sT0FBUSxVQUFVLElBQUksUUFBUSxPQUFPLEVBQUU7QUFBRztBQUVoRixZQUFNLEtBQUssWUFBWSxHQUFHLEVBQUU7QUFFNUIsWUFBTSxRQUFRO0FBQUEsUUFDVixTQUFTLFFBQVEsTUFBTTtBQUFBLFFBQ3ZCLFFBQVEsUUFBUSxPQUFPO0FBQUEsTUFDM0I7QUFFQSxVQUFJO0FBQ0EsY0FBTSxRQUFRLE1BQU0sTUFBTSxRQUFRLEtBQUs7QUFFdkMsWUFBRyxPQUFNO0FBQ0wsZ0JBQU0sTUFBTTtBQUVaLGNBQUksTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLLEdBQUc7QUFDOUIsa0JBQU0sS0FBSztBQUNYLGtCQUFNLFNBQVM7QUFFZixvQkFBUSxRQUFRLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxTQUFTLG9DQUEwQixFQUFFLGVBQWUsZUFBZSxRQUFRLE1BQU0sMEJBQTBCLE1BQU0sS0FBSyxFQUFFLEVBQUUsU0FBUyxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQUEsVUFDekw7QUFDQSxnQkFBTSxNQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxRQUFRLElBQUksb0NBQW9DLEdBQUcsRUFBRSxDQUFDO0FBRXhGLG9CQUFVLElBQUksUUFBUSxPQUFPLEVBQUU7QUFDL0IscUJBQVcsTUFBTTtBQUNiLHNCQUFVLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFBQSxVQUN0QyxHQUFHLEdBQUk7QUFBQSxRQUNYO0FBRUEsWUFBRyxDQUFDLE9BQU07QUFDTixnQkFBTSxXQUFXLElBQUksTUFBTTtBQUFBLFlBQ3ZCLFNBQVMsUUFBUSxNQUFNO0FBQUEsWUFDdkIsUUFBUSxRQUFRLE9BQU87QUFBQSxZQUN2QjtBQUFBLFlBQ0EsT0FBTztBQUFBLFVBQ1gsQ0FBQztBQUVELGdCQUFNLFNBQVMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLFFBQVEsSUFBSSxvQ0FBb0MsR0FBRyxFQUFFLENBQUM7QUFFM0Ysb0JBQVUsSUFBSSxRQUFRLE9BQU8sRUFBRTtBQUMvQixxQkFBVyxNQUFNO0FBQ2Isc0JBQVUsT0FBTyxRQUFRLE9BQU8sRUFBRTtBQUFBLFVBQ3RDLEdBQUcsR0FBSTtBQUFBLFFBQ1g7QUFBQSxNQUVKLFNBQVMsT0FBTztBQUNaLGdCQUFRLElBQUksOEJBQTRCLEtBQUs7QUFBQSxNQUVqRDtBQUFBLElBQ0o7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=