import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/rob.js
var require_rob = __commonJS({
  "src/commands/Economy/rob.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    var successMessages = [
      "\xA1Has robado con \xE9xito!",
      "\xA1El robo fue un \xE9xito!",
      "\xA1Has logrado robar!",
      "\xA1Robo exitoso!",
      "\xA1Has conseguido las monedas!"
    ];
    var failMessages = [
      "\xA1El robo ha fallado!",
      "\xA1Has sido atrapado!",
      "\xA1El robo no tuvo \xE9xito!",
      "\xA1Has perdido monedas!",
      "\xA1El robo fue un desastre!"
    ];
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("rob").setDescription("Intenta robar monedas de otro usuario.").addUserOption((option) => option.setName("usuario").setDescription("El usuario al que quieres robar").setRequired(true)),
      /**
      * @param {import('commandkit').SlashCommandProps} param0
      */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const targetUser = interaction.options.getUser("usuario");
        if (targetUser.id === interaction.user.id) {
          return interaction.reply({ embeds: [embed.setTitle("Error").setDescription("No puedes robarte a ti mismo.").setColor("Red")], ephemeral: true });
        }
        if (targetUser.bot) {
          return interaction.reply({ embeds: [embed.setTitle("Error").setDescription("No puedes robarle a un bot.").setColor("Red")], ephemeral: true });
        }
        let userData = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        let targetData = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });
        if (!userData) {
          userData = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id
          });
          await userData.save();
        }
        if (!targetData) {
          targetData = new economy({
            userId: targetUser.id,
            guildId: interaction.guild.id
          });
          await targetData.save();
        }
        if (targetData.balance === 0) {
          return interaction.reply({ embeds: [embed.setTitle("Robo fallido").setDescription("No puedes robarle el dinero a un ni\xF1o.").setColor("Red")] });
        }
        const now = /* @__PURE__ */ new Date();
        const lastRob = userData.lastRob;
        const diff = now - lastRob;
        const diffHours = Math.floor(diff / 1e3 / 60 / 60);
        if (diffHours < 1) {
          const hoursLeft = 1 - diffHours;
          return interaction.reply({ embeds: [embed.setTitle("Robo").setDescription(`Ya has intentado robar recientemente. Puedes intentar de nuevo en ${hoursLeft} horas.`).setColor("Red")] });
        }
        userData.lastRob = now;
        const success = Math.random() < 0.3;
        if (success) {
          let stolenAmount;
          if (targetData.balance < 100) {
            stolenAmount = Math.floor(targetData.balance * 0.2);
          } else {
            stolenAmount = Math.floor(argetData.balance * 0.2);
          }
          targetData.balance -= stolenAmount;
          userData.balance += stolenAmount;
          await targetData.save();
          await userData.save();
          const successMessage = successMessages[Math.floor(Math.random() * successMessages.length)];
          return interaction.reply({ embeds: [embed.setTitle("Robo exitoso").setDescription(`${successMessage} Has robado ${stolenAmount} monedas de ${targetUser.tag}. Ahora tienes ${userData.balance} monedas.`).setColor("Green")] });
        } else {
          const lostAmount = Math.floor(userData.balance * 0.3);
          userData.balance -= lostAmount;
          await userData.save();
          const failMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
          return interaction.reply({ embeds: [embed.setTitle("Robo fallido").setDescription(`${failMessage} Has fallado en robar a ${targetUser.tag} y has perdido ${lostAmount} monedas. Ahora tienes ${userData.balance} monedas.`).setColor("Red")] });
        }
      }
    };
  }
});
export default require_rob();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvcm9iLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFNsYXNoQ29tbWFuZEJ1aWxkZXIsIEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5jb25zdCBlY29ub215ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2Vjb25vbXknKTtcclxuXHJcbmNvbnN0IHN1Y2Nlc3NNZXNzYWdlcyA9IFtcclxuICAgIFwiXHUwMEExSGFzIHJvYmFkbyBjb24gXHUwMEU5eGl0byFcIixcclxuICAgIFwiXHUwMEExRWwgcm9ibyBmdWUgdW4gXHUwMEU5eGl0byFcIixcclxuICAgIFwiXHUwMEExSGFzIGxvZ3JhZG8gcm9iYXIhXCIsXHJcbiAgICBcIlx1MDBBMVJvYm8gZXhpdG9zbyFcIixcclxuICAgIFwiXHUwMEExSGFzIGNvbnNlZ3VpZG8gbGFzIG1vbmVkYXMhXCJcclxuXTtcclxuXHJcbmNvbnN0IGZhaWxNZXNzYWdlcyA9IFtcclxuICAgIFwiXHUwMEExRWwgcm9ibyBoYSBmYWxsYWRvIVwiLFxyXG4gICAgXCJcdTAwQTFIYXMgc2lkbyBhdHJhcGFkbyFcIixcclxuICAgIFwiXHUwMEExRWwgcm9ibyBubyB0dXZvIFx1MDBFOXhpdG8hXCIsXHJcbiAgICBcIlx1MDBBMUhhcyBwZXJkaWRvIG1vbmVkYXMhXCIsXHJcbiAgICBcIlx1MDBBMUVsIHJvYm8gZnVlIHVuIGRlc2FzdHJlIVwiXHJcbl07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnY29tbWFuZGtpdCcpLkNvbW1hbmREYXRhfSAgKi9cclxuICAgIGRhdGE6IG5ldyBTbGFzaENvbW1hbmRCdWlsZGVyKClcclxuICAgICAgICAuc2V0TmFtZSgncm9iJylcclxuICAgICAgICAuc2V0RGVzY3JpcHRpb24oJ0ludGVudGEgcm9iYXIgbW9uZWRhcyBkZSBvdHJvIHVzdWFyaW8uJylcclxuICAgICAgICAuYWRkVXNlck9wdGlvbihvcHRpb24gPT4gb3B0aW9uLnNldE5hbWUoJ3VzdWFyaW8nKS5zZXREZXNjcmlwdGlvbignRWwgdXN1YXJpbyBhbCBxdWUgcXVpZXJlcyByb2JhcicpLnNldFJlcXVpcmVkKHRydWUpKVxyXG4gICAgICAgICxcclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge2ltcG9ydCgnY29tbWFuZGtpdCcpLlNsYXNoQ29tbWFuZFByb3BzfSBwYXJhbTBcclxuICAgICovXHJcbiAgICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VzdGUgY29tYW5kbyBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIGVuIHNlcnZpZG9yZXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldFVzZXIgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFVzZXIoJ3VzdWFyaW8nKTtcclxuICAgICAgICBpZiAodGFyZ2V0VXNlci5pZCA9PT0gaW50ZXJhY3Rpb24udXNlci5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXRUaXRsZSgnRXJyb3InKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZGVzIHJvYmFydGUgYSB0aSBtaXNtby4nKS5zZXRDb2xvcignUmVkJyldLCBlcGhlbWVyYWw6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0VXNlci5ib3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ0Vycm9yJykuc2V0RGVzY3JpcHRpb24oJ05vIHB1ZWRlcyByb2JhcmxlIGEgdW4gYm90LicpLnNldENvbG9yKCdSZWQnKV0sIGVwaGVtZXJhbDogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IGF3YWl0IGVjb25vbXkuZmluZE9uZSh7IHVzZXJJZDogaW50ZXJhY3Rpb24udXNlci5pZCwgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcbiAgICAgICAgbGV0IHRhcmdldERhdGEgPSBhd2FpdCBlY29ub215LmZpbmRPbmUoeyB1c2VySWQ6IHRhcmdldFVzZXIuaWQsIGd1aWxkSWQ6IGludGVyYWN0aW9uLmd1aWxkLmlkIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXJEYXRhKSB7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhID0gbmV3IGVjb25vbXkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCB1c2VyRGF0YS5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRhcmdldERhdGEpIHtcclxuICAgICAgICAgICAgdGFyZ2V0RGF0YSA9IG5ldyBlY29ub215KHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdGFyZ2V0VXNlci5pZCxcclxuICAgICAgICAgICAgICAgIGd1aWxkSWQ6IGludGVyYWN0aW9uLmd1aWxkLmlkLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXdhaXQgdGFyZ2V0RGF0YS5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0RGF0YS5iYWxhbmNlID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdSb2JvIGZhbGxpZG8nKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZGVzIHJvYmFybGUgZWwgZGluZXJvIGEgdW4gbmlcdTAwRjFvLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGxhc3RSb2IgPSB1c2VyRGF0YS5sYXN0Um9iO1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0Um9iO1xyXG4gICAgICAgIGNvbnN0IGRpZmZIb3VycyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCAvIDYwKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZmZIb3VycyA8IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnNMZWZ0ID0gMSAtIGRpZmZIb3VycztcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1JvYm8nKS5zZXREZXNjcmlwdGlvbihgWWEgaGFzIGludGVudGFkbyByb2JhciByZWNpZW50ZW1lbnRlLiBQdWVkZXMgaW50ZW50YXIgZGUgbnVldm8gZW4gJHtob3Vyc0xlZnR9IGhvcmFzLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1c2VyRGF0YS5sYXN0Um9iID0gbm93O1xyXG5cclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gTWF0aC5yYW5kb20oKSA8IDAuMzsgLy8gMzAlIGNoYW5jZSBvZiBzdWNjZXNzXHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbGV0IHN0b2xlbkFtb3VudDtcclxuICAgICAgICAgICAgaWYgKHRhcmdldERhdGEuYmFsYW5jZSA8IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgc3RvbGVuQW1vdW50ID0gTWF0aC5mbG9vcih0YXJnZXREYXRhLmJhbGFuY2UgKiAwLjIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RvbGVuQW1vdW50ID0gTWF0aC5mbG9vcihhcmdldERhdGEuYmFsYW5jZSAqIDAuMik7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXREYXRhLmJhbGFuY2UgLT0gc3RvbGVuQW1vdW50O1xyXG4gICAgICAgICAgICB1c2VyRGF0YS5iYWxhbmNlICs9IHN0b2xlbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRhcmdldERhdGEuc2F2ZSgpO1xyXG4gICAgICAgICAgICBhd2FpdCB1c2VyRGF0YS5zYXZlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzTWVzc2FnZSA9IHN1Y2Nlc3NNZXNzYWdlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdWNjZXNzTWVzc2FnZXMubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdSb2JvIGV4aXRvc28nKS5zZXREZXNjcmlwdGlvbihgJHtzdWNjZXNzTWVzc2FnZX0gSGFzIHJvYmFkbyAke3N0b2xlbkFtb3VudH0gbW9uZWRhcyBkZSAke3RhcmdldFVzZXIudGFnfS4gQWhvcmEgdGllbmVzICR7dXNlckRhdGEuYmFsYW5jZX0gbW9uZWRhcy5gKS5zZXRDb2xvcignR3JlZW4nKV0gfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbG9zdEFtb3VudCA9IE1hdGguZmxvb3IodXNlckRhdGEuYmFsYW5jZSAqIDAuMyk7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhLmJhbGFuY2UgLT0gbG9zdEFtb3VudDtcclxuICAgICAgICAgICAgYXdhaXQgdXNlckRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmFpbE1lc3NhZ2UgPSBmYWlsTWVzc2FnZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFpbE1lc3NhZ2VzLmxlbmd0aCldO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXRUaXRsZSgnUm9ibyBmYWxsaWRvJykuc2V0RGVzY3JpcHRpb24oYCR7ZmFpbE1lc3NhZ2V9IEhhcyBmYWxsYWRvIGVuIHJvYmFyIGEgJHt0YXJnZXRVc2VyLnRhZ30geSBoYXMgcGVyZGlkbyAke2xvc3RBbW91bnR9IG1vbmVkYXMuIEFob3JhIHRpZW5lcyAke3VzZXJEYXRhLmJhbGFuY2V9IG1vbmVkYXMuYCkuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sVUFBVTtBQUVoQixRQUFNLGtCQUFrQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFFQSxRQUFNLGVBQWU7QUFBQSxNQUNqQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBR0EsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUViLE1BQU0sSUFBSSxvQkFBb0IsRUFDekIsUUFBUSxLQUFLLEVBQ2IsZUFBZSx3Q0FBd0MsRUFDdkQsY0FBYyxZQUFVLE9BQU8sUUFBUSxTQUFTLEVBQUUsZUFBZSxpQ0FBaUMsRUFBRSxZQUFZLElBQUksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSzFILEtBQUssT0FBTyxFQUFFLGFBQWEsUUFBUSxRQUFRLE1BQU07QUFDN0MsY0FBTSxRQUFRLElBQUksYUFBYTtBQUMvQixZQUFJLENBQUMsWUFBWSxP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