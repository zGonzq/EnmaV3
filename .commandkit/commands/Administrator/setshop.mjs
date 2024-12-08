import {
  require_shop
} from "../../chunk-5WFU5UF4.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Administrator/setshop.js
var require_setshop = __commonJS({
  "src/commands/Administrator/setshop.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = __require("discord.js");
    var Shop = require_shop();
    module.exports = {
      data: new SlashCommandBuilder().setName("setshop").setDescription("Agrega un rol a la tienda").addRoleOption((option) => option.setName("role").setDescription("Rol a agregar").setRequired(true)).addIntegerOption((option) => option.setName("price").setDescription("Precio del rol").setRequired(true)),
      run: async ({ interaction }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes permisos para usar este comando.").setColor("Red")] });
        }
        const role = interaction.options.getRole("role");
        const price = interaction.options.getInteger("price");
        let shopData = await Shop.findOne({ guildId: interaction.guild.id });
        if (!shopData) {
          shopData = new Shop({ guildId: interaction.guild.id, roles: [] });
        }
        if (shopData.roles.length >= 10) {
          return interaction.reply({ embeds: [embed.setDescription("No puedes agregar m\xE1s de 10 roles a la tienda.").setColor("Red")] });
        }
        shopData.roles.push({ id: role.id, price });
        await shopData.save();
        embed.setTitle("Rol Agregado").setDescription(`El rol <@&${role.id}> ha sido agregado a la tienda por ${price} monedas.`).setColor("Green");
        interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_setshop();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0FkbWluaXN0cmF0b3Ivc2V0c2hvcC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIsIFBlcm1pc3Npb25zQml0RmllbGQgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgU2hvcCA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9zaG9wJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgnc2V0c2hvcCcpXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oJ0FncmVnYSB1biByb2wgYSBsYSB0aWVuZGEnKVxyXG4gICAgLmFkZFJvbGVPcHRpb24ob3B0aW9uID0+IG9wdGlvbi5zZXROYW1lKCdyb2xlJykuc2V0RGVzY3JpcHRpb24oJ1JvbCBhIGFncmVnYXInKS5zZXRSZXF1aXJlZCh0cnVlKSlcclxuICAgIC5hZGRJbnRlZ2VyT3B0aW9uKG9wdGlvbiA9PiBvcHRpb24uc2V0TmFtZSgncHJpY2UnKS5zZXREZXNjcmlwdGlvbignUHJlY2lvIGRlbCByb2wnKS5zZXRSZXF1aXJlZCh0cnVlKSksXHJcblxyXG4gIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24gfSkgPT4ge1xyXG4gICAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKCk7XHJcbiAgICBpZiAoIWludGVyYWN0aW9uLmd1aWxkKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdFc3RlIGNvbWFuZG8gc29sbyBlc3RcdTAwRTEgZGlzcG9uaWJsZSBlbiBzZXJ2aWRvcmVzLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5tZW1iZXIucGVybWlzc2lvbnMuaGFzKFBlcm1pc3Npb25zQml0RmllbGQuRmxhZ3MuQWRtaW5pc3RyYXRvcikpIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05vIHRpZW5lcyBwZXJtaXNvcyBwYXJhIHVzYXIgZXN0ZSBjb21hbmRvLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgcm9sZSA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0Um9sZSgncm9sZScpO1xyXG4gICAgY29uc3QgcHJpY2UgPSBpbnRlcmFjdGlvbi5vcHRpb25zLmdldEludGVnZXIoJ3ByaWNlJyk7XHJcblxyXG4gICAgbGV0IHNob3BEYXRhID0gYXdhaXQgU2hvcC5maW5kT25lKHsgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcbiAgICBpZiAoIXNob3BEYXRhKSB7XHJcbiAgICAgIHNob3BEYXRhID0gbmV3IFNob3AoeyBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCwgcm9sZXM6IFtdIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzaG9wRGF0YS5yb2xlcy5sZW5ndGggPj0gMTApIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05vIHB1ZWRlcyBhZ3JlZ2FyIG1cdTAwRTFzIGRlIDEwIHJvbGVzIGEgbGEgdGllbmRhLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvcERhdGEucm9sZXMucHVzaCh7IGlkOiByb2xlLmlkLCBwcmljZSB9KTtcclxuICAgIGF3YWl0IHNob3BEYXRhLnNhdmUoKTtcclxuXHJcbiAgICBlbWJlZC5zZXRUaXRsZSgnUm9sIEFncmVnYWRvJykuc2V0RGVzY3JpcHRpb24oYEVsIHJvbCA8QCYke3JvbGUuaWR9PiBoYSBzaWRvIGFncmVnYWRvIGEgbGEgdGllbmRhIHBvciAke3ByaWNlfSBtb25lZGFzLmApLnNldENvbG9yKCdHcmVlbicpO1xyXG4gICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgfSxcclxufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixjQUFjLG9CQUFvQixJQUFJLFVBQVEsWUFBWTtBQUN2RixRQUFNLE9BQU87QUFFYixXQUFPLFVBQVU7QUFBQSxNQUNmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxTQUFTLEVBQ2pCLGVBQWUsMkJBQTJCLEVBQzFDLGNBQWMsWUFBVSxPQUFPLFFBQVEsTUFBTSxFQUFFLGVBQWUsZUFBZSxFQUFFLFlBQVksSUFBSSxDQUFDLEVBQ2hHLGlCQUFpQixZQUFVLE9BQU8sUUFBUSxPQUFPLEVBQUUsZUFBZSxnQkFBZ0IsRUFBRSxZQUFZLElBQUksQ0FBQztBQUFBLE1BRXhHLEtBQUssT0FBTyxFQUFFLFlBQVksTUFBTTtBQUM5QixjQUFNLFFBQVEsSUFBSSxhQUFhO0FBQy9CLFlBQUksQ0FBQyxZQUFZLE9BQU87QUFDdEIsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSxxREFBa0QsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUNqSTtBQUVBLFlBQUksQ0FBQyxZQUFZLE9BQU8sWUFBWSxJQUFJLG9CQUFvQixNQUFNLGFBQWEsR0FBRztBQUNoRixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLDRDQUE0QyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQzNIO0FBRUEsY0FBTSxPQUFPLFlBQVksUUFBUSxRQUFRLE1BQU07QUFDL0MsY0FBTSxRQUFRLFlBQVksUUFBUSxXQUFXLE9BQU87QUFFcEQsWUFBSSxXQUFXLE1BQU0sS0FBSyxRQUFRLEVBQUUsU0FBUyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQ25FLFlBQUksQ0FBQyxVQUFVO0FBQ2IscUJBQVcsSUFBSSxLQUFLLEVBQUUsU0FBUyxZQUFZLE1BQU0sSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDbEU7QUFFQSxZQUFJLFNBQVMsTUFBTSxVQUFVLElBQUk7QUFDL0IsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSxtREFBZ0QsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUMvSDtBQUVBLGlCQUFTLE1BQU0sS0FBSyxFQUFFLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQztBQUMxQyxjQUFNLFNBQVMsS0FBSztBQUVwQixjQUFNLFNBQVMsY0FBYyxFQUFFLGVBQWUsYUFBYSxLQUFLLEVBQUUsc0NBQXNDLEtBQUssV0FBVyxFQUFFLFNBQVMsT0FBTztBQUMxSSxvQkFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K