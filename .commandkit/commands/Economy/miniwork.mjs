import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/miniwork.js
var require_miniwork = __commonJS({
  "src/commands/Economy/miniwork.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("miniwork").setDescription("Trabaja por un corto per\xEDodo para ganar algunas monedas."),
      /**
      * @param {import('commandkit').SlashCommandProps} param0
      */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        let data = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        if (!data) {
          data = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id
          });
          await data.save();
        }
        const lastMiniwork = data.lastMiniwork;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastMiniwork;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 5) {
          const minutesLeft = 5 - diffMinutes;
          return interaction.reply({ embeds: [embed.setTitle("Trabajo peque\xF1o").setDescription(`Ya has trabajado recientemente. Puedes trabajar de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        data.lastMiniwork = now;
        const earned = Math.floor(Math.random() * 50) + 5;
        data.balance += earned;
        await data.save();
        interaction.reply({ embeds: [embed.setTitle("Trabajo peque\xF1o").setDescription(`Has trabajado y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Green")] });
      }
    };
  }
});
export default require_miniwork();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvbWluaXdvcmsuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2xhc2hDb21tYW5kQnVpbGRlciwgRW1iZWRCdWlsZGVyIH0gPSByZXF1aXJlKCdkaXNjb3JkLmpzJyk7XHJcbmNvbnN0IGVjb25vbXkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvZWNvbm9teScpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gICAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgICAgIC5zZXROYW1lKCdtaW5pd29yaycpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdUcmFiYWphIHBvciB1biBjb3J0byBwZXJcdTAwRURvZG8gcGFyYSBnYW5hciBhbGd1bmFzIG1vbmVkYXMuJyksXHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICAqL1xyXG4gICAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuICAgICAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcclxuICAgICAgICBpZiAoIWludGVyYWN0aW9uLmd1aWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGVjb25vbXkuZmluZE9uZSh7IHVzZXJJZDogaW50ZXJhY3Rpb24udXNlci5pZCwgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IGVjb25vbXkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RNaW5pd29yayA9IGRhdGEubGFzdE1pbml3b3JrO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IG5vdyAtIGxhc3RNaW5pd29yaztcclxuICAgICAgICBjb25zdCBkaWZmTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCk7XHJcblxyXG4gICAgICAgIGlmIChkaWZmTWludXRlcyA8IDUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlc0xlZnQgPSA1IC0gZGlmZk1pbnV0ZXM7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdUcmFiYWpvIHBlcXVlXHUwMEYxbycpLnNldERlc2NyaXB0aW9uKGBZYSBoYXMgdHJhYmFqYWRvIHJlY2llbnRlbWVudGUuIFB1ZWRlcyB0cmFiYWphciBkZSBudWV2byBlbiAke21pbnV0ZXNMZWZ0fSBtaW51dG9zLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhLmxhc3RNaW5pd29yayA9IG5vdztcclxuICAgICAgICBjb25zdCBlYXJuZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MCkgKyA1O1xyXG4gICAgICAgIGRhdGEuYmFsYW5jZSArPSBlYXJuZWQ7XHJcbiAgICAgICAgYXdhaXQgZGF0YS5zYXZlKCk7XHJcblxyXG4gICAgICAgIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1RyYWJham8gcGVxdWVcdTAwRjFvJykuc2V0RGVzY3JpcHRpb24oYEhhcyB0cmFiYWphZG8geSBnYW5hZG8gJHtlYXJuZWR9IG1vbmVkYXMuIEFob3JhIHRpZW5lcyAke2RhdGEuYmFsYW5jZX0gbW9uZWRhcy5gKS5zZXRDb2xvcignR3JlZW4nKV0gfSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sVUFBVTtBQUNoQixXQUFPLFVBQVU7QUFBQTtBQUFBLE1BRWIsTUFBTSxJQUFJLG9CQUFvQixFQUN6QixRQUFRLFVBQVUsRUFDbEIsZUFBZSw2REFBMEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUk5RSxLQUFLLE9BQU8sRUFBRSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBQzdDLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDL0IsWUFBSSxDQUFDLFlBQVksT0FBTztBQUNwQixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHFEQUFrRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ25JO0FBRUEsWUFBSSxPQUFPLE1BQU0sUUFBUSxRQUFRLEVBQUUsUUFBUSxZQUFZLEtBQUssSUFBSSxTQUFTLFlBQVksTUFBTSxHQUFHLENBQUM7QUFFL0YsWUFBSSxDQUFDLE1BQU07QUFDUCxpQkFBTyxJQUFJLFFBQVE7QUFBQSxZQUNmLFFBQVEsWUFBWSxLQUFLO0FBQUEsWUFDekIsU0FBUyxZQUFZLE1BQU07QUFBQSxVQUMvQixDQUFDO0FBQ0QsZ0JBQU0sS0FBSyxLQUFLO0FBQUEsUUFDcEI7QUFFQSxjQUFNLGVBQWUsS0FBSztBQUMxQixjQUFNLE1BQU0sb0JBQUksS0FBSztBQUNyQixjQUFNLE9BQU8sTUFBTTtBQUNuQixjQUFNLGNBQWMsS0FBSyxNQUFNLE9BQU8sTUFBTyxFQUFFO0FBRS9DLFlBQUksY0FBYyxHQUFHO0FBQ2pCLGdCQUFNLGNBQWMsSUFBSTtBQUN4QixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxTQUFTLG9CQUFpQixFQUFFLGVBQWUsK0RBQStELFdBQVcsV0FBVyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ2xNO0FBRUEsYUFBSyxlQUFlO0FBQ3BCLGNBQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksRUFBRSxJQUFJO0FBQ2hELGFBQUssV0FBVztBQUNoQixjQUFNLEtBQUssS0FBSztBQUVoQixvQkFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sU0FBUyxvQkFBaUIsRUFBRSxlQUFlLDBCQUEwQixNQUFNLDBCQUEwQixLQUFLLE9BQU8sV0FBVyxFQUFFLFNBQVMsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUFBLE1BQ3pMO0FBQUEsSUFDSjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==