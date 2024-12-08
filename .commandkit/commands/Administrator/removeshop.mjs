import {
  require_shop
} from "../../chunk-5WFU5UF4.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Administrator/removeshop.js
var require_removeshop = __commonJS({
  "src/commands/Administrator/removeshop.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = __require("discord.js");
    var Shop = require_shop();
    module.exports = {
      data: new SlashCommandBuilder().setName("removeshop").setDescription("Elimina un rol de la tienda").setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator).addIntegerOption((option) => option.setName("roleindex").setDescription("N\xFAmero del rol que deseas eliminar (1-10)").setRequired(true)),
      run: async ({ interaction }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes permisos para usar este comando.").setColor("Red")] });
        }
        const roleIndex = interaction.options.getInteger("roleindex");
        if (roleIndex < 1 || roleIndex > 10) {
          return interaction.reply({ embeds: [embed.setDescription("N\xFAmero de rol inv\xE1lido. Debe estar entre 1 y 10.").setColor("Red")] });
        }
        let shopData = await Shop.findOne({ guildId: interaction.guild.id });
        if (!shopData || !shopData.roles || shopData.roles.length === 0) {
          return interaction.reply({ embeds: [embed.setDescription("No hay roles disponibles en la tienda.").setColor("Red")] });
        }
        if (roleIndex > shopData.roles.length) {
          return interaction.reply({ embeds: [embed.setDescription("N\xFAmero de rol inv\xE1lido.").setColor("Red")] });
        }
        const removedRole = shopData.roles.splice(roleIndex - 1, 1)[0];
        await shopData.save();
        embed.setTitle("Rol Eliminado").setDescription(`El rol con ID <@&${removedRole.id}> ha sido eliminado de la tienda.`).setColor("Green");
        interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_removeshop();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0FkbWluaXN0cmF0b3IvcmVtb3Zlc2hvcC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIsIFBlcm1pc3Npb25zQml0RmllbGQgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgU2hvcCA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9zaG9wJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgncmVtb3Zlc2hvcCcpXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oJ0VsaW1pbmEgdW4gcm9sIGRlIGxhIHRpZW5kYScpXHJcbiAgICAuc2V0RGVmYXVsdE1lbWJlclBlcm1pc3Npb25zKFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuQWRtaW5pc3RyYXRvcilcclxuICAgIC5hZGRJbnRlZ2VyT3B0aW9uKG9wdGlvbiA9PiBvcHRpb24uc2V0TmFtZSgncm9sZWluZGV4Jykuc2V0RGVzY3JpcHRpb24oJ05cdTAwRkFtZXJvIGRlbCByb2wgcXVlIGRlc2VhcyBlbGltaW5hciAoMS0xMCknKS5zZXRSZXF1aXJlZCh0cnVlKSksXHJcblxyXG4gIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24gfSkgPT4ge1xyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKCk7XHJcbiAgICBpZiAoIWludGVyYWN0aW9uLmd1aWxkKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5tZW1iZXIucGVybWlzc2lvbnMuaGFzKFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuQWRtaW5pc3RyYXRvcikpIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHVzYXIgZXN0ZSBjb21hbmRvLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgcm9sZUluZGV4ID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRJbnRlZ2VyKCdyb2xlaW5kZXgnKTtcclxuICAgIGlmIChyb2xlSW5kZXggPCAxIHx8IHJvbGVJbmRleCA+IDEwKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdOXHUwMEZBbWVybyBkZSByb2wgaW52XHUwMEUxbGlkby4gRGViZSBlc3RhciBlbnRyZSAxIHkgMTAuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2hvcERhdGEgPSBhd2FpdCBTaG9wLmZpbmRPbmUoeyBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuICAgIGlmICghc2hvcERhdGEgfHwgIXNob3BEYXRhLnJvbGVzIHx8IHNob3BEYXRhLnJvbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTm8gaGF5IHJvbGVzIGRpc3BvbmlibGVzIGVuIGxhIHRpZW5kYS4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyb2xlSW5kZXggPiBzaG9wRGF0YS5yb2xlcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05cdTAwRkFtZXJvIGRlIHJvbCBpbnZcdTAwRTFsaWRvLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlZFJvbGUgPSBzaG9wRGF0YS5yb2xlcy5zcGxpY2Uocm9sZUluZGV4IC0gMSwgMSlbMF07XHJcbiAgICBhd2FpdCBzaG9wRGF0YS5zYXZlKCk7XHJcblxyXG4gICAgZW1iZWQuc2V0VGl0bGUoJ1JvbCBFbGltaW5hZG8nKS5zZXREZXNjcmlwdGlvbihgRWwgcm9sIGNvbiBJRCA8QCYke3JlbW92ZWRSb2xlLmlkfT4gaGEgc2lkbyBlbGltaW5hZG8gZGUgbGEgdGllbmRhLmApLnNldENvbG9yKCdHcmVlbicpO1xyXG4gICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgfSxcclxufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixjQUFjLG9CQUFvQixJQUFJLFVBQVEsWUFBWTtBQUN2RixRQUFNLE9BQU87QUFFYixXQUFPLFVBQVU7QUFBQSxNQUNmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxZQUFZLEVBQ3BCLGVBQWUsNkJBQTZCLEVBQzVDLDRCQUE0QixvQkFBb0IsTUFBTSxhQUFhLEVBQ25FLGlCQUFpQixZQUFVLE9BQU8sUUFBUSxXQUFXLEVBQUUsZUFBZSw4Q0FBMkMsRUFBRSxZQUFZLElBQUksQ0FBQztBQUFBLE1BRXZJLEtBQUssT0FBTyxFQUFFLFlBQVksTUFBTTtBQUM5QixjQUFNLFFBQVEsSUFBSSxhQUFhO0FBQy9CLFlBQUksQ0FBQyxZQUFZLE9BQU87QUFDdEIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSxxREFBa0QsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUNqSTtBQUVBLFlBQUksQ0FBQyxZQUFZLE9BQU8sWUFBWSxJQUFJLG9CQUFvQixNQUFNLGFBQWEsR0FBRztBQUNoRixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLDRDQUE0QyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQzNIO0FBRUEsY0FBTSxZQUFZLFlBQVksUUFBUSxXQUFXLFdBQVc7QUFDNUQsWUFBSSxZQUFZLEtBQUssWUFBWSxJQUFJO0FBQ25DLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUsd0RBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDakk7QUFFQSxZQUFJLFdBQVcsTUFBTSxLQUFLLFFBQVEsRUFBRSxTQUFTLFlBQVksTUFBTSxHQUFHLENBQUM7QUFDbkUsWUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLFNBQVMsU0FBUyxNQUFNLFdBQVcsR0FBRztBQUMvRCxpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHdDQUF3QyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ3ZIO0FBRUEsWUFBSSxZQUFZLFNBQVMsTUFBTSxRQUFRO0FBQ3JDLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUsK0JBQXlCLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDeEc7QUFFQSxjQUFNLGNBQWMsU0FBUyxNQUFNLE9BQU8sWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzdELGNBQU0sU0FBUyxLQUFLO0FBRXBCLGNBQU0sU0FBUyxlQUFlLEVBQUUsZUFBZSxvQkFBb0IsWUFBWSxFQUFFLG1DQUFtQyxFQUFFLFNBQVMsT0FBTztBQUN0SSxvQkFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K