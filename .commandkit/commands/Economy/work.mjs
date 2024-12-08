import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/work.js
var require_work = __commonJS({
  "src/commands/Economy/work.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("work").setDescription("Trabaja para ganar monedas."),
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
        const lastWork = data.lastWork;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastWork;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 30) {
          const minutesLeft = 30 - diffMinutes;
          return interaction.reply({ embeds: [embed.setTitle("Trabajo").setDescription(`Ya has trabajado recientemente. Puedes trabajar de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        data.lastWork = now;
        const earned = Math.floor(Math.random() * 201) + 100;
        data.balance += earned;
        await data.save();
        interaction.reply({ embeds: [embed.setTitle("Trabajo").setDescription(`Has trabajado y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Green")] });
      }
    };
  }
});
export default require_work();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvd29yay5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgZWNvbm9teSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9lY29ub215Jyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAgICAgLnNldE5hbWUoJ3dvcmsnKVxyXG4gICAgICAgIC5zZXREZXNjcmlwdGlvbignVHJhYmFqYSBwYXJhIGdhbmFyIG1vbmVkYXMuJyksXHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICAqL1xyXG4gICAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuICAgICAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcclxuICAgICAgICBpZiAoIWludGVyYWN0aW9uLmd1aWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGVjb25vbXkuZmluZE9uZSh7IHVzZXJJZDogaW50ZXJhY3Rpb24udXNlci5pZCwgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IGVjb25vbXkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RXb3JrID0gZGF0YS5sYXN0V29yaztcclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0V29yaztcclxuICAgICAgICBjb25zdCBkaWZmTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCk7XHJcblxyXG4gICAgICAgIGlmIChkaWZmTWludXRlcyA8IDMwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXNMZWZ0ID0gMzAgLSBkaWZmTWludXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1RyYWJham8nKS5zZXREZXNjcmlwdGlvbihgWWEgaGFzIHRyYWJhamFkbyByZWNpZW50ZW1lbnRlLiBQdWVkZXMgdHJhYmFqYXIgZGUgbnVldm8gZW4gJHttaW51dGVzTGVmdH0gbWludXRvcy5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5sYXN0V29yayA9IG5vdztcclxuICAgICAgICBjb25zdCBlYXJuZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMDEpICsgMTAwO1xyXG4gICAgICAgIGRhdGEuYmFsYW5jZSArPSBlYXJuZWQ7XHJcbiAgICAgICAgYXdhaXQgZGF0YS5zYXZlKCk7XHJcblxyXG4gICAgICAgIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1RyYWJham8nKS5zZXREZXNjcmlwdGlvbihgSGFzIHRyYWJhamFkbyB5IGdhbmFkbyAke2Vhcm5lZH0gbW9uZWRhcy4gQWhvcmEgdGllbmVzICR7ZGF0YS5iYWxhbmNlfSBtb25lZGFzLmApLnNldENvbG9yKCdHcmVlbicpXSB9KTtcclxuICAgIFxyXG4gICAgfSxcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU0sRUFBRSxxQkFBcUIsYUFBYSxJQUFJLFVBQVEsWUFBWTtBQUNsRSxRQUFNLFVBQVU7QUFDaEIsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUViLE1BQU0sSUFBSSxvQkFBb0IsRUFDekIsUUFBUSxNQUFNLEVBQ2QsZUFBZSw2QkFBNkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlqRCxLQUFLLE9BQU8sRUFBRSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBQzdDLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDL0IsWUFBSSxDQUFDLFlBQVksT0FBTztBQUNwQixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHFEQUFrRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ25JO0FBRUEsWUFBSSxPQUFPLE1BQU0sUUFBUSxRQUFRLEVBQUUsUUFBUSxZQUFZLEtBQUssSUFBSSxTQUFTLFlBQVksTUFBTSxHQUFHLENBQUM7QUFFL0YsWUFBSSxDQUFDLE1BQU07QUFDUCxpQkFBTyxJQUFJLFFBQVE7QUFBQSxZQUNmLFFBQVEsWUFBWSxLQUFLO0FBQUEsWUFDekIsU0FBUyxZQUFZLE1BQU07QUFBQSxVQUMvQixDQUFDO0FBQ0QsZ0JBQU0sS0FBSyxLQUFLO0FBQUEsUUFDcEI7QUFFQSxjQUFNLFdBQVcsS0FBSztBQUN0QixjQUFNLE1BQU0sb0JBQUksS0FBSztBQUNyQixjQUFNLE9BQU8sTUFBTTtBQUNuQixjQUFNLGNBQWMsS0FBSyxNQUFNLE9BQU8sTUFBTyxFQUFFO0FBRS9DLFlBQUksY0FBYyxJQUFJO0FBQ2xCLGdCQUFNLGNBQWMsS0FBSztBQUN6QixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxTQUFTLFNBQVMsRUFBRSxlQUFlLCtEQUErRCxXQUFXLFdBQVcsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUMxTDtBQUVBLGFBQUssV0FBVztBQUNoQixjQUFNLFNBQVMsS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLEdBQUcsSUFBSTtBQUNqRCxhQUFLLFdBQVc7QUFDaEIsY0FBTSxLQUFLLEtBQUs7QUFFaEIsb0JBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLFNBQVMsU0FBUyxFQUFFLGVBQWUsMEJBQTBCLE1BQU0sMEJBQTBCLEtBQUssT0FBTyxXQUFXLEVBQUUsU0FBUyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQUEsTUFFakw7QUFBQSxJQUNKO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K