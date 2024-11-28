import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __name,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/balance.js
var require_balance = __commonJS({
  "src/commands/Economy/balance.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("balance").setDescription("Muestra el saldo de tu cuenta o de otro usuario").addUserOption((option) => option.setName("usuario").setDescription("El usuario del que quieres ver el saldo").setRequired(false)),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const targetUser = interaction.options.getUser("usuario") || interaction.user;
        if (targetUser.bot) {
          return interaction.reply({ embeds: [embed.setDescription("No puedes ver el balance de un bot.").setColor("Red")] });
        }
        let data = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });
        if (!data) {
          data = new economy({
            userId: targetUser.id,
            guildId: interaction.guild.id
          });
          await data.save();
        }
        const now = /* @__PURE__ */ new Date();
        const getCooldownStatus = /* @__PURE__ */ __name((lastTime, cooldown) => {
          const diff = now - lastTime;
          const diffMinutes = Math.floor(diff / 1e3 / 60);
          const diffHours = Math.floor(diff / 1e3 / 60 / 60);
          if (cooldown === "hourly" && diffHours < 1) {
            return `Disponible en ${60 - diffMinutes % 60} minutos \u{1F534}`;
          } else if (cooldown === "daily" && diffHours < 24) {
            return `Disponible en ${24 - diffHours} horas \u{1F534}`;
          } else if (cooldown === "weekly" && diffHours < 168) {
            return `Disponible en ${168 - diffHours} horas \u{1F534}`;
          } else if (cooldown === "minutes" && diffMinutes < 5) {
            return `Disponible en ${5 - diffMinutes} minutos \u{1F534}`;
          } else if (cooldown === "half-hour" && diffMinutes < 30) {
            return `Disponible en ${30 - diffMinutes} minutos \u{1F534}`;
          } else if (cooldown === "ten minutes" && diffMinutes < 10) {
            return `Disponible en ${10 - diffMinutes} minutos \u{1F534}`;
          } else {
            return "Disponible \u{1F7E2}";
          }
        }, "getCooldownStatus");
        const cooldowns = [
          { name: "Daily", value: getCooldownStatus(data.lastDaily, "daily") },
          { name: "Work", value: getCooldownStatus(data.lastWork, "half-hour") },
          { name: "Miniwork", value: getCooldownStatus(data.lastMiniwork, "minutes") },
          { name: "Mine", value: getCooldownStatus(data.lastMine, "minutes") },
          { name: "Rob", value: getCooldownStatus(data.lastRob, "hourly") },
          { name: "Fish", value: getCooldownStatus(data.lastFish, "minutes") },
          { name: "Crime", value: getCooldownStatus(data.lastCrime, "half-hour") },
          { name: "Coinflip", value: getCooldownStatus(data.lastCoinflip, "ten minutes") }
        ];
        const cooldownsText = cooldowns.map((cooldown) => `${cooldown.name}: ${cooldown.value}`).join("\n");
        embed.setTitle(`Balance de ${targetUser.tag}`).setColor("Blurple").addFields(
          { name: "Balance", value: `${data.balance} monedas`, inline: false },
          { name: "Tiempos restantes", value: cooldownsText, inline: false }
        );
        interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_balance();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvYmFsYW5jZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgZWNvbm9teSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9lY29ub215Jyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gIGRhdGE6IG5ldyBTbGFzaENvbW1hbmRCdWlsZGVyKClcclxuICAgIC5zZXROYW1lKCdiYWxhbmNlJylcclxuICAgIC5zZXREZXNjcmlwdGlvbignTXVlc3RyYSBlbCBzYWxkbyBkZSB0dSBjdWVudGEgbyBkZSBvdHJvIHVzdWFyaW8nKVxyXG4gICAgLmFkZFVzZXJPcHRpb24oKG9wdGlvbikgPT4gb3B0aW9uXHJcbiAgICAgIC5zZXROYW1lKCd1c3VhcmlvJylcclxuICAgICAgLnNldERlc2NyaXB0aW9uKCdFbCB1c3VhcmlvIGRlbCBxdWUgcXVpZXJlcyB2ZXIgZWwgc2FsZG8nKVxyXG4gICAgICAuc2V0UmVxdWlyZWQoZmFsc2UpKSxcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAqL1xyXG4gIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24sIGNsaWVudCB9KSA9PiB7XHJcbiAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcclxuICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignRXN0ZSBjb21hbmRvIHNvbG8gZXN0XHUwMEUxIGRpc3BvbmlibGUgZW4gc2Vydmlkb3Jlcy4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldFVzZXIgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFVzZXIoJ3VzdWFyaW8nKSB8fCBpbnRlcmFjdGlvbi51c2VyO1xyXG5cclxuICAgIGlmKHRhcmdldFVzZXIuYm90KSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05vIHB1ZWRlcyB2ZXIgZWwgYmFsYW5jZSBkZSB1biBib3QuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGVjb25vbXkuZmluZE9uZSh7IHVzZXJJZDogdGFyZ2V0VXNlci5pZCwgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgZGF0YSA9IG5ldyBlY29ub215KHtcclxuICAgICAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxyXG4gICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGNvbnN0IGdldENvb2xkb3duU3RhdHVzID0gKGxhc3RUaW1lLCBjb29sZG93bikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0VGltZTtcclxuICAgICAgICBjb25zdCBkaWZmTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCk7XHJcbiAgICAgICAgY29uc3QgZGlmZkhvdXJzID0gTWF0aC5mbG9vcihkaWZmIC8gMTAwMCAvIDYwIC8gNjApO1xyXG5cclxuICAgICAgICBpZiAoY29vbGRvd24gPT09ICdob3VybHknICYmIGRpZmZIb3VycyA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBEaXNwb25pYmxlIGVuICR7NjAgLSBkaWZmTWludXRlcyAlIDYwfSBtaW51dG9zIFx1RDgzRFx1REQzNGA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb29sZG93biA9PT0gJ2RhaWx5JyAmJiBkaWZmSG91cnMgPCAyNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYERpc3BvbmlibGUgZW4gJHsyNCAtIGRpZmZIb3Vyc30gaG9yYXMgXHVEODNEXHVERDM0YDtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvb2xkb3duID09PSAnd2Vla2x5JyAmJiBkaWZmSG91cnMgPCAxNjgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBEaXNwb25pYmxlIGVuICR7MTY4IC0gZGlmZkhvdXJzfSBob3JhcyBcdUQ4M0RcdUREMzRgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29vbGRvd24gPT09ICdtaW51dGVzJyAmJiBkaWZmTWludXRlcyA8IDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBEaXNwb25pYmxlIGVuICR7NSAtIGRpZmZNaW51dGVzfSBtaW51dG9zIFx1RDgzRFx1REQzNGA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb29sZG93biA9PT0gJ2hhbGYtaG91cicgJiYgZGlmZk1pbnV0ZXMgPCAzMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYERpc3BvbmlibGUgZW4gJHszMCAtIGRpZmZNaW51dGVzfSBtaW51dG9zIFx1RDgzRFx1REQzNGA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb29sZG93biA9PT0gJ3RlbiBtaW51dGVzJyAmJiBkaWZmTWludXRlcyA8IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgRGlzcG9uaWJsZSBlbiAkezEwIC0gZGlmZk1pbnV0ZXN9IG1pbnV0b3MgXHVEODNEXHVERDM0YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0Rpc3BvbmlibGUgXHVEODNEXHVERkUyJztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvb2xkb3ducyA9IFtcclxuICAgICAgICB7IG5hbWU6ICdEYWlseScsIHZhbHVlOiBnZXRDb29sZG93blN0YXR1cyhkYXRhLmxhc3REYWlseSwgJ2RhaWx5JykgfSxcclxuICAgICAgICB7IG5hbWU6ICdXb3JrJywgdmFsdWU6IGdldENvb2xkb3duU3RhdHVzKGRhdGEubGFzdFdvcmssICdoYWxmLWhvdXInKSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ01pbml3b3JrJywgdmFsdWU6IGdldENvb2xkb3duU3RhdHVzKGRhdGEubGFzdE1pbml3b3JrLCAnbWludXRlcycpIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnTWluZScsIHZhbHVlOiBnZXRDb29sZG93blN0YXR1cyhkYXRhLmxhc3RNaW5lLCAnbWludXRlcycpIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnUm9iJywgdmFsdWU6IGdldENvb2xkb3duU3RhdHVzKGRhdGEubGFzdFJvYiwgJ2hvdXJseScpIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnRmlzaCcsIHZhbHVlOiBnZXRDb29sZG93blN0YXR1cyhkYXRhLmxhc3RGaXNoLCAnbWludXRlcycpIH0sXHJcbiAgICAgICAgeyBuYW1lOiAnQ3JpbWUnLCB2YWx1ZTogZ2V0Q29vbGRvd25TdGF0dXMoZGF0YS5sYXN0Q3JpbWUsICdoYWxmLWhvdXInKSB9LFxyXG4gICAgICAgIHsgbmFtZTogJ0NvaW5mbGlwJywgdmFsdWU6IGdldENvb2xkb3duU3RhdHVzKGRhdGEubGFzdENvaW5mbGlwLCAndGVuIG1pbnV0ZXMnKSB9LFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBjb29sZG93bnNUZXh0ID0gY29vbGRvd25zLm1hcChjb29sZG93biA9PiBgJHtjb29sZG93bi5uYW1lfTogJHtjb29sZG93bi52YWx1ZX1gKS5qb2luKCdcXG4nKTtcclxuXHJcbiAgICBlbWJlZC5zZXRUaXRsZShgQmFsYW5jZSBkZSAke3RhcmdldFVzZXIudGFnfWApXHJcbiAgICAgICAgLnNldENvbG9yKCdCbHVycGxlJylcclxuICAgICAgICAuYWRkRmllbGRzKFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdCYWxhbmNlJywgdmFsdWU6IGAke2RhdGEuYmFsYW5jZX0gbW9uZWRhc2AsIGlubGluZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnVGllbXBvcyByZXN0YW50ZXMnLCB2YWx1ZTogY29vbGRvd25zVGV4dCwgaW5saW5lOiBmYWxzZSB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICB9LFxyXG59OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sVUFBVTtBQUNoQixXQUFPLFVBQVU7QUFBQTtBQUFBLE1BRWYsTUFBTSxJQUFJLG9CQUFvQixFQUMzQixRQUFRLFNBQVMsRUFDakIsZUFBZSxpREFBaUQsRUFDaEUsY0FBYyxDQUFDLFdBQVcsT0FDeEIsUUFBUSxTQUFTLEVBQ2pCLGVBQWUseUNBQXlDLEVBQ3hELFlBQVksS0FBSyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNdkIsS0FBSyxPQUFPLEVBQUUsYUFBYSxPQUFPLE1BQU07QUFDdEMsY0FBTSxRQUFRLElBQUksYUFBYTtBQUMvQixZQUFJLENBQUMsWUFBWSxPQUFPO0FBQ3BCLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUscURBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbkk7QUFFQSxjQUFNLGFBQWEsWUFBWSxRQUFRLFFBQVEsU0FBUyxLQUFLLFlBQVk7QUFFekUsWUFBRyxXQUFXLEtBQUs7QUFDZixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENB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