import {
  require_shop
} from "../../chunk-5WFU5UF4.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/shop.js
var require_shop2 = __commonJS({
  "src/commands/Economy/shop.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var Shop = require_shop();
    module.exports = {
      data: new SlashCommandBuilder().setName("shop").setDescription("Muestra los roles disponibles en la tienda"),
      run: async ({ interaction }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const shopData = await Shop.findOne({ guildId: interaction.guild.id });
        if (!shopData || !shopData.roles || shopData.roles.length === 0) {
          return interaction.reply({ embeds: [embed.setDescription("No hay roles disponibles en la tienda.").setColor("Red")] });
        }
        const rolesList = shopData.roles.map((role, index) => `${index + 1}. <@&${role.id}> - ${role.price} monedas`).join("\n");
        embed.setTitle("Tienda de Roles").setDescription(rolesList).setColor("Blue").setFooter({ text: "Usa /buy <n\xFAmero> para comprar un rol." }).setThumbnail(interaction.guild.iconURL());
        interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_shop2();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvc2hvcC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcclxuY29uc3QgU2hvcCA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9zaG9wJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgnc2hvcCcpXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oJ011ZXN0cmEgbG9zIHJvbGVzIGRpc3BvbmlibGVzIGVuIGxhIHRpZW5kYScpLFxyXG5cclxuICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uIH0pID0+IHtcclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5ndWlsZCkge1xyXG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignRXN0ZSBjb21hbmRvIHNvbG8gZXN0XHUwMEUxIGRpc3BvbmlibGUgZW4gc2Vydmlkb3Jlcy4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3BEYXRhID0gYXdhaXQgU2hvcC5maW5kT25lKHsgZ3VpbGRJZDogaW50ZXJhY3Rpb24uZ3VpbGQuaWQgfSk7XHJcbiAgICBpZiAoIXNob3BEYXRhIHx8ICFzaG9wRGF0YS5yb2xlcyB8fCBzaG9wRGF0YS5yb2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05vIGhheSByb2xlcyBkaXNwb25pYmxlcyBlbiBsYSB0aWVuZGEuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByb2xlc0xpc3QgPSBzaG9wRGF0YS5yb2xlcy5tYXAoKHJvbGUsIGluZGV4KSA9PiBgJHtpbmRleCArIDF9LiA8QCYke3JvbGUuaWR9PiAtICR7cm9sZS5wcmljZX0gbW9uZWRhc2ApLmpvaW4oJ1xcbicpO1xyXG4gICAgZW1iZWQuc2V0VGl0bGUoJ1RpZW5kYSBkZSBSb2xlcycpLnNldERlc2NyaXB0aW9uKHJvbGVzTGlzdCkuc2V0Q29sb3IoJ0JsdWUnKS5zZXRGb290ZXIoeyB0ZXh0OiAnVXNhIC9idXkgPG5cdTAwRkFtZXJvPiBwYXJhIGNvbXByYXIgdW4gcm9sLicgfSkuc2V0VGh1bWJuYWlsKGludGVyYWN0aW9uLmd1aWxkLmljb25VUkwoKSk7XHJcbiAgICBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICB9LFxyXG59OyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsUUFBTSxPQUFPO0FBRWIsV0FBTyxVQUFVO0FBQUEsTUFDZixNQUFNLElBQUksb0JBQW9CLEVBQzNCLFFBQVEsTUFBTSxFQUNkLGVBQWUsNENBQTRDO0FBQUEsTUFFOUQsS0FBSyxPQUFPLEVBQUUsWUFBWSxNQUFNO0FBQzlCLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDL0IsWUFBSSxDQUFDLFlBQVksT0FBTztBQUN0QixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHFEQUFrRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ2pJO0FBRUEsY0FBTSxXQUFXLE1BQU0sS0FBSyxRQUFRLEVBQUUsU0FBUyxZQUFZLE1BQU0sR0FBRyxDQUFDO0FBQ3JFLFlBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxTQUFTLFNBQVMsTUFBTSxXQUFXLEdBQUc7QUFDL0QsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSx3Q0FBd0MsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUN2SDtBQUVBLGNBQU0sWUFBWSxTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUUsS0FBSyxJQUFJO0FBQ3ZILGNBQU0sU0FBUyxpQkFBaUIsRUFBRSxlQUFlLFNBQVMsRUFBRSxTQUFTLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSw0Q0FBeUMsQ0FBQyxFQUFFLGFBQWEsWUFBWSxNQUFNLFFBQVEsQ0FBQztBQUNuTCxvQkFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFsicmVxdWlyZV9zaG9wIl0KfQo=