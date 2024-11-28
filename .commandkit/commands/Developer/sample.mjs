import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Developer/sample.js
var require_sample = __commonJS({
  "src/commands/Developer/sample.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("sample").setDescription("Sample command"),
      /**
      * @param {import('commandkit').SlashCommandProps} param0
      */
      run: async ({ interaction, client, handler }) => {
        interaction.reply({ content: "Sample command", ephemeral: true });
      },
      /** @type {import('commandkit').CommandOptions} */
      options: {
        devOnly: true
      }
    };
  }
});
export default require_sample();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0RldmVsb3Blci9zYW1wbGUuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2xhc2hDb21tYW5kQnVpbGRlciwgRW1iZWRCdWlsZGVyIH0gPSByZXF1aXJlKCdkaXNjb3JkLmpzJyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAgICAgLnNldE5hbWUoJ3NhbXBsZScpXHJcbiAgICAgICAgLnNldERlc2NyaXB0aW9uKCdTYW1wbGUgY29tbWFuZCcpLFxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAgKi9cclxuICAgIHJ1bjogYXN5bmMgKHsgaW50ZXJhY3Rpb24sIGNsaWVudCwgaGFuZGxlciB9KSA9PiB7XHJcbiAgICAgICAgaW50ZXJhY3Rpb24ucmVwbHkoeyBjb250ZW50OiAnU2FtcGxlIGNvbW1hbmQnLCBlcGhlbWVyYWw6IHRydWUgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZE9wdGlvbnN9ICovXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgZGV2T25seTogdHJ1ZSxcclxuICAgIH0sXHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUscUJBQXFCLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFDbEUsV0FBTyxVQUFVO0FBQUE7QUFBQSxNQUViLE1BQU0sSUFBSSxvQkFBb0IsRUFDekIsUUFBUSxRQUFRLEVBQ2hCLGVBQWUsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJcEMsS0FBSyxPQUFPLEVBQUUsYUFBYSxRQUFRLFFBQVEsTUFBTTtBQUM3QyxvQkFBWSxNQUFNLEVBQUUsU0FBUyxrQkFBa0IsV0FBVyxLQUFLLENBQUM7QUFBQSxNQUNwRTtBQUFBO0FBQUEsTUFHQSxTQUFTO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDYjtBQUFBLElBQ0o7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=