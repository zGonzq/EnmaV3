import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/General/rng.js
var require_rng = __commonJS({
  "src/commands/General/rng.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("rng").setDescription("Genera un n\xFAmero aleatorio").addIntegerOption((option) => option.setName("minimo").setDescription("El n\xFAmero m\xEDnimo").setMinValue(1).setRequired(true)).addIntegerOption((option) => option.setName("maximo").setDescription("El n\xFAmero m\xE1ximo").setMinValue(2).setRequired(true)),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const min = interaction.options.getInteger("minimo");
        const max = interaction.options.getInteger("maximo");
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const embed = new EmbedBuilder();
        embed.setTitle("N\xFAmero aleatorio");
        embed.setDescription(`Tu n\xFAmero aleatorio es: ${randomNumber}`);
        embed.setColor("Random");
        await interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_rng();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0dlbmVyYWwvcm5nLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFNsYXNoQ29tbWFuZEJ1aWxkZXIsIEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAvKiogQHR5cGUge2ltcG9ydCgnY29tbWFuZGtpdCcpLkNvbW1hbmREYXRhfSAgKi9cclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgncm5nJylcclxuICAgIC5zZXREZXNjcmlwdGlvbignR2VuZXJhIHVuIG5cdTAwRkFtZXJvIGFsZWF0b3JpbycpXHJcbiAgICAuYWRkSW50ZWdlck9wdGlvbigob3B0aW9uKSA9PiBvcHRpb25cclxuICAgICAgLnNldE5hbWUoJ21pbmltbycpXHJcbiAgICAgIC5zZXREZXNjcmlwdGlvbignRWwgblx1MDBGQW1lcm8gbVx1MDBFRG5pbW8nKVxyXG4gICAgICAuc2V0TWluVmFsdWUoMSlcclxuICAgICAgLnNldFJlcXVpcmVkKHRydWUpKVxyXG4gICAgLmFkZEludGVnZXJPcHRpb24oKG9wdGlvbikgPT4gb3B0aW9uXHJcbiAgICAgIC5zZXROYW1lKCdtYXhpbW8nKVxyXG4gICAgICAuc2V0RGVzY3JpcHRpb24oJ0VsIG5cdTAwRkFtZXJvIG1cdTAwRTF4aW1vJylcclxuICAgICAgLnNldE1pblZhbHVlKDIpXHJcbiAgICAgIC5zZXRSZXF1aXJlZCh0cnVlKSksXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAqL1xyXG4gIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24sIGNsaWVudCwgaGFuZGxlciB9KSA9PiB7XHJcblxyXG4gICAgY29uc3QgbWluID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRJbnRlZ2VyKFwibWluaW1vXCIpO1xyXG4gICAgY29uc3QgbWF4ID0gaW50ZXJhY3Rpb24ub3B0aW9ucy5nZXRJbnRlZ2VyKFwibWF4aW1vXCIpO1xyXG5cclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG5cclxuICAgIGVtYmVkLnNldFRpdGxlKCdOXHUwMEZBbWVybyBhbGVhdG9yaW8nKVxyXG4gICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oYFR1IG5cdTAwRkFtZXJvIGFsZWF0b3JpbyBlczogJHtyYW5kb21OdW1iZXJ9YClcclxuICAgIGVtYmVkLnNldENvbG9yKCdSYW5kb20nKVxyXG5cclxuICAgIGF3YWl0IGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWRdIH0pO1xyXG4gIH0sXHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUVmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxLQUFLLEVBQ2IsZUFBZSwrQkFBNEIsRUFDM0MsaUJBQWlCLENBQUMsV0FBVyxPQUMzQixRQUFRLFFBQVEsRUFDaEIsZUFBZSx3QkFBa0IsRUFDakMsWUFBWSxDQUFDLEVBQ2IsWUFBWSxJQUFJLENBQUMsRUFDbkIsaUJBQWlCLENBQUMsV0FBVyxPQUMzQixRQUFRLFFBQVEsRUFDaEIsZUFBZSx3QkFBa0IsRUFDakMsWUFBWSxDQUFDLEVBQ2IsWUFBWSxJQUFJLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUt0QixLQUFLLE9BQU8sRUFBRSxhQUFhLFFBQVEsUUFBUSxNQUFNO0FBRS9DLGNBQU0sTUFBTSxZQUFZLFFBQVEsV0FBVyxRQUFRO0FBQ25ELGNBQU0sTUFBTSxZQUFZLFFBQVEsV0FBVyxRQUFRO0FBRW5ELGNBQU0sZUFBZSxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssTUFBTSxNQUFNLEVBQUUsSUFBSTtBQUNuRSxjQUFNLFFBQVEsSUFBSSxhQUFhO0FBRS9CLGNBQU0sU0FBUyxxQkFBa0I7QUFDakMsY0FBTSxlQUFlLDhCQUEyQixZQUFZLEVBQUU7QUFDOUQsY0FBTSxTQUFTLFFBQVE7QUFFdkIsY0FBTSxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=