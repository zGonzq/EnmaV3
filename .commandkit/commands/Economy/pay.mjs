import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/pay.js
var require_pay = __commonJS({
  "src/commands/Economy/pay.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var economy = require_economy();
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("pay").setDescription("Paga a otro usuario una cantidad de monedas.").addUserOption((option) => option.setName("usuario").setDescription("El usuario al que le pagar\xE1s.").setRequired(true)).addIntegerOption((option) => option.setName("cantidad").setDescription("La cantidad de monedas que pagar\xE1s.").setRequired(true)),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const targetUser = interaction.options.getUser("usuario");
        const amount = interaction.options.getInteger("cantidad");
        if (targetUser.bot) {
          return interaction.reply({ embeds: [embed.setDescription("No puedes pagar a un bot.").setColor("Red")] });
        }
        if (amount <= 0) {
          return interaction.reply({ embeds: [embed.setDescription("La cantidad debe ser un n\xFAmero positivo.").setColor("Red")] });
        }
        let senderData = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        let receiverData = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });
        if (!senderData) {
          senderData = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id
          });
          await senderData.save();
        }
        if (!receiverData) {
          receiverData = new economy({
            userId: targetUser.id,
            guildId: interaction.guild.id
          });
          await receiverData.save();
        }
        if (senderData.balance < amount) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes suficientes monedas para realizar esta transacci\xF3n.").setColor("Red")] });
        }
        senderData.balance -= amount;
        receiverData.balance += amount;
        await senderData.save();
        await receiverData.save();
        interaction.reply({ embeds: [embed.setDescription(`Has pagado ${amount} monedas a ${targetUser.tag}.`).setColor("Green")] });
      }
    };
  }
});
export default require_pay();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvcGF5LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFNsYXNoQ29tbWFuZEJ1aWxkZXIsIEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5jb25zdCBlY29ub215ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2Vjb25vbXknKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gIGRhdGE6IG5ldyBTbGFzaENvbW1hbmRCdWlsZGVyKClcclxuICAgIC5zZXROYW1lKCdwYXknKVxyXG4gICAgLnNldERlc2NyaXB0aW9uKCdQYWdhIGEgb3RybyB1c3VhcmlvIHVuYSBjYW50aWRhZCBkZSBtb25lZGFzLicpXHJcblxyXG4gICAgLmFkZFVzZXJPcHRpb24ob3B0aW9uID0+IG9wdGlvblxyXG4gICAgICAgIC5zZXROYW1lKCd1c3VhcmlvJylcclxuICAgICAgICAuc2V0RGVzY3JpcHRpb24oJ0VsIHVzdWFyaW8gYWwgcXVlIGxlIHBhZ2FyXHUwMEUxcy4nKVxyXG4gICAgICAgIC5zZXRSZXF1aXJlZCh0cnVlKSlcclxuXHJcbiAgICAuYWRkSW50ZWdlck9wdGlvbihvcHRpb24gPT4gb3B0aW9uXHJcbiAgICAgICAgLnNldE5hbWUoJ2NhbnRpZGFkJylcclxuICAgICAgICAuc2V0RGVzY3JpcHRpb24oJ0xhIGNhbnRpZGFkIGRlIG1vbmVkYXMgcXVlIHBhZ2FyXHUwMEUxcy4nKVxyXG4gICAgICAgIC5zZXRSZXF1aXJlZCh0cnVlKSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAqL1xyXG4gIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24sIGNsaWVudCwgaGFuZGxlciB9KSA9PiB7XHJcblxyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKCk7XHJcbiAgICAgICAgaWYgKCFpbnRlcmFjdGlvbi5ndWlsZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignRXN0ZSBjb21hbmRvIHNvbG8gZXN0XHUwMEUxIGRpc3BvbmlibGUgZW4gc2Vydmlkb3Jlcy4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VXNlciA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0VXNlcigndXN1YXJpbycpO1xyXG4gICAgICAgIGNvbnN0IGFtb3VudCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0SW50ZWdlcignY2FudGlkYWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldFVzZXIuYm90KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdObyBwdWVkZXMgcGFnYXIgYSB1biBib3QuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhbW91bnQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTGEgY2FudGlkYWQgZGViZSBzZXIgdW4gblx1MDBGQW1lcm8gcG9zaXRpdm8uJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZW5kZXJEYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuICAgICAgICBsZXQgcmVjZWl2ZXJEYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiB0YXJnZXRVc2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFzZW5kZXJEYXRhKSB7XHJcbiAgICAgICAgICAgIHNlbmRlckRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHNlbmRlckRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFyZWNlaXZlckRhdGEpIHtcclxuICAgICAgICAgICAgcmVjZWl2ZXJEYXRhID0gbmV3IGVjb25vbXkoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0YXJnZXRVc2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhd2FpdCByZWNlaXZlckRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbmRlckRhdGEuYmFsYW5jZSA8IGFtb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTm8gdGllbmVzIHN1ZmljaWVudGVzIG1vbmVkYXMgcGFyYSByZWFsaXphciBlc3RhIHRyYW5zYWNjaVx1MDBGM24uJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbmRlckRhdGEuYmFsYW5jZSAtPSBhbW91bnQ7XHJcbiAgICAgICAgcmVjZWl2ZXJEYXRhLmJhbGFuY2UgKz0gYW1vdW50O1xyXG5cclxuICAgICAgICBhd2FpdCBzZW5kZXJEYXRhLnNhdmUoKTtcclxuICAgICAgICBhd2FpdCByZWNlaXZlckRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgICBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKGBIYXMgcGFnYWRvICR7YW1vdW50fSBtb25lZGFzIGEgJHt0YXJnZXRVc2VyLnRhZ30uYCkuc2V0Q29sb3IoJ0dyZWVuJyldIH0pO1xyXG4gICAgfSxcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU0sRUFBRSxxQkFBcUIsYUFBYSxJQUFJLFVBQVEsWUFBWTtBQUNsRSxRQUFNLFVBQVU7QUFFaEIsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUVmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxLQUFLLEVBQ2IsZUFBZSw4Q0FBOEMsRUFFN0QsY0FBYyxZQUFVLE9BQ3BCLFFBQVEsU0FBUyxFQUNqQixlQUFlLGtDQUErQixFQUM5QyxZQUFZLElBQUksQ0FBQyxFQUVyQixpQkFBaUIsWUFBVSxPQUN2QixRQUFRLFVBQVUsRUFDbEIsZUFBZSx3Q0FBcUMsRUFDcEQsWUFBWSxJQUFJLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUt4QixLQUFLLE9BQU8sRUFBRSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBRS9DLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDM0IsWUFBSSxDQUFDLFlBQVksT0FBTztBQUNwQixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHFEQUFrRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ25JO0FBRUEsY0FBTSxhQUFhLFlBQVksUUFBUSxRQUFRLFNBQVM7QUFDeEQsY0FBTSxTQUFTLFlBQVksUUFBUSxXQUFXLFVBQVU7QUFFeEQsWUFBSSxXQUFXLEtBQUs7QUFDaEIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSwyQkFBMkIsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUM1RztBQUVBLFlBQUksVUFBVSxHQUFHO0FBQ2IsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSw2Q0FBMEMsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUMzSDtBQUVBLFlBQUksYUFBYSxNQUFNLFFBQVEsUUFBUSxFQUFFLFFBQVEsWUFBWSxLQUFLLElBQUksU0FBUyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQ3JHLFlBQUksZUFBZSxNQUFNLFFBQVEsUUFBUSxFQUFFLFFBQVEsV0FBVyxJQUFJLFNBQVMsWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUVqRyxZQUFJLENBQUMsWUFBWTtBQUNiLHVCQUFhLElBQUksUUFBUTtBQUFBLFlBQ3JCLFFBQVEsWUFBWSxLQUFLO0FBQUEsWUFDekIsU0FBUyxZQUFZLE1BQU07QUFBQSxVQUMvQixDQUFDO0FBQ0QsZ0JBQU0sV0FBVyxLQUFLO0FBQUEsUUFDMUI7QUFFQSxZQUFJLENBQUMsY0FBYztBQUNmLHlCQUFlLElBQUksUUFBUTtBQUFBLFlBQ3ZCLFFBQVEsV0FBVztBQUFBLFlBQ25CLFNBQVMsWUFBWSxNQUFNO0FBQUEsVUFDL0IsQ0FBQztBQUNELGdCQUFNLGFBQWEsS0FBSztBQUFBLFFBQzVCO0FBRUEsWUFBSSxXQUFXLFVBQVUsUUFBUTtBQUM3QixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLGtFQUErRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ2hKO0FBRUEsbUJBQVcsV0FBVztBQUN0QixxQkFBYSxXQUFXO0FBRXhCLGNBQU0sV0FBVyxLQUFLO0FBQ3RCLGNBQU0sYUFBYSxLQUFLO0FBRXhCLG9CQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLGNBQWMsTUFBTSxjQUFjLFdBQVcsR0FBRyxHQUFHLEVBQUUsU0FBUyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQUEsTUFDL0g7QUFBQSxJQUNKO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K