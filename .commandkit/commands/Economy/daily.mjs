import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/daily.js
var require_daily = __commonJS({
  "src/commands/Economy/daily.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("daily").setDescription("Reclama tus monedas diarias."),
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
        const now = /* @__PURE__ */ new Date();
        const lastDaily = data.lastDaily;
        const diff = now - lastDaily;
        const diffHours = Math.floor(diff / 1e3 / 60 / 60);
        if (diffHours < 24) {
          const hoursLeft = 24 - diffHours;
          return interaction.reply({ embeds: [embed.setTitle("Monedas diarias").setDescription(`Ya has reclamado tus monedas diarias. Puedes reclamar de nuevo en ${hoursLeft} horas.`).setColor("Red")] });
        }
        const earned = Math.floor(Math.random() * 201) + 800;
        data.balance += earned;
        data.lastDaily = now;
        await data.save();
        interaction.reply({ embeds: [embed.setTitle("Monedas diarias").setDescription(`Has reclamado tus monedas diarias y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Green")] });
      }
    };
  }
});
export default require_daily();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvZGFpbHkuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2xhc2hDb21tYW5kQnVpbGRlciwgRW1iZWRCdWlsZGVyIH0gPSByZXF1aXJlKCdkaXNjb3JkLmpzJyk7XHJcbmNvbnN0IGVjb25vbXkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbHMvZWNvbm9teScpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gICAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgICAgIC5zZXROYW1lKCdkYWlseScpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdSZWNsYW1hIHR1cyBtb25lZGFzIGRpYXJpYXMuJyksXHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICAqL1xyXG4gICAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5ndWlsZCkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBlY29ub215LmZpbmRPbmUoeyB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsIGd1aWxkSWQ6IGludGVyYWN0aW9uLmd1aWxkLmlkIH0pO1xyXG4gICAgXHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICBkYXRhID0gbmV3IGVjb25vbXkoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgIGd1aWxkSWQ6IGludGVyYWN0aW9uLmd1aWxkLmlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgbGFzdERhaWx5ID0gZGF0YS5sYXN0RGFpbHk7XHJcbiAgICBjb25zdCBkaWZmID0gbm93IC0gbGFzdERhaWx5O1xyXG4gICAgY29uc3QgZGlmZkhvdXJzID0gTWF0aC5mbG9vcihkaWZmIC8gMTAwMCAvIDYwIC8gNjApO1xyXG5cclxuICAgIGlmIChkaWZmSG91cnMgPCAyNCkge1xyXG4gICAgICAgIGNvbnN0IGhvdXJzTGVmdCA9IDI0IC0gZGlmZkhvdXJzO1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdNb25lZGFzIGRpYXJpYXMnKS5zZXREZXNjcmlwdGlvbihgWWEgaGFzIHJlY2xhbWFkbyB0dXMgbW9uZWRhcyBkaWFyaWFzLiBQdWVkZXMgcmVjbGFtYXIgZGUgbnVldm8gZW4gJHtob3Vyc0xlZnR9IGhvcmFzLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWFybmVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjAxKSArIDgwMDtcclxuICAgIGRhdGEuYmFsYW5jZSArPSBlYXJuZWQ7XHJcbiAgICBkYXRhLmxhc3REYWlseSA9IG5vdztcclxuICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG5cclxuICAgIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ01vbmVkYXMgZGlhcmlhcycpLnNldERlc2NyaXB0aW9uKGBIYXMgcmVjbGFtYWRvIHR1cyBtb25lZGFzIGRpYXJpYXMgeSBnYW5hZG8gJHtlYXJuZWR9IG1vbmVkYXMuIEFob3JhIHRpZW5lcyAke2RhdGEuYmFsYW5jZX0gbW9uZWRhcy5gKS5zZXRDb2xvcignR3JlZW4nKV0gfSk7XHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sVUFBVTtBQUNoQixXQUFPLFVBQVU7QUFBQTtBQUFBLE1BRWIsTUFBTSxJQUFJLG9CQUFvQixFQUN6QixRQUFRLE9BQU8sRUFDZixlQUFlLDhCQUE4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWxELEtBQUssT0FBTyxFQUFFLGFBQWEsUUFBUSxRQUFRLE1BQU07QUFDakQsY0FBTSxRQUFRLElBQUksYUFBYTtBQUMvQixZQUFJLENBQUMsWUFBWSxPQUFPO0FBQ3BCLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUscURBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbkk7QUFFQSxZQUFJLE9BQU8sTUFBTSxRQUFRLFFBQVEsRUFBRSxRQUFRLFlBQVksS0FBSyxJQUFJLFNBQVMsWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUUvRixZQUFJLENBQUMsTUFBTTtBQUNQLGlCQUFPLElBQUksUUFBUTtBQUFBLFlBQ2YsUUFBUSxZQUFZLEtBQUs7QUFBQSxZQUN6QixTQUFTLFlBQVksTUFBTTtBQUFBLFVBQy9CLENBQUM7QUFDRCxnQkFBTSxLQUFLLEtBQUs7QUFBQSxRQUNwQjtBQUVBLGNBQU0sTUFBTSxvQkFBSSxLQUFLO0FBQ3JCLGNBQU0sWUFBWSxLQUFLO0FBQ3ZCLGNBQU0sT0FBTyxNQUFNO0FBQ25CLGNBQU0sWUFBWSxLQUFLLE1BQU0sT0FBTyxNQUFPLEtBQUssRUFBRTtBQUVsRCxZQUFJLFlBQVksSUFBSTtBQUNoQixnQkFBTSxZQUFZLEtBQUs7QUFDdkIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sU0FBUyxpQkFBaUIsRUFBRSxlQUFlLHFFQUFxRSxTQUFTLFNBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUNwTTtBQUVBLGNBQU0sU0FBUyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksR0FBRyxJQUFJO0FBQ2pELGFBQUssV0FBVztBQUNoQixhQUFLLFlBQVk7QUFDakIsY0FBTSxLQUFLLEtBQUs7QUFFaEIsb0JBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLFNBQVMsaUJBQWlCLEVBQUUsZUFBZSw4Q0FBOEMsTUFBTSwwQkFBMEIsS0FBSyxPQUFPLFdBQVcsRUFBRSxTQUFTLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFBQSxNQUN6TTtBQUFBLElBQ0o7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=