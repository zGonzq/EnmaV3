import {
  __commonJS,
  __name,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/events/ready/status.js
var require_status = __commonJS({
  "src/events/ready/status.js"(exports, module) {
    init_esm_shims();
    var mongoose = __require("mongoose");
    var os = __require("os");
    var { EmbedBuilder } = __require("discord.js");
    module.exports = (client) => {
      const channelId = "1188964850282541157";
      const statusChannel = client.channels.cache.get(channelId);
      if (!statusChannel) {
        console.error(`No se pudo encontrar el canal con la ID ${channelId}`);
        return;
      }
      setInterval(async () => {
        const statusEmbed = generateStatusEmbed(client);
        const lastMessage = (await statusChannel.messages.fetch({ limit: 5 })).first();
        if (lastMessage) {
          await lastMessage.edit({ embeds: [statusEmbed] });
        } else {
          await statusChannel.send({ embeds: [statusEmbed] });
        }
      }, 60 * 1e3);
    };
    function generateStatusEmbed(client) {
      return new EmbedBuilder().setColor("Blurple").setTitle("An\xE1lisis de estado").setFooter({ text: `${os.cpus()[0].model} | ${os.platform()} ${os.release()}` }).addFields(
        { name: "\u{1F47E} RAM", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\`` },
        { name: "\u{1F6EB} CPU%", value: `\`\`\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\`` },
        { name: "\u{1F4A1} Uptime", value: `\`\`\`${(process.uptime() / 60 / 60).toFixed(2)} horas\`\`\`` },
        { name: "\u{1F4E1} Ping", value: `\`\`\`${client.ws.ping} ms\`\`\`` },
        { name: "\u{1F4C3} Base de datos", value: `\`\`\`${mongoose.connection.readyState === 1 ? "Conectada" : "No conectada"}\`\`\`` },
        { name: "\u270F\uFE0F \xDAltima actualizaci\xF3n", value: `\`\`\`${(/* @__PURE__ */ new Date()).toLocaleString()}\`\`\`` },
        { name: "\u{1F3AE} Activo desde", value: `\`\`\`${client.readyAt.toLocaleString()}\`\`\`` }
      );
    }
    __name(generateStatusEmbed, "generateStatusEmbed");
  }
});
export default require_status();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2V2ZW50cy9yZWFkeS9zdGF0dXMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xyXG5jb25zdCB7IEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5cclxubGV0IGxhc3RNZXNzYWdlSWQgPSBudWxsO1xyXG4vKiogKiBAcGFyYW0ge2ltcG9ydCgnZGlzY29yZC5qcycpLkNsaWVudH0gY2xpZW50ICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGNsaWVudCkgPT4ge1xyXG4gICAgY29uc3QgY2hhbm5lbElkID0gJzExODg5NjQ4NTAyODI1NDExNTcnO1xyXG4gICAgY29uc3Qgc3RhdHVzQ2hhbm5lbCA9IGNsaWVudC5jaGFubmVscy5jYWNoZS5nZXQoY2hhbm5lbElkKTtcclxuXHJcbiAgICBpZiAoIXN0YXR1c0NoYW5uZWwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBObyBzZSBwdWRvIGVuY29udHJhciBlbCBjYW5hbCBjb24gbGEgSUQgJHtjaGFubmVsSWR9YCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEludGVydmFsKGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBzdGF0dXNFbWJlZCA9IGdlbmVyYXRlU3RhdHVzRW1iZWQoY2xpZW50KTtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSAoYXdhaXQgc3RhdHVzQ2hhbm5lbC5tZXNzYWdlcy5mZXRjaCh7IGxpbWl0OiA1IH0pKS5maXJzdCgpO1xyXG5cclxuICAgICAgICBpZiAobGFzdE1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgYXdhaXQgbGFzdE1lc3NhZ2UuZWRpdCh7IGVtYmVkczogW3N0YXR1c0VtYmVkXSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhd2FpdCBzdGF0dXNDaGFubmVsLnNlbmQoeyBlbWJlZHM6IFtzdGF0dXNFbWJlZF0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgNjAgKiAxMDAwKTsgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlU3RhdHVzRW1iZWQoY2xpZW50KSB7XHJcbiAgICByZXR1cm4gbmV3IEVtYmVkQnVpbGRlcigpXHJcbiAgICAgICAgLnNldENvbG9yKCdCbHVycGxlJylcclxuICAgICAgICAuc2V0VGl0bGUoJ0FuXHUwMEUxbGlzaXMgZGUgZXN0YWRvJylcclxuICAgICAgICAuc2V0Rm9vdGVyKHsgdGV4dDogYCR7b3MuY3B1cygpWzBdLm1vZGVsfSB8ICR7b3MucGxhdGZvcm0oKX0gJHtvcy5yZWxlYXNlKCl9YCB9KVxyXG4gICAgICAgIC5hZGRGaWVsZHMoXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ1x1RDgzRFx1REM3RSBSQU0nLCB2YWx1ZTogYFxcYFxcYFxcYCR7KHByb2Nlc3MubWVtb3J5VXNhZ2UoKS5oZWFwVXNlZCAvIDEwMjQgLyAxMDI0KS50b0ZpeGVkKDIpfSBNQlxcYFxcYFxcYGAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnXHVEODNEXHVERUVCIENQVSUnLCB2YWx1ZTogYFxcYFxcYFxcYCR7KHByb2Nlc3MuY3B1VXNhZ2UoKS5zeXN0ZW0gLyAxMDI0IC8gMTAyNCkudG9GaXhlZCgyKX0lXFxgXFxgXFxgYCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6ICdcdUQ4M0RcdURDQTEgVXB0aW1lJywgdmFsdWU6IGBcXGBcXGBcXGAkeyhwcm9jZXNzLnVwdGltZSgpIC8gNjAgLyA2MCkudG9GaXhlZCgyKX0gaG9yYXNcXGBcXGBcXGBgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ1x1RDgzRFx1RENFMSBQaW5nJywgdmFsdWU6IGBcXGBcXGBcXGAke2NsaWVudC53cy5waW5nfSBtc1xcYFxcYFxcYGAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnXHVEODNEXHVEQ0MzIEJhc2UgZGUgZGF0b3MnLCB2YWx1ZTogYFxcYFxcYFxcYCR7bW9uZ29vc2UuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSAxID8gJ0NvbmVjdGFkYScgOiAnTm8gY29uZWN0YWRhJ31cXGBcXGBcXGBgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogJ1x1MjcwRlx1RkUwRiBcdTAwREFsdGltYSBhY3R1YWxpemFjaVx1MDBGM24nLCB2YWx1ZTogYFxcYFxcYFxcYCR7bmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfVxcYFxcYFxcYGAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiAnXHVEODNDXHVERkFFIEFjdGl2byBkZXNkZScsIHZhbHVlOiBgXFxgXFxgXFxgJHtjbGllbnQucmVhZHlBdC50b0xvY2FsZVN0cmluZygpfVxcYFxcYFxcYGAgfSxcclxuICAgICAgICApO1xyXG59XHJcbiAgIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLFdBQVcsVUFBUSxVQUFVO0FBQ25DLFFBQU0sS0FBSyxVQUFRLElBQUk7QUFDdkIsUUFBTSxFQUFFLGFBQWEsSUFBSSxVQUFRLFlBQVk7QUFJN0MsV0FBTyxVQUFVLENBQUMsV0FBVztBQUN6QixZQUFNLFlBQVk7QUFDbEIsWUFBTSxnQkFBZ0IsT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBRXpELFVBQUksQ0FBQyxlQUFlO0FBQ2hCLGdCQUFRLE1BQU0sMkNBQTJDLFNBQVMsRUFBRTtBQUNwRTtBQUFBLE1BQ0o7QUFFQSxrQkFBWSxZQUFZO0FBQ3BCLGNBQU0sY0FBYyxvQkFBb0IsTUFBTTtBQUU5QyxjQUFNLGVBQWUsTUFBTSxjQUFjLFNBQVMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsTUFBTTtBQUU3RSxZQUFJLGFBQWE7QUFDYixnQkFBTSxZQUFZLEtBQUssRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7QUFBQSxRQUNwRCxPQUFPO0FBQ0gsZ0JBQU0sY0FBYyxLQUFLLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQUEsUUFDdEQ7QUFBQSxNQUNKLEdBQUcsS0FBSyxHQUFJO0FBQUEsSUFDaEI7QUFFQSxhQUFTLG9CQUFvQixRQUFRO0FBQ2pDLGFBQU8sSUFBSSxhQUFhLEVBQ25CLFNBQVMsU0FBUyxFQUNsQixTQUFTLHVCQUFvQixFQUM3QixVQUFVLEVBQUUsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFDOUU7QUFBQSxRQUNHLEVBQUUsTUFBTSxpQkFBVSxPQUFPLFVBQVUsUUFBUSxZQUFZLEVBQUUsV0FBVyxPQUFPLE1BQU0sUUFBUSxDQUFDLENBQUMsWUFBWTtBQUFBLFFBQ3ZHLEVBQUUsTUFBTSxrQkFBVyxPQUFPLFVBQVUsUUFBUSxTQUFTLEVBQUUsU0FBUyxPQUFPLE1BQU0sUUFBUSxDQUFDLENBQUMsVUFBVTtBQUFBLFFBQ2pHLEVBQUUsTUFBTSxvQkFBYSxPQUFPLFVBQVUsUUFBUSxPQUFPLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLGVBQWU7QUFBQSxRQUMzRixFQUFFLE1BQU0sa0JBQVcsT0FBTyxTQUFTLE9BQU8sR0FBRyxJQUFJLFlBQVk7QUFBQSxRQUM3RCxFQUFFLE1BQU0sMkJBQW9CLE9BQU8sU0FBUyxTQUFTLFdBQVcsZUFBZSxJQUFJLGNBQWMsY0FBYyxTQUFTO0FBQUEsUUFDeEgsRUFBRSxNQUFNLDJDQUEyQixPQUFPLFVBQVMsb0JBQUksS0FBSyxHQUFFLGVBQWUsQ0FBQyxTQUFTO0FBQUEsUUFDdkYsRUFBRSxNQUFNLDBCQUFtQixPQUFPLFNBQVMsT0FBTyxRQUFRLGVBQWUsQ0FBQyxTQUFTO0FBQUEsTUFDdkY7QUFBQSxJQUNSO0FBZFM7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=