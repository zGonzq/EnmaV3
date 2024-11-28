import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Moderation/timeout.js
var require_timeout = __commonJS({
  "src/commands/Moderation/timeout.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("timeout").setDescription("Silencia a un usuario").addUserOption((option) => option.setName("usuario").setDescription("El usuario al que quieres silenciar").setRequired(true)).addStringOption((option) => option.setName("tiempo").setDescription("El tiempo que durar\xE1 el silencio").setRequired(true)).addStringOption((option) => option.setName("razon").setDescription("La raz\xF3n del silencio").setRequired(false)).setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const user = interaction.options.getUser("usuario");
        const time = interaction.options.getString("tiempo");
        const reason = interaction.options.getString("razon") || "No especificada.";
        const member = await interaction.guild.members.fetch(user);
        const msDuration = ms(time);
        if (isNaN(msDuration)) {
          await interaction.editReply("El tiempo ingresado no es v\xE1lido.");
        }
        if (msDuration < 5e3 || msDuration > 2419e6) {
          await interaction.editReply("El tiempo ingresado debe ser mayor a 5 segundos y menor a 28 d\xEDas.");
          return;
        }
        if (!member) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription("El usuario no existe.").setColor("Red")],
            ephemeral: true
          });
        }
        if (member.id === interaction.guild.ownerId) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedo poner en "time out" al due\xF1o del servidor.').setColor("Red")],
            ephemeral: true
          });
        }
        if (member.id === interaction.user.id) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedes ponerte en "time out" a ti mismo.').setColor("Red")],
            ephemeral: true
          });
        }
        if (member.user.bot) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedo poner en "time out" a un bot.').setColor("Red")],
            ephemeral: true
          });
        }
        if (member.permissions.has(PermissionFlagsBits.MuteMembers)) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedo poner en "time out" a este usuario.').setColor("Red")],
            ephemeral: true
          });
        }
        if (member.permissions.has(PermissionFlagsBits.Administrator)) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedo poner en "time out" a este usuario.').setColor("Red")],
            ephemeral: true
          });
        }
        if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Error").setDescription('No puedes poner en "time out" a este usuario.').setColor("Red")],
            ephemeral: true
          });
        }
        try {
          const { default: prettyMs } = await import("pretty-ms");
          if (member.isCommunicationDisabled()) {
            await member.timeout(msDuration, reason);
            return interaction.reply({
              embeds: [new EmbedBuilder().setTitle("Time out").setDescription(`El usuario ${member} ya estaba en "time out", pero se ha actualizado por ${prettyMs(msDuration, { verbose: true })}.`).setColor("Random")]
            });
          }
          await member.timeout(msDuration, reason);
          return interaction.reply({
            embeds: [new EmbedBuilder().setTitle("Time out").setDescription(`El usuario ${member} ha sido puesto en "time out" por ${prettyMs(msDuration, { verbose: true })}.`).setColor("Random")]
          });
        } catch (error) {
          console.log(`Sucedio un error al ejecutar el comando: ${error}`);
        }
      },
      /** @type {import('commandkit').CommandOptions} */
      options: {
        botPermissions: ["MuteMembers"]
      }
    };
  }
});
export default require_timeout();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL01vZGVyYXRpb24vdGltZW91dC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIsIFBlcm1pc3Npb25GbGFnc0JpdHMgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgLnNldE5hbWUoJ3RpbWVvdXQnKVxyXG4gICAgLnNldERlc2NyaXB0aW9uKCdTaWxlbmNpYSBhIHVuIHVzdWFyaW8nKVxyXG4gICAgLmFkZFVzZXJPcHRpb24oKG9wdGlvbikgPT4gb3B0aW9uXHJcbiAgICAgIC5zZXROYW1lKCd1c3VhcmlvJylcclxuICAgICAgLnNldERlc2NyaXB0aW9uKCdFbCB1c3VhcmlvIGFsIHF1ZSBxdWllcmVzIHNpbGVuY2lhcicpXHJcbiAgICAgIC5zZXRSZXF1aXJlZCh0cnVlKSlcclxuICAgIC5hZGRTdHJpbmdPcHRpb24oKG9wdGlvbikgPT4gb3B0aW9uXHJcbiAgICAgICAgLnNldE5hbWUoJ3RpZW1wbycpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdFbCB0aWVtcG8gcXVlIGR1cmFyXHUwMEUxIGVsIHNpbGVuY2lvJylcclxuICAgICAgICAuc2V0UmVxdWlyZWQodHJ1ZSkpXHJcbiAgICAuYWRkU3RyaW5nT3B0aW9uKChvcHRpb24pID0+IG9wdGlvblxyXG4gICAgICAgIC5zZXROYW1lKCdyYXpvbicpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdMYSByYXpcdTAwRjNuIGRlbCBzaWxlbmNpbycpXHJcbiAgICAgICAgLnNldFJlcXVpcmVkKGZhbHNlKSlcclxuICAgIC5zZXREZWZhdWx0TWVtYmVyUGVybWlzc2lvbnMoUGVybWlzc2lvbkZsYWdzQml0cy5NdXRlTWVtYmVycyksXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICovXHJcbiAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuXHJcblxyXG4gICAgY29uc3QgdXNlciA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0VXNlcihcInVzdWFyaW9cIik7XHJcbiAgICBjb25zdCB0aW1lID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdHJpbmcoXCJ0aWVtcG9cIik7XHJcbiAgICBjb25zdCByZWFzb24gPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldFN0cmluZyhcInJhem9uXCIpIHx8ICdObyBlc3BlY2lmaWNhZGEuJztcclxuXHJcbiAgICBjb25zdCBtZW1iZXIgPSBhd2FpdCBpbnRlcmFjdGlvbi5ndWlsZC5tZW1iZXJzLmZldGNoKHVzZXIpO1xyXG5cclxuICAgIGNvbnN0IG1zRHVyYXRpb24gPSBtcyh0aW1lKTtcclxuICAgIGlmIChpc05hTihtc0R1cmF0aW9uKSkge1xyXG4gICAgICBhd2FpdCBpbnRlcmFjdGlvbi5lZGl0UmVwbHkoJ0VsIHRpZW1wbyBpbmdyZXNhZG8gbm8gZXMgdlx1MDBFMWxpZG8uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1zRHVyYXRpb24gPCA1MDAwIHx8IG1zRHVyYXRpb24gPiAyLjQxOWU5KSB7XHJcbiAgICAgIGF3YWl0IGludGVyYWN0aW9uLmVkaXRSZXBseSgnRWwgdGllbXBvIGluZ3Jlc2FkbyBkZWJlIHNlciBtYXlvciBhIDUgc2VndW5kb3MgeSBtZW5vciBhIDI4IGRcdTAwRURhcy4nKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbWVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHtcclxuICAgICAgICAgICAgZW1iZWRzOiBbbmV3IEVtYmVkQnVpbGRlcigpLnNldFRpdGxlKCdFcnJvcicpLnNldERlc2NyaXB0aW9uKCdFbCB1c3VhcmlvIG5vIGV4aXN0ZS4nKS5zZXRDb2xvcignUmVkJyldLFxyXG4gICAgICAgICAgICBlcGhlbWVyYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1lbWJlci5pZCA9PT0gaW50ZXJhY3Rpb24uZ3VpbGQub3duZXJJZCkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7XHJcbiAgICAgICAgICAgIGVtYmVkczogW25ldyBFbWJlZEJ1aWxkZXIoKS5zZXRUaXRsZSgnRXJyb3InKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZG8gcG9uZXIgZW4gXCJ0aW1lIG91dFwiIGFsIGR1ZVx1MDBGMW8gZGVsIHNlcnZpZG9yLicpLnNldENvbG9yKCdSZWQnKV0sXHJcbiAgICAgICAgICAgIGVwaGVtZXJhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVtYmVyLmlkID09PSBpbnRlcmFjdGlvbi51c2VyLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHtcclxuICAgICAgICAgICAgZW1iZWRzOiBbbmV3IEVtYmVkQnVpbGRlcigpLnNldFRpdGxlKCdFcnJvcicpLnNldERlc2NyaXB0aW9uKCdObyBwdWVkZXMgcG9uZXJ0ZSBlbiBcInRpbWUgb3V0XCIgYSB0aSBtaXNtby4nKS5zZXRDb2xvcignUmVkJyldLFxyXG4gICAgICAgICAgICBlcGhlbWVyYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1lbWJlci51c2VyLmJvdCkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7XHJcbiAgICAgICAgICAgIGVtYmVkczogW25ldyBFbWJlZEJ1aWxkZXIoKS5zZXRUaXRsZSgnRXJyb3InKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZG8gcG9uZXIgZW4gXCJ0aW1lIG91dFwiIGEgdW4gYm90LicpLnNldENvbG9yKCdSZWQnKV0sXHJcbiAgICAgICAgICAgIGVwaGVtZXJhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVtYmVyLnBlcm1pc3Npb25zLmhhcyhQZXJtaXNzaW9uRmxhZ3NCaXRzLk11dGVNZW1iZXJzKSkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7XHJcbiAgICAgICAgICAgIGVtYmVkczogW25ldyBFbWJlZEJ1aWxkZXIoKS5zZXRUaXRsZSgnRXJyb3InKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZG8gcG9uZXIgZW4gXCJ0aW1lIG91dFwiIGEgZXN0ZSB1c3VhcmlvLicpLnNldENvbG9yKCdSZWQnKV0sXHJcbiAgICAgICAgICAgIGVwaGVtZXJhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWVtYmVyLnBlcm1pc3Npb25zLmhhcyhQZXJtaXNzaW9uRmxhZ3NCaXRzLkFkbWluaXN0cmF0b3IpKSB7XHJcbiAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHtcclxuICAgICAgICAgICAgZW1iZWRzOiBbbmV3IEVtYmVkQnVpbGRlcigpLnNldFRpdGxlKCdFcnJvcicpLnNldERlc2NyaXB0aW9uKCdObyBwdWVkbyBwb25lciBlbiBcInRpbWUgb3V0XCIgYSBlc3RlIHVzdWFyaW8uJykuc2V0Q29sb3IoJ1JlZCcpXSxcclxuICAgICAgICAgICAgZXBoZW1lcmFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbnRlcmFjdGlvbi5tZW1iZXIucm9sZXMuaGlnaGVzdC5jb21wYXJlUG9zaXRpb25UbyhtZW1iZXIucm9sZXMuaGlnaGVzdCkgPD0gMCkge1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7XHJcbiAgICAgICAgICAgIGVtYmVkczogW25ldyBFbWJlZEJ1aWxkZXIoKS5zZXRUaXRsZSgnRXJyb3InKS5zZXREZXNjcmlwdGlvbignTm8gcHVlZGVzIHBvbmVyIGVuIFwidGltZSBvdXRcIiBhIGVzdGUgdXN1YXJpby4nKS5zZXRDb2xvcignUmVkJyldLFxyXG4gICAgICAgICAgICBlcGhlbWVyYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IGRlZmF1bHQ6IHByZXR0eU1zIH0gPSBhd2FpdCBpbXBvcnQoJ3ByZXR0eS1tcycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtZW1iZXIuaXNDb21tdW5pY2F0aW9uRGlzYWJsZWQoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCBtZW1iZXIudGltZW91dChtc0R1cmF0aW9uLCByZWFzb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoe1xyXG4gICAgICAgICAgICAgICAgZW1iZWRzOiBbbmV3IEVtYmVkQnVpbGRlcigpLnNldFRpdGxlKCdUaW1lIG91dCcpLnNldERlc2NyaXB0aW9uKGBFbCB1c3VhcmlvICR7bWVtYmVyfSB5YSBlc3RhYmEgZW4gXCJ0aW1lIG91dFwiLCBwZXJvIHNlIGhhIGFjdHVhbGl6YWRvIHBvciAke3ByZXR0eU1zKG1zRHVyYXRpb24sIHsgdmVyYm9zZTogdHJ1ZSB9KX0uYCkuc2V0Q29sb3IoJ1JhbmRvbScpXSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBtZW1iZXIudGltZW91dChtc0R1cmF0aW9uLCByZWFzb24pO1xyXG4gICAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7XHJcbiAgICAgICAgICAgIGVtYmVkczogW25ldyBFbWJlZEJ1aWxkZXIoKS5zZXRUaXRsZSgnVGltZSBvdXQnKS5zZXREZXNjcmlwdGlvbihgRWwgdXN1YXJpbyAke21lbWJlcn0gaGEgc2lkbyBwdWVzdG8gZW4gXCJ0aW1lIG91dFwiIHBvciAke3ByZXR0eU1zKG1zRHVyYXRpb24sIHsgdmVyYm9zZTogdHJ1ZSB9KX0uYCkuc2V0Q29sb3IoJ1JhbmRvbScpXSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTdWNlZGlvIHVuIGVycm9yIGFsIGVqZWN1dGFyIGVsIGNvbWFuZG86ICR7ZXJyb3J9YCk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZE9wdGlvbnN9ICovXHJcbiAgb3B0aW9uczoge1xyXG4gICAgYm90UGVybWlzc2lvbnM6IFsnTXV0ZU1lbWJlcnMnXSxcclxuICB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixjQUFjLG9CQUFvQixJQUFJLFVBQVEsWUFBWTtBQUN2RixXQUFPLFVBQVU7QUFBQTtBQUFBLE1BRWYsTUFBTSxJQUFJLG9CQUFvQixFQUMzQixRQUFRLFNBQVMsRUFDakIsZUFBZSx1QkFBdUIsRUFDdEMsY0FBYyxDQUFDLFdBQVcsT0FDeEIsUUFBUSxTQUFTLEVBQ2pCLGVBQWUscUNBQXFDLEVBQ3BELFlBQVksSUFBSSxDQUFDLEVBQ25CLGdCQUFnQixDQUFDLFdBQVcsT0FDeEIsUUFBUSxRQUFRLEVBQ2hCLGVBQWUscUNBQWtDLEVBQ2pELFlBQVksSUFBSSxDQUFDLEVBQ3JCLGdCQUFnQixDQUFDLFdBQVcsT0FDeEIsUUFBUSxPQUFPLEVBQ2YsZUFBZSwwQkFBdUIsRUFDdEMsWUFBWSxLQUFLLENBQUMsRUFDdEIsNEJBQTRCLG9CQUFvQixXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJOUQsS0FBSyxPQUFPLEVBQUUsYUFBYSxRQUFRLFFBQVEsTUFBTTtBQUcvQyxjQUFNLE9BQU8sWUFBWSxRQUFRLFFBQVEsU0FBUztB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