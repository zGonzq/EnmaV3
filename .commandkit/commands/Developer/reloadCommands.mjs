import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Developer/reloadCommands.js
var require_reloadCommands = __commonJS({
  "src/commands/Developer/reloadCommands.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("reload").setDescription("Recarga algunos archivos del bot").addSubcommand((subcommand) => subcommand.setName("all").setDescription("Recarga todos los archivos")).addSubcommand((subcommand) => subcommand.setName("events").setDescription("Recarga todos los eventos")).addSubcommand((subcommand) => subcommand.setName("commands").setDescription("Recarga todos los comandos")),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        const subCommand = interaction.options.getSubcommand();
        if (subCommand === "all") {
          embed.setDescription("Todos los archivos han sido recargados.");
          interaction.reply({ embeds: [embed] });
          await handler.reloadCommands();
          await handler.reloadEvents();
          await handler.reloadValidations();
        } else if (subCommand === "events") {
          embed.setDescription("Los eventos han sido recargados.");
          interaction.reply({ embeds: [embed] });
          await handler.reloadEvents();
        } else if (subCommand === "commands") {
          embed.setDescription("Los comandos han sido recargados.");
          interaction.reply({ embeds: [embed] });
          await handler.reloadCommands();
        }
      },
      /** @type {import('commandkit').CommandOptions} */
      options: {
        devOnly: true
      }
    };
  }
});
export default require_reloadCommands();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0RldmVsb3Blci9yZWxvYWRDb21tYW5kcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgLnNldE5hbWUoJ3JlbG9hZCcpXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oJ1JlY2FyZ2EgYWxndW5vcyBhcmNoaXZvcyBkZWwgYm90JylcclxuICAgIC5hZGRTdWJjb21tYW5kKChzdWJjb21tYW5kKSA9PiBzdWJjb21tYW5kXHJcbiAgICAgIC5zZXROYW1lKCdhbGwnKVxyXG4gICAgICAuc2V0RGVzY3JpcHRpb24oJ1JlY2FyZ2EgdG9kb3MgbG9zIGFyY2hpdm9zJykpXHJcbiAgICAuYWRkU3ViY29tbWFuZCgoc3ViY29tbWFuZCkgPT4gc3ViY29tbWFuZFxyXG4gICAgICAuc2V0TmFtZSgnZXZlbnRzJylcclxuICAgICAgLnNldERlc2NyaXB0aW9uKCdSZWNhcmdhIHRvZG9zIGxvcyBldmVudG9zJykpXHJcbiAgICAuYWRkU3ViY29tbWFuZCgoc3ViY29tbWFuZCkgPT4gc3ViY29tbWFuZFxyXG4gICAgICAuc2V0TmFtZSgnY29tbWFuZHMnKVxyXG4gICAgICAuc2V0RGVzY3JpcHRpb24oJ1JlY2FyZ2EgdG9kb3MgbG9zIGNvbWFuZG9zJykpLFxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICovXHJcbiAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuXHJcbiAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcclxuXHJcbiAgICBjb25zdCBzdWJDb21tYW5kID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRTdWJjb21tYW5kKCk7IFxyXG5cclxuICAgIGlmIChzdWJDb21tYW5kID09PSAnYWxsJykge1xyXG4gICAgICAgIGVtYmVkLnNldERlc2NyaXB0aW9uKCdUb2RvcyBsb3MgYXJjaGl2b3MgaGFuIHNpZG8gcmVjYXJnYWRvcy4nKTtcclxuICAgICAgICBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICAgICAgICBhd2FpdCBoYW5kbGVyLnJlbG9hZENvbW1hbmRzKCk7XHJcbiAgICAgICAgYXdhaXQgaGFuZGxlci5yZWxvYWRFdmVudHMoKTtcclxuICAgICAgICBhd2FpdCBoYW5kbGVyLnJlbG9hZFZhbGlkYXRpb25zKCk7XHJcblxyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKHN1YkNvbW1hbmQgPT09ICdldmVudHMnKSB7XHJcbiAgICAgICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0xvcyBldmVudG9zIGhhbiBzaWRvIHJlY2FyZ2Fkb3MuJyk7XHJcbiAgICAgICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgICAgICAgYXdhaXQgaGFuZGxlci5yZWxvYWRFdmVudHMoKTtcclxuXHJcblxyXG4gICAgfSBlbHNlIGlmIChzdWJDb21tYW5kID09PSAnY29tbWFuZHMnKSB7XHJcbiAgICAgICAgICAgICAgICBlbWJlZC5zZXREZXNjcmlwdGlvbignTG9zIGNvbWFuZG9zIGhhbiBzaWRvIHJlY2FyZ2Fkb3MuJyk7XHJcbiAgICAgICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgICAgICAgYXdhaXQgaGFuZGxlci5yZWxvYWRDb21tYW5kcygpO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gIH0sXHJcbiAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kT3B0aW9uc30gKi9cclxuICBvcHRpb25zOiB7XHJcbiAgICBkZXZPbmx5OiB0cnVlLFxyXG4gIH0sXHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUVmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxRQUFRLEVBQ2hCLGVBQWUsa0NBQWtDLEVBQ2pELGNBQWMsQ0FBQyxlQUFlLFdBQzVCLFFBQVEsS0FBSyxFQUNiLGVBQWUsNEJBQTRCLENBQUMsRUFDOUMsY0FBYyxDQUFDLGVBQWUsV0FDNUIsUUFBUSxRQUFRLEVBQ2hCLGVBQWUsMkJBQTJCLENBQUMsRUFDN0MsY0FBYyxDQUFDLGVBQWUsV0FDNUIsUUFBUSxVQUFVLEVBQ2xCLGVBQWUsNEJBQTRCLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1qRCxLQUFLLE9BQU8sRUFBRSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBRS9DLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFFL0IsY0FBTSxhQUFhLFlBQVksUUFBUSxjQUFjO0FBRXJELFlBQUksZUFBZSxPQUFPO0FBQ3RCLGdCQUFNLGVBQWUseUNBQXlDO0FBQzlELHNCQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsZ0JBQU0sUUFBUSxlQUFlO0FBQzdCLGdCQUFNLFFBQVEsYUFBYTtBQUMzQixnQkFBTSxRQUFRLGtCQUFrQjtBQUFBLFFBSXBDLFdBQVcsZUFBZSxVQUFVO0FBQ2hDLGdCQUFNLGVBQWUsa0NBQWtDO0FBQ3ZELHNCQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckMsZ0JBQU0sUUFBUSxhQUFhO0FBQUEsUUFHL0IsV0FBVyxlQUFlLFlBQVk7QUFDMUIsZ0JBQU0sZUFBZSxtQ0FBbUM7QUFDaEUsc0JBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQyxnQkFBTSxRQUFRLGVBQWU7QUFBQSxRQUVqQztBQUFBLE1BRUY7QUFBQTtBQUFBLE1BRUEsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K