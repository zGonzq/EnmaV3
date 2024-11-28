import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/coinflip.js
var require_coinflip = __commonJS({
  "src/commands/Economy/coinflip.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("coinflip").setDescription("Apuesta monedas en un lanzamiento de moneda.").addIntegerOption((option) => option.setName("cantidad").setDescription("La cantidad de monedas que quieres apostar.").setRequired(true)),
      /**
      * @param {import('commandkit').SlashCommandProps} param0
      */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const amount = interaction.options.getInteger("cantidad");
        if (amount < 2) {
          return interaction.reply({ embeds: [embed.setDescription("La cantidad m\xEDnima para apostar es de 2 monedas.").setColor("Red")] });
        }
        let data = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        if (!data) {
          data = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id
          });
          await data.save();
        }
        if (data.balance < amount) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes suficientes monedas para hacer esta apuesta.").setColor("Red")] });
        }
        const lastCoinflip = data.lastCoinflip;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastCoinflip;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 10) {
          const minutesLeft = 10 - diffMinutes;
          return interaction.reply({ embeds: [embed.setDescription(`Ya has hecho un lanzamiento de moneda recientemente. Puedes intentarlo de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        data.lastCoinflip = now;
        const win = Math.random() < 0.6;
        if (win) {
          const winnings = amount * 2;
          data.balance += winnings;
          await data.save();
          return interaction.reply({ embeds: [embed.setTitle("\xA1Has ganado!").setDescription(`Has ganado ${winnings} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Green")] });
        } else {
          data.balance -= amount;
          await data.save();
          return interaction.reply({ embeds: [embed.setTitle("Has perdido").setDescription(`Has perdido ${amount} monedas. Ahora tienes ${data.balance} monedas.`).setColor("Red")] });
        }
      }
    };
  }
});
export default require_coinflip();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvY29pbmZsaXAuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2xhc2hDb21tYW5kQnVpbGRlciwgRW1iZWRCdWlsZGVyIH0gPSByZXF1aXJlKCdkaXNjb3JkLmpzJyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAgICAgLnNldE5hbWUoJ2NvaW5mbGlwJylcclxuICAgICAgICAuc2V0RGVzY3JpcHRpb24oJ0FwdWVzdGEgbW9uZWRhcyBlbiB1biBsYW56YW1pZW50byBkZSBtb25lZGEuJylcclxuICAgICAgICAuYWRkSW50ZWdlck9wdGlvbihvcHRpb24gPT4gb3B0aW9uLnNldE5hbWUoJ2NhbnRpZGFkJykuc2V0RGVzY3JpcHRpb24oJ0xhIGNhbnRpZGFkIGRlIG1vbmVkYXMgcXVlIHF1aWVyZXMgYXBvc3Rhci4nKS5zZXRSZXF1aXJlZCh0cnVlKSksXHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICAqL1xyXG4gICAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuICAgICAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcclxuICAgICAgICBpZiAoIWludGVyYWN0aW9uLmd1aWxkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbW91bnQgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldEludGVnZXIoJ2NhbnRpZGFkJyk7XHJcbiAgICAgICAgaWYgKGFtb3VudCA8IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0xhIGNhbnRpZGFkIG1cdTAwRURuaW1hIHBhcmEgYXBvc3RhciBlcyBkZSAyIG1vbmVkYXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEuYmFsYW5jZSA8IGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTm8gdGllbmVzIHN1ZmljaWVudGVzIG1vbmVkYXMgcGFyYSBoYWNlciBlc3RhIGFwdWVzdGEuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RDb2luZmxpcCA9IGRhdGEubGFzdENvaW5mbGlwO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IG5vdyAtIGxhc3RDb2luZmxpcDtcclxuICAgICAgICBjb25zdCBkaWZmTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCk7XHJcblxyXG4gICAgICAgIGlmIChkaWZmTWludXRlcyA8IDEwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXNMZWZ0ID0gMTAgLSBkaWZmTWludXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oYFlhIGhhcyBoZWNobyB1biBsYW56YW1pZW50byBkZSBtb25lZGEgcmVjaWVudGVtZW50ZS4gUHVlZGVzIGludGVudGFybG8gZGUgbnVldm8gZW4gJHttaW51dGVzTGVmdH0gbWludXRvcy5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5sYXN0Q29pbmZsaXAgPSBub3c7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpbiA9IE1hdGgucmFuZG9tKCkgPCAwLjY7IFxyXG4gICAgICAgIGlmICh3aW4pIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lubmluZ3MgPSBhbW91bnQgKiAyO1xyXG4gICAgICAgICAgICBkYXRhLmJhbGFuY2UgKz0gd2lubmluZ3M7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1x1MDBBMUhhcyBnYW5hZG8hJykuc2V0RGVzY3JpcHRpb24oYEhhcyBnYW5hZG8gJHt3aW5uaW5nc30gbW9uZWRhcy4gQWhvcmEgdGllbmVzICR7ZGF0YS5iYWxhbmNlfSBtb25lZGFzLmApLnNldENvbG9yKCdHcmVlbicpXSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhLmJhbGFuY2UgLT0gYW1vdW50O1xyXG4gICAgICAgICAgICBhd2FpdCBkYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdIYXMgcGVyZGlkbycpLnNldERlc2NyaXB0aW9uKGBIYXMgcGVyZGlkbyAke2Ftb3VudH0gbW9uZWRhcy4gQWhvcmEgdGllbmVzICR7ZGF0YS5iYWxhbmNlfSBtb25lZGFzLmApLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUViLE1BQU0sSUFBSSxvQkFBb0IsRUFDekIsUUFBUSxVQUFVLEVBQ2xCLGVBQWUsOENBQThDLEVBQzdELGlCQUFpQixZQUFVLE9BQU8sUUFBUSxVQUFVLEVBQUUsZUFBZSw2Q0FBNkMsRUFBRSxZQUFZLElBQUksQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSTFJLEtBQUssT0FBTyxFQUFFLGFBQWEsUUFBUSxRQUFRLE1BQU07QUFDN0MsY0FBTSxRQUFRLElBQUksYUFBYTtBQUMvQixZQUFJLENBQUMsWUFBWSxPQUFPO0FBQ3BCLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUscURBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbkk7QUFFQSxjQUFNLFNBQVMsWUFBWSxRQUFRLFdBQVcsVUFBVTtBQUN4RCxZQUFJLFNBQVMsR0FBRztBQUNaLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUscURBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbkk7QUFFQSxZQUFJLE9BQU8sTUFBTSxRQUFRLFFBQVEsRUFBRSxRQUFRLFlBQVksS0FBSyxJQUFJLFNBQVMsWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUUvRixZQUFJLENBQUMsTUFBTTtBQUNQLGlCQUFPLElBQUksUUFBUTtBQUFBLFlBQ2YsUUFBUSxZQUFZLEtBQUs7QUFBQSxZQUN6QixTQUFTLFlBQVksTUFBTTtBQUFBLFVBQy9CLENBQUM7QUFDRCxnQkFBTSxLQUFLLEtBQUs7QUFBQSxRQUNwQjtBQUVBLFlBQUksS0FBSyxVQUFVLFFBQVE7QUFDdkIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSx3REFBd0QsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUN6STtBQUVBLGNBQU0sZUFBZSxLQUFLO0FBQzFCLGNBQU0sTUFBTSxvQkFBSSxLQUFLO0FBQ3JCLGNBQU0sT0FBTyxNQUFNO0FBQ25CLGNBQU0sY0FBYyxLQUFLLE1BQU0sT0FBTyxNQUFPLEVBQUU7QUFFL0MsWUFBSSxjQUFjLElBQUk7QUFDbEIsZ0JBQU0sY0FBYyxLQUFLO0FBQ3pCLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUsc0ZBQXNGLFdBQVcsV0FBVyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQzdMO0FBRUEsYUFBSyxlQUFlO0FBRXBCLGNBQU0sTUFBTSxLQUFLLE9BQU8sSUFBSTtBQUM1QixZQUFJLEtBQUs7QUFDTCxnQkFBTSxXQUFXLFNBQVM7QUFDMUIsZUFBSyxXQUFXO0FBQ2hCLGdCQUFNLEtBQUssS0FBSztBQUVoQixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxTQUFTLGlCQUFjLEVBQUUsZUFBZSxjQUFjLFFBQVEsMEJBQTBCLEtBQUssT0FBTyxXQUFXLEVBQUUsU0FBUyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbkwsT0FBTztBQUNILGVBQUssV0FBVztBQUNoQixnQkFBTSxLQUFLLEtBQUs7QUFFaEIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sU0FBUyxhQUFhLEVBQUUsZUFBZSxlQUFlLE1BQU0sMEJBQTBCLEtBQUssT0FBTyxXQUFXLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDL0s7QUFBQSxNQUNKO0FBQUEsSUFFSjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==