import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  require_shop
} from "../../chunk-5WFU5UF4.mjs";
import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/buy.js
var require_buy = __commonJS({
  "src/commands/Economy/buy.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    var Shop = require_shop();
    var Economy = require_economy();
    module.exports = {
      data: new SlashCommandBuilder().setName("buy").setDescription("Compra un rol de la tienda").addIntegerOption((option) => option.setName("roleindex").setDescription("N\xFAmero del rol que deseas comprar (1-10)").setRequired(true)),
      run: async ({ interaction }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        const roleIndex = interaction.options.getInteger("roleindex");
        if (roleIndex < 1 || roleIndex > 10) {
          return interaction.reply({ embeds: [embed.setDescription("N\xFAmero de rol inv\xE1lido. Debe estar entre 1 y 10.").setColor("Red")] });
        }
        const shopData = await Shop.findOne({ guildId: interaction.guild.id });
        if (!shopData || !shopData.roles || shopData.roles.length === 0) {
          return interaction.reply({ embeds: [embed.setDescription("No hay roles disponibles en la tienda.").setColor("Red")] });
        }
        const roleToBuy = shopData.roles[roleIndex - 1];
        if (!roleToBuy) {
          return interaction.reply({ embeds: [embed.setDescription("N\xFAmero de rol inv\xE1lido.").setColor("Red")] });
        }
        const economyData = await Economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        if (!economyData || economyData.balance < roleToBuy.price) {
          return interaction.reply({ embeds: [embed.setDescription("No tienes suficientes monedas para comprar este rol.").setColor("Red")] });
        }
        const role = interaction.guild.roles.cache.get(roleToBuy.id);
        if (!role) {
          return interaction.reply({ embeds: [embed.setDescription("El rol no existe en el servidor.").setColor("Red")] });
        }
        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (member.roles.cache.has(role.id)) {
          return interaction.reply({ embeds: [embed.setDescription("Ya tienes este rol.").setColor("Red")] });
        }
        economyData.balance -= roleToBuy.price;
        await economyData.save();
        await member.roles.add(role);
        embed.setTitle("Compra Exitosa").setDescription(`Has comprado el rol <@&${role.id}> por ${roleToBuy.price} monedas. Te quedan ${economyData.balance} monedas.`).setColor("Green");
        interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_buy();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvYnV5LmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFNsYXNoQ29tbWFuZEJ1aWxkZXIsIEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5jb25zdCBTaG9wID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL3Nob3AnKTtcclxuY29uc3QgRWNvbm9teSA9IHJlcXVpcmUoJy4uLy4uL21vZGVscy9lY29ub215Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgnYnV5JylcclxuICAgIC5zZXREZXNjcmlwdGlvbignQ29tcHJhIHVuIHJvbCBkZSBsYSB0aWVuZGEnKVxyXG4gICAgLmFkZEludGVnZXJPcHRpb24ob3B0aW9uID0+IG9wdGlvbi5zZXROYW1lKCdyb2xlaW5kZXgnKS5zZXREZXNjcmlwdGlvbignTlx1MDBGQW1lcm8gZGVsIHJvbCBxdWUgZGVzZWFzIGNvbXByYXIgKDEtMTApJykuc2V0UmVxdWlyZWQodHJ1ZSkpLFxyXG5cclxuICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uIH0pID0+IHtcclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgaWYgKCFpbnRlcmFjdGlvbi5ndWlsZCkge1xyXG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignRXN0ZSBjb21hbmRvIHNvbG8gZXN0XHUwMEUxIGRpc3BvbmlibGUgZW4gc2Vydmlkb3Jlcy4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJvbGVJbmRleCA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0SW50ZWdlcigncm9sZWluZGV4Jyk7XHJcbiAgICBpZiAocm9sZUluZGV4IDwgMSB8fCByb2xlSW5kZXggPiAxMCkge1xyXG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTlx1MDBGQW1lcm8gZGUgcm9sIGludlx1MDBFMWxpZG8uIERlYmUgZXN0YXIgZW50cmUgMSB5IDEwLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvcERhdGEgPSBhd2FpdCBTaG9wLmZpbmRPbmUoeyBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuICAgIGlmICghc2hvcERhdGEgfHwgIXNob3BEYXRhLnJvbGVzIHx8IHNob3BEYXRhLnJvbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbignTm8gaGF5IHJvbGVzIGRpc3BvbmlibGVzIGVuIGxhIHRpZW5kYS4nKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJvbGVUb0J1eSA9IHNob3BEYXRhLnJvbGVzW3JvbGVJbmRleCAtIDFdO1xyXG4gICAgaWYgKCFyb2xlVG9CdXkpIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ05cdTAwRkFtZXJvIGRlIHJvbCBpbnZcdTAwRTFsaWRvLicpLnNldENvbG9yKCdSZWQnKV0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWNvbm9teURhdGEgPSBhd2FpdCBFY29ub215LmZpbmRPbmUoeyB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsIGd1aWxkSWQ6IGludGVyYWN0aW9uLmd1aWxkLmlkIH0pO1xyXG4gICAgaWYgKCFlY29ub215RGF0YSB8fCBlY29ub215RGF0YS5iYWxhbmNlIDwgcm9sZVRvQnV5LnByaWNlKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdObyB0aWVuZXMgc3VmaWNpZW50ZXMgbW9uZWRhcyBwYXJhIGNvbXByYXIgZXN0ZSByb2wuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByb2xlID0gaW50ZXJhY3Rpb24uZ3VpbGQucm9sZXMuY2FjaGUuZ2V0KHJvbGVUb0J1eS5pZCk7XHJcbiAgICBpZiAoIXJvbGUpIHtcclxuICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VsIHJvbCBubyBleGlzdGUgZW4gZWwgc2Vydmlkb3IuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZW1iZXIgPSBpbnRlcmFjdGlvbi5ndWlsZC5tZW1iZXJzLmNhY2hlLmdldChpbnRlcmFjdGlvbi51c2VyLmlkKTtcclxuICAgIGlmIChtZW1iZXIucm9sZXMuY2FjaGUuaGFzKHJvbGUuaWQpKSB7XHJcbiAgICAgIHJldHVybiBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldERlc2NyaXB0aW9uKCdZYSB0aWVuZXMgZXN0ZSByb2wuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlY29ub215RGF0YS5iYWxhbmNlIC09IHJvbGVUb0J1eS5wcmljZTtcclxuICAgIGF3YWl0IGVjb25vbXlEYXRhLnNhdmUoKTtcclxuICAgIGF3YWl0IG1lbWJlci5yb2xlcy5hZGQocm9sZSk7XHJcblxyXG4gICAgZW1iZWQuc2V0VGl0bGUoJ0NvbXByYSBFeGl0b3NhJykuc2V0RGVzY3JpcHRpb24oYEhhcyBjb21wcmFkbyBlbCByb2wgPEAmJHtyb2xlLmlkfT4gcG9yICR7cm9sZVRvQnV5LnByaWNlfSBtb25lZGFzLiBUZSBxdWVkYW4gJHtlY29ub215RGF0YS5iYWxhbmNlfSBtb25lZGFzLmApLnNldENvbG9yKCdHcmVlbicpO1xyXG4gICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZF0gfSk7XHJcbiAgfSxcclxufTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFBTSxFQUFFLHFCQUFxQixhQUFhLElBQUksVUFBUSxZQUFZO0FBQ2xFLFFBQU0sT0FBTztBQUNiLFFBQU0sVUFBVTtBQUVoQixXQUFPLFVBQVU7QUFBQSxNQUNmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxLQUFLLEVBQ2IsZUFBZSw0QkFBNEIsRUFDM0MsaUJBQWlCLFlBQVUsT0FBTyxRQUFRLFdBQVcsRUFBRSxlQUFlLDZDQUEwQyxFQUFFLFlBQVksSUFBSSxDQUFDO0FBQUEsTUFFdEksS0FBSyxPQUFPLEVBQUUsWUFBWSxNQUFNO0FBQzlCLGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDL0IsWUFBSSxDQUFDLFlBQVksT0FBTztBQUN0QixpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHFEQUFrRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ2pJO0FBRUEsY0FBTSxZQUFZLFlBQVksUUFBUSxXQUFXLFdBQVc7QUFDNUQsWUFBSSxZQUFZLEtBQUssWUFBWSxJQUFJO0FBQ25DLGlCQUFPLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLGVBQWUsd0RBQWtELEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQUEsUUFDakk7QUFFQSxjQUFNLFdBQVcsTUFBTSxLQUFLLFFBQVEsRUFBRSxTQUFTLFlBQVksTUFBTSxHQUFHLENBQUM7QUFDckUsWUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLFNBQVMsU0FBUyxNQUFNLFdBQVcsR0FBRztBQUMvRCxpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHdDQUF3QyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ3ZIO0FBRUEsY0FBTSxZQUFZLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDOUMsWUFBSSxDQUFDLFdBQVc7QUFDZCxpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLCtCQUF5QixFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ3hHO0FBRUEsY0FBTSxjQUFjLE1BQU0sUUFBUSxRQUFRLEVBQUUsUUFBUSxZQUFZLEtBQUssSUFBSSxTQUFTLFlBQVksTUFBTSxHQUFHLENBQUM7QUFDeEcsWUFBSSxDQUFDLGVBQWUsWUFBWSxVQUFVLFVBQVUsT0FBTztBQUN6RCxpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLHNEQUFzRCxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ3JJO0FBRUEsY0FBTSxPQUFPLFlBQVksTUFBTSxNQUFNLE1BQU0sSUFBSSxVQUFVLEVBQUU7QUFDM0QsWUFBSSxDQUFDLE1BQU07QUFDVCxpQkFBTyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxlQUFlLGtDQUFrQyxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUFBLFFBQ2pIO0FBRUEsY0FBTSxTQUFTLFlBQVksTUFBTSxRQUFRLE1BQU0sSUFBSSxZQUFZLEtBQUssRUFBRTtBQUN0RSxZQUFJLE9BQU8sTUFBTSxNQUFNLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDbkMsaUJBQU8sWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sZUFBZSxxQkFBcUIsRUFBRSxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFBQSxRQUNwRztBQUVBLG9CQUFZLFdBQVcsVUFBVTtBQUNqQyxjQUFNLFlBQVksS0FBSztBQUN2QixjQUFNLE9BQU8sTUFBTSxJQUFJLElBQUk7QUFFM0IsY0FBTSxTQUFTLGdCQUFnQixFQUFFLGVBQWUsMEJBQTBCLEtBQUssRUFBRSxTQUFTLFVBQVUsS0FBSyx1QkFBdUIsWUFBWSxPQUFPLFdBQVcsRUFBRSxTQUFTLE9BQU87QUFDaEwsb0JBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==