import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/General/invite.js
var require_invite = __commonJS({
  "src/commands/General/invite.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("invite").setDescription("Invita al bot a tu servidor"),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        embed.setTitle("\xA1Invitame a tu servidor!");
        embed.setDescription("\xA1Gracias por quererme en tu servidor! [Haz click aqu\xED](https://discord.com/oauth2/authorize?client_id=1171876289632813148&permissions=8&integration_type=0&scope=bot) para invitarme a tu servidor.");
        embed.setColor("Blurple");
        await interaction.reply({
          embeds: [embed]
        });
      }
    };
  }
});
export default require_invite();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0dlbmVyYWwvaW52aXRlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IFNsYXNoQ29tbWFuZEJ1aWxkZXIsIEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAvKiogQHR5cGUge2ltcG9ydCgnY29tbWFuZGtpdCcpLkNvbW1hbmREYXRhfSAgKi9cclxuICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAuc2V0TmFtZSgnaW52aXRlJylcclxuICAgIC5zZXREZXNjcmlwdGlvbignSW52aXRhIGFsIGJvdCBhIHR1IHNlcnZpZG9yJyksXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXHJcbiAgICovXHJcbiAgcnVuOiBhc3luYyAoeyBpbnRlcmFjdGlvbiwgY2xpZW50LCBoYW5kbGVyIH0pID0+IHtcclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgZW1iZWQuc2V0VGl0bGUoJ1x1MDBBMUludml0YW1lIGEgdHUgc2Vydmlkb3IhJyk7XHJcbiAgICBlbWJlZC5zZXREZXNjcmlwdGlvbignXHUwMEExR3JhY2lhcyBwb3IgcXVlcmVybWUgZW4gdHUgc2Vydmlkb3IhIFtIYXogY2xpY2sgYXF1XHUwMEVEXShodHRwczovL2Rpc2NvcmQuY29tL29hdXRoMi9hdXRob3JpemU/Y2xpZW50X2lkPTExNzE4NzYyODk2MzI4MTMxNDgmcGVybWlzc2lvbnM9OCZpbnRlZ3JhdGlvbl90eXBlPTAmc2NvcGU9Ym90KSBwYXJhIGludml0YXJtZSBhIHR1IHNlcnZpZG9yLicpO1xyXG4gICAgZW1iZWQuc2V0Q29sb3IoJ0JsdXJwbGUnKTtcclxuICAgIGF3YWl0IGludGVyYWN0aW9uLnJlcGx5KHtcclxuICAgICAgICBlbWJlZHM6IFtlbWJlZF1cclxuICAgIH0pO1xyXG4gIH0sXHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUVmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxRQUFRLEVBQ2hCLGVBQWUsNkJBQTZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJL0MsS0FBSyxPQUFPLEVBQUUsYUFBYSxRQUFRLFFBQVEsTUFBTTtBQUMvQyxjQUFNLFFBQVEsSUFBSSxhQUFhO0FBQy9CLGNBQU0sU0FBUyw2QkFBMEI7QUFDekMsY0FBTSxlQUFlLDJNQUFxTTtBQUMxTixjQUFNLFNBQVMsU0FBUztBQUN4QixjQUFNLFlBQVksTUFBTTtBQUFBLFVBQ3BCLFFBQVEsQ0FBQyxLQUFLO0FBQUEsUUFDbEIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K