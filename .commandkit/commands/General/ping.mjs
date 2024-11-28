import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/General/ping.js
var require_ping = __commonJS({
  "src/commands/General/ping.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client }) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        const embed = new EmbedBuilder();
        embed.setTitle("Pong! \u{1F3D3}");
        embed.setDescription(`Latencia: ${ping}ms.
Websocket: ${client.ws.ping}ms.`);
        embed.setColor("Random");
        interaction.editReply({
          embeds: [embed]
        });
      }
    };
  }
});
export default require_ping();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0dlbmVyYWwvcGluZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBTbGFzaENvbW1hbmRCdWlsZGVyLCBFbWJlZEJ1aWxkZXIgfSA9IHJlcXVpcmUoJ2Rpc2NvcmQuanMnKTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKiogQHR5cGUge2ltcG9ydCgnY29tbWFuZGtpdCcpLkNvbW1hbmREYXRhfSAgKi9cbiAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxuICAgIC5zZXROYW1lKCdwaW5nJylcbiAgICAuc2V0RGVzY3JpcHRpb24oJ1BvbmchJyksXG5cblxuICAvKipcbiAgICogQHBhcmFtIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5TbGFzaENvbW1hbmRQcm9wc30gcGFyYW0wXG4gICAqL1xuICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQgfSkgPT4ge1xuICAgIGF3YWl0IGludGVyYWN0aW9uLmRlZmVyUmVwbHkoKTtcbiAgICBjb25zdCByZXBseSA9IGF3YWl0IGludGVyYWN0aW9uLmZldGNoUmVwbHkoKTtcbiAgICBjb25zdCBwaW5nID0gcmVwbHkuY3JlYXRlZFRpbWVzdGFtcCAtIGludGVyYWN0aW9uLmNyZWF0ZWRUaW1lc3RhbXA7XG5cbiAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKTtcbiAgICBlbWJlZC5zZXRUaXRsZSgnUG9uZyEgXHVEODNDXHVERkQzJyk7XG4gICAgZW1iZWQuc2V0RGVzY3JpcHRpb24oYExhdGVuY2lhOiAke3Bpbmd9bXMuXFxuV2Vic29ja2V0OiAke2NsaWVudC53cy5waW5nfW1zLmApO1xuICAgIGVtYmVkLnNldENvbG9yKCdSYW5kb20nKTtcblxuICAgIGludGVyYWN0aW9uLmVkaXRSZXBseSh7XG4gICAgICAgIGVtYmVkczogW2VtYmVkXVxuICAgIH0pO1xuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUVmLE1BQU0sSUFBSSxvQkFBb0IsRUFDM0IsUUFBUSxNQUFNLEVBQ2QsZUFBZSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFNekIsS0FBSyxPQUFPLEVBQUUsYUFBYSxPQUFPLE1BQU07QUFDdEMsY0FBTSxZQUFZLFdBQVc7QUFDN0IsY0FBTSxRQUFRLE1BQU0sWUFBWSxXQUFXO0FBQzNDLGNBQU0sT0FBTyxNQUFNLG1CQUFtQixZQUFZO0FBRWxELGNBQU0sUUFBUSxJQUFJLGFBQWE7QUFDL0IsY0FBTSxTQUFTLGlCQUFVO0FBQ3pCLGNBQU0sZUFBZSxhQUFhLElBQUk7QUFBQSxhQUFtQixPQUFPLEdBQUcsSUFBSSxLQUFLO0FBQzVFLGNBQU0sU0FBUyxRQUFRO0FBRXZCLG9CQUFZLFVBQVU7QUFBQSxVQUNsQixRQUFRLENBQUMsS0FBSztBQUFBLFFBQ2xCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==