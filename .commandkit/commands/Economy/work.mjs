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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvd29yay5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvKiogQHR5cGUge2ltcG9ydCgnY29tbWFuZGtpdCcpLkNvbW1hbmREYXRhfSAgKi9cclxuICAgIGRhdGE6IG5ldyBTbGFzaENvbW1hbmRCdWlsZGVyKClcclxuICAgICAgICAuc2V0TmFtZSgnd29yaycpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdUcmFiYWphIHBhcmEgZ2FuYXIgbW9uZWRhcy4nKSxcclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge2ltcG9ydCgnY29tbWFuZGtpdCcpLlNsYXNoQ29tbWFuZFByb3BzfSBwYXJhbTBcclxuICAgICovXHJcbiAgICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VzdGUgY29tYW5kbyBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIGVuIHNlcnZpZG9yZXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGFzdFdvcmsgPSBkYXRhLmxhc3RXb3JrO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IG5vdyAtIGxhc3RXb3JrO1xyXG4gICAgICAgIGNvbnN0IGRpZmZNaW51dGVzID0gTWF0aC5mbG9vcihkaWZmIC8gMTAwMCAvIDYwKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZmZNaW51dGVzIDwgMzApIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlc0xlZnQgPSAzMCAtIGRpZmZNaW51dGVzO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXRUaXRsZSgnVHJhYmFqbycpLnNldERlc2NyaXB0aW9uKGBZYSBoYXMgdHJhYmFqYWRvIHJlY2llbnRlbWVudGUuIFB1ZWRlcyB0cmFiYWphciBkZSBudWV2byBlbiAke21pbnV0ZXNMZWZ0fSBtaW51dG9zLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhLmxhc3RXb3JrID0gbm93O1xyXG4gICAgICAgIGNvbnN0IGVhcm5lZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwMSkgKyAxMDA7XHJcbiAgICAgICAgZGF0YS5iYWxhbmNlICs9IGVhcm5lZDtcclxuICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXRUaXRsZSgnVHJhYmFqbycpLnNldERlc2NyaXB0aW9uKGBIYXMgdHJhYmFqYWRvIHkgZ2FuYWRvICR7ZWFybmVkfSBtb25lZGFzLiBBaG9yYSB0aWVuZXMgJHtkYXRhLmJhbGFuY2V9IG1vbmVkYXMuYCkuc2V0Q29sb3IoJ0dyZWVuJyldIH0pO1xyXG4gICAgXHJcbiAgICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFdBQU8sVUFBVTtBQUFBO0FBQUEsTUFFYixNQUFNLElBQUksb0JBQW9CLEVBQ3pCLFFBQVEsTUFBTSxFQUNkLGVBQWUsNkJBQTZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJakQsS0FBSyxPQUFPLEVBQUUsYUFBYSxRQUFRLFFBQVEsTUFBTTtBQUM3QyxjQUFNLFFBQVEsSUFBSSxhQUFhO0FBQy9CLFlBQUksQ0FBQyxZQUFZLE9BQU87QUFDcEIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSxxREFBa0QsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUNuSTtBQUVBLFlBQUksT0FBTyxNQUFNLFFBQVEsUUFBUSxFQUFFLFFBQVEsWUFBWSxLQUFLLElBQUksU0FBUyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBRS9GLFlBQUksQ0FBQyxNQUFNO0FBQ1AsaUJBQU8sSUFBSSxRQUFRO0FBQUEsWUFDZixRQUFRLFlBQVksS0FBSztBQUFBLFlBQ3pCLFNBQVMsWUFBWSxNQUFNO0FBQUEsVUFDL0IsQ0FBQztBQUNELGdCQUFNLEtBQUssS0FBSztBQUFBLFFBQ3BCO0FBRUEsY0FBTSxXQUFXLEtBQUs7QUFDdEIsY0FBTSxNQUFNLG9CQUFJLEtBQUs7QUFDckIsY0FBTSxPQUFPLE1BQU07QUFDbkIsY0FBTSxjQUFjLEtBQUssTUFBTSxPQUFPLE1BQU8sRUFBRTtBQUUvQyxZQUFJLGNBQWMsSUFBSTtBQUNsQixnQkFBTSxjQUFjLEtBQUs7QUFDekIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sU0FBUyxTQUFTLEVBQUUsZUFBZSwrREFBK0QsV0FBVyxXQUFXLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDMUw7QUFFQSxhQUFLLFdBQVc7QUFDaEIsY0FBTSxTQUFTLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxHQUFHLElBQUk7QUFDakQsYUFBSyxXQUFXO0FBQ2hCLGNBQU0sS0FBSyxLQUFLO0FBRWhCLG9CQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxTQUFTLFNBQVMsRUFBRSxlQUFlLDBCQUEwQixNQUFNLDBCQUEwQixLQUFLLE9BQU8sV0FBVyxFQUFFLFNBQVMsT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUFBLE1BRWpMO0FBQUEsSUFDSjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==