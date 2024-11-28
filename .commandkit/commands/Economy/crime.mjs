import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/crime.js
var require_crime = __commonJS({
  "src/commands/Economy/crime.js"(exports, module) {
    init_esm_shims();
    var { EmbedBuilder, SlashCommandBuilder } = __require("discord.js");
    var economy = require_economy();
    var rewards = [
      { amount: 1e6, probability: 0.05 },
      { amount: 5e5, probability: 0.1 },
      { amount: 25e4, probability: 0.15 },
      { amount: 1e5, probability: 0.2 },
      { amount: 5e4, probability: 0.5 }
    ];
    var failMessages = [
      "\xA1El crimen ha fallado!",
      "\xA1Has sido atrapado!",
      "\xA1El crimen no tuvo \xE9xito!",
      "\xA1Has perdido monedas!",
      "\xA1El crimen fue un desastre!"
    ];
    var failPenalty = 1e3;
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("crime").setDescription("Intenta cometer un crimen para ganar monedas.").addBooleanOption((option) => option.setName("cameras_off").setDescription("Paga 10000 monedas para apagar las c\xE1maras de seguridad.")).addBooleanOption((option) => option.setName("less_police").setDescription("Paga 10000 monedas para reducir la presencia policial.")).addBooleanOption((option) => option.setName("advanced_equipment").setDescription("Paga 10000 monedas para obtener equipo avanzado.")),
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
        const lastCrime = data.lastCrime;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastCrime;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 30) {
          const minutesLeft = 30 - diffMinutes;
          return interaction.reply({ embeds: [embed.setDescription(`Ya has intentado cometer un crimen recientemente. Puedes intentarlo de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        if (data.balance < 1e3) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes suficientes monedas para pagar la condena en caso de fallar. Necesitas 1000 monedas.").setColor("Red")] });
        }
        const camerasOff = interaction.options.getBoolean("cameras_off") || false;
        const lessPolice = interaction.options.getBoolean("less_police") || false;
        const advancedEquipment = interaction.options.getBoolean("advanced_equipment") || false;
        let totalCost = 0;
        let successProbability = 0.05;
        if (camerasOff) {
          totalCost += 1e4;
          successProbability += 0.05;
        }
        if (lessPolice) {
          totalCost += 1e4;
          successProbability += 0.05;
        }
        if (advancedEquipment) {
          totalCost += 1e4;
          successProbability += 0.05;
        }
        if (data.balance < totalCost) {
          return interaction.reply({ embeds: [embed.setDescription(`No tienes suficientes monedas para pagar las opciones seleccionadas. Necesitas ${totalCost} monedas.`).setColor("Red")] });
        }
        data.balance -= totalCost;
        data.lastCrime = now;
        const success = Math.random() < successProbability;
        if (success) {
          const reward = rewards.find((r) => Math.random() < r.probability);
          const earned = reward.amount;
          data.balance += earned;
          await data.save();
          return interaction.reply({ embeds: [embed.setTitle("Crimen exitoso").setDescription(`Has cometido un crimen y ganado ${earned} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Green")] });
        } else {
          const failMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
          data.balance -= failPenalty;
          await data.save();
          return interaction.reply({ embeds: [embed.setTitle("Crimen fallido").setDescription(`${failMessage} Has perdido ${failPenalty} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Red")] });
        }
      }
    };
  }
});
export default require_crime();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvY3JpbWUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgRW1iZWRCdWlsZGVyLCBTbGFzaENvbW1hbmRCdWlsZGVyIH0gPSByZXF1aXJlKFwiZGlzY29yZC5qc1wiKTtcclxuY29uc3QgZWNvbm9teSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9lY29ub215Jyk7XHJcblxyXG5jb25zdCByZXdhcmRzID0gW1xyXG4gICAgeyBhbW91bnQ6IDEwMDAwMDAsIHByb2JhYmlsaXR5OiAwLjA1IH0sXHJcbiAgICB7IGFtb3VudDogNTAwMDAwLCBwcm9iYWJpbGl0eTogMC4xIH0sXHJcbiAgICB7IGFtb3VudDogMjUwMDAwLCBwcm9iYWJpbGl0eTogMC4xNSB9LFxyXG4gICAgeyBhbW91bnQ6IDEwMDAwMCwgcHJvYmFiaWxpdHk6IDAuMiB9LFxyXG4gICAgeyBhbW91bnQ6IDUwMDAwLCBwcm9iYWJpbGl0eTogMC41IH1cclxuXTtcclxuXHJcbmNvbnN0IGZhaWxNZXNzYWdlcyA9IFtcclxuICAgIFwiXHUwMEExRWwgY3JpbWVuIGhhIGZhbGxhZG8hXCIsXHJcbiAgICBcIlx1MDBBMUhhcyBzaWRvIGF0cmFwYWRvIVwiLFxyXG4gICAgXCJcdTAwQTFFbCBjcmltZW4gbm8gdHV2byBcdTAwRTl4aXRvIVwiLFxyXG4gICAgXCJcdTAwQTFIYXMgcGVyZGlkbyBtb25lZGFzIVwiLFxyXG4gICAgXCJcdTAwQTFFbCBjcmltZW4gZnVlIHVuIGRlc2FzdHJlIVwiXHJcbl07XHJcblxyXG5jb25zdCBmYWlsUGVuYWx0eSA9IDEwMDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gICAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgICAgIC5zZXROYW1lKCdjcmltZScpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdJbnRlbnRhIGNvbWV0ZXIgdW4gY3JpbWVuIHBhcmEgZ2FuYXIgbW9uZWRhcy4nKVxyXG4gICAgICAgIC5hZGRCb29sZWFuT3B0aW9uKG9wdGlvbiA9PiBvcHRpb25cclxuICAgICAgICAgICAgLnNldE5hbWUoJ2NhbWVyYXNfb2ZmJylcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKCdQYWdhIDEwMDAwIG1vbmVkYXMgcGFyYSBhcGFnYXIgbGFzIGNcdTAwRTFtYXJhcyBkZSBzZWd1cmlkYWQuJykpXHJcbiAgICAgICAgLmFkZEJvb2xlYW5PcHRpb24ob3B0aW9uID0+IG9wdGlvblxyXG4gICAgICAgICAgICAuc2V0TmFtZSgnbGVzc19wb2xpY2UnKVxyXG4gICAgICAgICAgICAuc2V0RGVzY3JpcHRpb24oJ1BhZ2EgMTAwMDAgbW9uZWRhcyBwYXJhIHJlZHVjaXIgbGEgcHJlc2VuY2lhIHBvbGljaWFsLicpKVxyXG4gICAgICAgIC5hZGRCb29sZWFuT3B0aW9uKG9wdGlvbiA9PiBvcHRpb25cclxuICAgICAgICAgICAgLnNldE5hbWUoJ2FkdmFuY2VkX2VxdWlwbWVudCcpXHJcbiAgICAgICAgICAgIC5zZXREZXNjcmlwdGlvbignUGFnYSAxMDAwMCBtb25lZGFzIHBhcmEgb2J0ZW5lciBlcXVpcG8gYXZhbnphZG8uJykpXHJcblxyXG4gICAgLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge2ltcG9ydCgnY29tbWFuZGtpdCcpLlNsYXNoQ29tbWFuZFByb3BzfSBwYXJhbTBcclxuICAgICovXHJcbiAgICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VzdGUgY29tYW5kbyBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIGVuIHNlcnZpZG9yZXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGFzdENyaW1lID0gZGF0YS5sYXN0Q3JpbWU7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBkaWZmID0gbm93IC0gbGFzdENyaW1lO1xyXG4gICAgICAgIGNvbnN0IGRpZmZNaW51dGVzID0gTWF0aC5mbG9vcihkaWZmIC8gMTAwMCAvIDYwKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZmZNaW51dGVzIDwgMzApIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlc0xlZnQgPSAzMCAtIGRpZmZNaW51dGVzO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbihgWWEgaGFzIGludGVudGFkbyBjb21ldGVyIHVuIGNyaW1lbiByZWNpZW50ZW1lbnRlLiBQdWVkZXMgaW50ZW50YXJsbyBkZSBudWV2byBlbiAke21pbnV0ZXNMZWZ0fSBtaW51dG9zLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5iYWxhbmNlIDwgMTAwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTm8gdGllbmVzIHN1ZmljaWVudGVzIG1vbmVkYXMgcGFyYSBwYWdhciBsYSBjb25kZW5hIGVuIGNhc28gZGUgZmFsbGFyLiBOZWNlc2l0YXMgMTAwMCBtb25lZGFzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjYW1lcmFzT2ZmID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRCb29sZWFuKCdjYW1lcmFzX29mZicpIHx8IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGxlc3NQb2xpY2UgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldEJvb2xlYW4oJ2xlc3NfcG9saWNlJykgfHwgZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYWR2YW5jZWRFcXVpcG1lbnQgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldEJvb2xlYW4oJ2FkdmFuY2VkX2VxdWlwbWVudCcpIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxDb3N0ID0gMDtcclxuICAgICAgICBsZXQgc3VjY2Vzc1Byb2JhYmlsaXR5ID0gMC4wNTtcclxuXHJcbiAgICAgICAgaWYgKGNhbWVyYXNPZmYpIHtcclxuICAgICAgICAgICAgdG90YWxDb3N0ICs9IDEwMDAwO1xyXG4gICAgICAgICAgICBzdWNjZXNzUHJvYmFiaWxpdHkgKz0gMC4wNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsZXNzUG9saWNlKSB7XHJcbiAgICAgICAgICAgIHRvdGFsQ29zdCArPSAxMDAwMDtcclxuICAgICAgICAgICAgc3VjY2Vzc1Byb2JhYmlsaXR5ICs9IDAuMDU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWR2YW5jZWRFcXVpcG1lbnQpIHtcclxuICAgICAgICAgICAgdG90YWxDb3N0ICs9IDEwMDAwO1xyXG4gICAgICAgICAgICBzdWNjZXNzUHJvYmFiaWxpdHkgKz0gMC4wNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmJhbGFuY2UgPCB0b3RhbENvc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oYE5vIHRpZW5lcyBzdWZpY2llbnRlcyBtb25lZGFzIHBhcmEgcGFnYXIgbGFzIG9wY2lvbmVzIHNlbGVjY2lvbmFkYXMuIE5lY2VzaXRhcyAke3RvdGFsQ29zdH0gbW9uZWRhcy5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5iYWxhbmNlIC09IHRvdGFsQ29zdDtcclxuICAgICAgICBkYXRhLmxhc3RDcmltZSA9IG5vdztcclxuXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IE1hdGgucmFuZG9tKCkgPCBzdWNjZXNzUHJvYmFiaWxpdHk7XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgY29uc3QgcmV3YXJkID0gcmV3YXJkcy5maW5kKHIgPT4gTWF0aC5yYW5kb20oKSA8IHIucHJvYmFiaWxpdHkpO1xyXG4gICAgICAgICAgICBjb25zdCBlYXJuZWQgPSByZXdhcmQuYW1vdW50O1xyXG4gICAgICAgICAgICBkYXRhLmJhbGFuY2UgKz0gZWFybmVkO1xyXG4gICAgICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdDcmltZW4gZXhpdG9zbycpLnNldERlc2NyaXB0aW9uKGBIYXMgY29tZXRpZG8gdW4gY3JpbWVuIHkgZ2FuYWRvICR7ZWFybmVkfSBtb25lZGFzLiBBaG9yYSB0aWVuZXMgJHtkYXRhLmJhbGFuY2V9IG1vbmVkYXMuYCkuc2V0Q29sb3IoJ0dyZWVuJyldIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhaWxNZXNzYWdlID0gZmFpbE1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZhaWxNZXNzYWdlcy5sZW5ndGgpXTtcclxuICAgICAgICAgICAgZGF0YS5iYWxhbmNlIC09IGZhaWxQZW5hbHR5O1xyXG4gICAgICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdDcmltZW4gZmFsbGlkbycpLnNldERlc2NyaXB0aW9uKGAke2ZhaWxNZXNzYWdlfSBIYXMgcGVyZGlkbyAke2ZhaWxQZW5hbHR5fSBtb25lZGFzLiBBaG9yYSB0aWVuZXMgJHtkYXRhLmJhbGFuY2V9IG1vbmVkYXMuYCkuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLGNBQWMsb0JBQW9CLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sVUFBVTtBQUVoQixRQUFNLFVBQVU7QUFBQSxNQUNaLEVBQUUsUUFBUSxLQUFTLGFBQWEsS0FBSztBQUFBLE1BQ3JDLEVBQUUsUUFBUSxLQUFRLGFBQWEsSUFBSTtBQUFBLE1BQ25DLEVBQUUsUUFBUSxNQUFRLGFBQWEsS0FBSztBQUFBLE1BQ3BDLEVBQUUsUUFBUSxLQUFRLGFBQWEsSUFBSTtBQUFBLE1BQ25DLEVBQUUsUUFBUSxLQUFPLGFBQWEsSUFBSTtBQUFBLElBQ3RDO0FBRUEsUUFBTSxlQUFlO0FBQUEsTUFDakI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUVB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