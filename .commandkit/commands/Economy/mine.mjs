import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __name,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/mine.js
var require_mine = __commonJS({
  "src/commands/Economy/mine.js"(exports, module) {
    init_esm_shims();
    var { EmbedBuilder, SlashCommandBuilder } = __require("discord.js");
    var economy = require_economy();
    var minerals = [
      { name: "Diamante de la Galaxia", price: 1e6, probability: 1e-7, rarity: "Singular" },
      { name: "Gema del Infinito", price: 145840, probability: 1e-6, rarity: "Singular" },
      { name: "Meteorito de Antimateria", price: 8238, probability: 3e-5, rarity: "\xDAnico" },
      { name: "Perla de Dimensi\xF3n", price: 7231, probability: 5e-5, rarity: "\xDAnico" },
      { name: "Fragmento de Realidad", price: 6239, probability: 6e-5, rarity: "\xDAnico" },
      { name: "Esquirla de Tiempo", price: 5627, probability: 7e-5, rarity: "\xDAnico" },
      { name: "Gema de Luz", price: 4623, probability: 8e-5, rarity: "\xDAnico" },
      { name: "Cristal de Energ\xEDa", price: 4104, probability: 9e-5, rarity: "\xDAnico" },
      { name: "Esquirla de Estrella de Neutrones", price: 3569, probability: 1e-4, rarity: "M\xEDtico" },
      { name: "Fragmento de Pulsar", price: 2937, probability: 2e-4, rarity: "M\xEDtico" },
      { name: "Cristal de Materia Oscura", price: 2552, probability: 3e-4, rarity: "M\xEDtico" },
      { name: "Gema de Agujero Negro", price: 2178, probability: 4e-4, rarity: "M\xEDtico" },
      { name: "\xD3palo de Qu\xE1sar", price: 1823, probability: 5e-4, rarity: "M\xEDtico" },
      { name: "Perla de Nebulosa", price: 1542, probability: 1e-3, rarity: "M\xEDtico" },
      { name: "Fragmento de Supernova", price: 1245, probability: 2e-3, rarity: "M\xEDtico" },
      { name: "Cristal de Plasma", price: 723, probability: 5e-3, rarity: "Legendario" },
      { name: "Diamante Espacial", price: 640, probability: 0.01, rarity: "Legendario" },
      { name: "Rub\xED Celestial", price: 410, probability: 0.02, rarity: "\xC9pico" },
      { name: "Zafiro Estelar", price: 335, probability: 0.03, rarity: "\xC9pico" },
      { name: "Esmeralda C\xF3smica", price: 250, probability: 0.04, rarity: "\xC9pico" },
      { name: "\xD3palo Gal\xE1ctico", price: 180, probability: 0.05, rarity: "Raro" },
      { name: "Esquirla de Asteroide", price: 125, probability: 0.07, rarity: "Poco com\xFAn" },
      { name: "Gema de Ne\xF3n", price: 85, probability: 0.08, rarity: "Poco com\xFAn" },
      { name: "Roca Espacial", price: 50, probability: 0.1, rarity: "Poco com\xFAn" },
      { name: "Cristal Lunar", price: 30, probability: 0.15, rarity: "Com\xFAn" },
      { name: "Fragmento de Cometa", price: 15, probability: 0.2, rarity: "Com\xFAn" },
      { name: "Polvo Estelar", price: 10, probability: 0.25, rarity: "Com\xFAn" }
    ];
    var embedColors = [
      { rarity: "Singular", color: "#030000" },
      { rarity: "\xDAnico", color: "#ff0d25" },
      { rarity: "M\xEDtico", color: "#4336ff" },
      { rarity: "Legendario", color: "#ff7605" },
      { rarity: "\xC9pico", color: "#6905ff" },
      { rarity: "Raro", color: "#00c7bd" },
      { rarity: "Poco com\xFAn", color: "#00ff95" },
      { rarity: "Com\xFAn", color: "#e0dede" }
    ];
    function getRandomMineral() {
      const random = Math.random();
      let cumulativeProbability = 0;
      for (const mineral of minerals) {
        cumulativeProbability += mineral.probability;
        if (random < cumulativeProbability) {
          return mineral;
        }
      }
      return minerals[0];
    }
    __name(getRandomMineral, "getRandomMineral");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("mine").setDescription("Mina para encontrar minerales espaciales y ganar monedas."),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        if (!interaction.guild) {
          return interaction.reply({ embeds: [embed.setDescription("Este comando solo est\xE1 disponible en servidores.").setColor("Red")] });
        }
        let data = await economy.findOne({ userId: interaction.user.id, guildId: interaction.guild.id });
        if (!data) {
          data = new economy({
            userId: interaction.user.id,
            guildId: interaction.guild.id
          });
          await data.save();
        }
        const lastMine = data.lastMine;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastMine;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 5) {
          const minutesLeft = 5 - diffMinutes;
          return interaction.reply({ embeds: [embed.setDescription(`Ya has minado recientemente. Puedes minar de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        data.lastMine = now;
        const mineral = getRandomMineral();
        data.balance += mineral.price;
        await data.save();
        interaction.reply({ embeds: [embed.setTitle("Miner\xEDa").setDescription(`Has encontrado **${mineral.name}** (${mineral.rarity}) y ganado ${mineral.price} monedas. Ahora tienes ${data.balance} monedas.`).setColor(embedColors.find((color) => color.rarity === mineral.rarity).color).setThumbnail("https://cdn-icons-gif.flaticon.com/12322/12322307.gif")] });
      }
    };
  }
});
export default require_mine();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvbWluZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBFbWJlZEJ1aWxkZXIsIFNsYXNoQ29tbWFuZEJ1aWxkZXIgfSA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5jb25zdCBlY29ub215ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2Vjb25vbXknKTtcclxuXHJcbmNvbnN0IG1pbmVyYWxzID0gW1xyXG4gICAgeyBuYW1lOiAnRGlhbWFudGUgZGUgbGEgR2FsYXhpYScsIHByaWNlOiAxMDAwMDAwLCBwcm9iYWJpbGl0eTogMC4wMDAwMDAxLCByYXJpdHk6ICdTaW5ndWxhcicgfSxcclxuICAgIHsgbmFtZTogJ0dlbWEgZGVsIEluZmluaXRvJywgcHJpY2U6IDE0NTg0MCwgcHJvYmFiaWxpdHk6IDAuMDAwMDAxLCByYXJpdHk6ICdTaW5ndWxhcicgfSxcclxuICAgIHsgbmFtZTogJ01ldGVvcml0byBkZSBBbnRpbWF0ZXJpYScsIHByaWNlOiA4MjM4LCBwcm9iYWJpbGl0eTogMC4wMDAwMywgcmFyaXR5OiAnXHUwMERBbmljbycgfSxcclxuICAgIHsgbmFtZTogJ1BlcmxhIGRlIERpbWVuc2lcdTAwRjNuJywgcHJpY2U6IDcyMzEsIHByb2JhYmlsaXR5OiAwLjAwMDA1LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnRnJhZ21lbnRvIGRlIFJlYWxpZGFkJywgcHJpY2U6IDYyMzksIHByb2JhYmlsaXR5OiAwLjAwMDA2LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnRXNxdWlybGEgZGUgVGllbXBvJywgcHJpY2U6IDU2MjcsIHByb2JhYmlsaXR5OiAwLjAwMDA3LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnR2VtYSBkZSBMdXonLCBwcmljZTogNDYyMywgcHJvYmFiaWxpdHk6IDAuMDAwMDgsIHJhcml0eTogJ1x1MDBEQW5pY28nIH0sXHJcbiAgICB7IG5hbWU6ICdDcmlzdGFsIGRlIEVuZXJnXHUwMEVEYScsIHByaWNlOiA0MTA0LCBwcm9iYWJpbGl0eTogMC4wMDAwOSwgcmFyaXR5OiAnXHUwMERBbmljbycgfSxcclxuICAgIHsgbmFtZTogJ0VzcXVpcmxhIGRlIEVzdHJlbGxhIGRlIE5ldXRyb25lcycsIHByaWNlOiAzNTY5LCBwcm9iYWJpbGl0eTogMC4wMDAxLCByYXJpdHk6ICdNXHUwMEVEdGljbycgfSxcclxuICAgIHsgbmFtZTogJ0ZyYWdtZW50byBkZSBQdWxzYXInLCBwcmljZTogMjkzNywgcHJvYmFiaWxpdHk6IDAuMDAwMiwgcmFyaXR5OiAnTVx1MDBFRHRpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdDcmlzdGFsIGRlIE1hdGVyaWEgT3NjdXJhJywgcHJpY2U6IDI1NTIsIHByb2JhYmlsaXR5OiAwLjAwMDMsIHJhcml0eTogJ01cdTAwRUR0aWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnR2VtYSBkZSBBZ3VqZXJvIE5lZ3JvJywgcHJpY2U6IDIxNzgsIHByb2JhYmlsaXR5OiAwLjAwMDQsIHJhcml0eTogJ01cdTAwRUR0aWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnXHUwMEQzcGFsbyBkZSBRdVx1MDBFMXNhcicsIHByaWNlOiAxODIzLCBwcm9iYWJpbGl0eTogMC4wMDA1LCByYXJpdHk6ICdNXHUwMEVEdGljbycgfSxcclxuICAgIHsgbmFtZTogJ1BlcmxhIGRlIE5lYnVsb3NhJywgcHJpY2U6IDE1NDIsIHByb2JhYmlsaXR5OiAwLjAwMSwgcmFyaXR5OiAnTVx1MDBFRHRpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdGcmFnbWVudG8gZGUgU3VwZXJub3ZhJywgcHJpY2U6IDEyNDUsIHByb2JhYmlsaXR5OiAwLjAwMiwgcmFyaXR5OiAnTVx1MDBFRHRpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdDcmlzdGFsIGRlIFBsYXNtYScsIHByaWNlOiA3MjMsIHByb2JhYmlsaXR5OiAwLjAwNSwgcmFyaXR5OiAnTGVnZW5kYXJpbycgfSxcclxuICAgIHsgbmFtZTogJ0RpYW1hbnRlIEVzcGFjaWFsJywgcHJpY2U6IDY0MCwgcHJvYmFiaWxpdHk6IDAuMDEsIHJhcml0eTogJ0xlZ2VuZGFyaW8nIH0sXHJcbiAgICB7IG5hbWU6ICdSdWJcdTAwRUQgQ2VsZXN0aWFsJywgcHJpY2U6IDQxMCwgcHJvYmFiaWxpdHk6IDAuMDIsIHJhcml0eTogJ1x1MDBDOXBpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdaYWZpcm8gRXN0ZWxhcicsIHByaWNlOiAzMzUsIHByb2JhYmlsaXR5OiAwLjAzLCByYXJpdHk6ICdcdTAwQzlwaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnRXNtZXJhbGRhIENcdTAwRjNzbWljYScsIHByaWNlOiAyNTAsIHByb2JhYmlsaXR5OiAwLjA0LCByYXJpdHk6ICdcdTAwQzlwaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnXHUwMEQzcGFsbyBHYWxcdTAwRTFjdGljbycsIHByaWNlOiAxODAsIHByb2JhYmlsaXR5OiAwLjA1LCByYXJpdHk6ICdSYXJvJyB9LFxyXG4gICAgeyBuYW1lOiAnRXNxdWlybGEgZGUgQXN0ZXJvaWRlJywgcHJpY2U6IDEyNSwgcHJvYmFiaWxpdHk6IDAuMDcsIHJhcml0eTogJ1BvY28gY29tXHUwMEZBbicgfSxcclxuICAgIHsgbmFtZTogJ0dlbWEgZGUgTmVcdTAwRjNuJywgcHJpY2U6IDg1LCBwcm9iYWJpbGl0eTogMC4wOCwgcmFyaXR5OiAnUG9jbyBjb21cdTAwRkFuJyB9LFxyXG4gICAgeyBuYW1lOiAnUm9jYSBFc3BhY2lhbCcsIHByaWNlOiA1MCwgcHJvYmFiaWxpdHk6IDAuMTAsIHJhcml0eTogJ1BvY28gY29tXHUwMEZBbicgfSxcclxuICAgIHsgbmFtZTogJ0NyaXN0YWwgTHVuYXInLCBwcmljZTogMzAsIHByb2JhYmlsaXR5OiAwLjE1LCByYXJpdHk6ICdDb21cdTAwRkFuJyB9LFxyXG4gICAgeyBuYW1lOiAnRnJhZ21lbnRvIGRlIENvbWV0YScsIHByaWNlOiAxNSwgcHJvYmFiaWxpdHk6IDAuMjAsIHJhcml0eTogJ0NvbVx1MDBGQW4nIH0sXHJcbiAgICB7IG5hbWU6ICdQb2x2byBFc3RlbGFyJywgcHJpY2U6IDEwLCBwcm9iYWJpbGl0eTogMC4yNSwgcmFyaXR5OiAnQ29tXHUwMEZBbicgfVxyXG5dO1xyXG5cclxuY29uc3QgZW1iZWRDb2xvcnMgPSBbXHJcbiAgICB7IHJhcml0eTogJ1Npbmd1bGFyJywgY29sb3I6ICcjMDMwMDAwJyB9LFxyXG4gICAgeyByYXJpdHk6ICdcdTAwREFuaWNvJywgY29sb3I6ICcjZmYwZDI1JyB9LFxyXG4gICAgeyByYXJpdHk6ICdNXHUwMEVEdGljbycsIGNvbG9yOiAnIzQzMzZmZicgfSxcclxuICAgIHsgcmFyaXR5OiAnTGVnZW5kYXJpbycsIGNvbG9yOiAnI2ZmNzYwNScgfSxcclxuICAgIHsgcmFyaXR5OiAnXHUwMEM5cGljbycsIGNvbG9yOiAnIzY5MDVmZicgfSxcclxuICAgIHsgcmFyaXR5OiAnUmFybycsIGNvbG9yOiAnIzAwYzdiZCcgfSxcclxuICAgIHsgcmFyaXR5OiAnUG9jbyBjb21cdTAwRkFuJywgY29sb3I6ICcjMDBmZjk1JyB9LFxyXG4gICAgeyByYXJpdHk6ICdDb21cdTAwRkFuJywgY29sb3I6ICcjZTBkZWRlJyB9XHJcbl1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbU1pbmVyYWwoKSB7XHJcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgbGV0IGN1bXVsYXRpdmVQcm9iYWJpbGl0eSA9IDA7XHJcblxyXG4gICAgZm9yIChjb25zdCBtaW5lcmFsIG9mIG1pbmVyYWxzKSB7XHJcbiAgICAgICAgY3VtdWxhdGl2ZVByb2JhYmlsaXR5ICs9IG1pbmVyYWwucHJvYmFiaWxpdHk7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IGN1bXVsYXRpdmVQcm9iYWJpbGl0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluZXJhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1pbmVyYWxzWzBdO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gICAgZGF0YTogbmV3IFNsYXNoQ29tbWFuZEJ1aWxkZXIoKVxyXG4gICAgICAuc2V0TmFtZSgnbWluZScpXHJcbiAgICAgIC5zZXREZXNjcmlwdGlvbignTWluYSBwYXJhIGVuY29udHJhciBtaW5lcmFsZXMgZXNwYWNpYWxlcyB5IGdhbmFyIG1vbmVkYXMuJyksXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAgICovXHJcbiAgICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VzdGUgY29tYW5kbyBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIGVuIHNlcnZpZG9yZXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RNaW5lID0gZGF0YS5sYXN0TWluZTtcclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0TWluZTtcclxuICAgICAgICBjb25zdCBkaWZmTWludXRlcyA9IE1hdGguZmxvb3IoZGlmZiAvIDEwMDAgLyA2MCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoZGlmZk1pbnV0ZXMgPCA1KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXNMZWZ0ID0gNSAtIGRpZmZNaW51dGVzO1xyXG4gICAgICAgICAgICByZXR1cm4gaW50ZXJhY3Rpb24ucmVwbHkoeyBlbWJlZHM6IFtlbWJlZC5zZXREZXNjcmlwdGlvbihgWWEgaGFzIG1pbmFkbyByZWNpZW50ZW1lbnRlLiBQdWVkZXMgbWluYXIgZGUgbnVldm8gZW4gJHttaW51dGVzTGVmdH0gbWludXRvcy5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5sYXN0TWluZSA9IG5vdztcclxuICAgICAgICBjb25zdCBtaW5lcmFsID0gZ2V0UmFuZG9tTWluZXJhbCgpO1xyXG4gICAgICAgIGRhdGEuYmFsYW5jZSArPSBtaW5lcmFsLnByaWNlO1xyXG4gICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgICBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkLnNldFRpdGxlKCdNaW5lclx1MDBFRGEnKS5zZXREZXNjcmlwdGlvbihgSGFzIGVuY29udHJhZG8gKioke21pbmVyYWwubmFtZX0qKiAoJHttaW5lcmFsLnJhcml0eX0pIHkgZ2FuYWRvICR7bWluZXJhbC5wcmljZX0gbW9uZWRhcy4gQWhvcmEgdGllbmVzICR7ZGF0YS5iYWxhbmNlfSBtb25lZGFzLmApLnNldENvbG9yKGVtYmVkQ29sb3JzLmZpbmQoY29sb3IgPT4gY29sb3IucmFyaXR5ID09PSBtaW5lcmFsLnJhcml0eSkuY29sb3IpLnNldFRodW1ibmFpbChcImh0dHBzOi8vY2RuLWljb25zLWdpZi5mbGF0aWNvbi5jb20vMTIzMjIvMTIzMjIzMDcuZ2lmXCIpXSB9KTtcclxuICAgIH0sXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU0sRUFBRSxjQUFjLG9CQUFvQixJQUFJLFVBQVEsWUFBWTtBQUNsRSxRQUFNLFVBQVU7QUFFaEIsUUFBTSxXQUFXO0FBQUEsTUFDYixFQUFFLE1BQU0sMEJBQTBCLE9BQU8sS0FBUyxhQUFhLE1BQVcsUUFBUSxXQUFXO0FBQUEsTUFDN0YsRUFBRSxNQUFNLHFCQUFxQixPQUFPLFFBQVEsYUFBYSxNQUFVLFFBQVEsV0FBVztBQUFBLE1BQ3RGLEVBQUUsTUFBTSw0QkFBNEIsT0FBTyxNQUFNLGFBQWEsTUFBUyxRQUFRLFdBQVE7QUFBQSxNQUN2RixFQUFFLE1BQU0seUJBQXNCLE9BQU8sTUFBTSxhQUFhLE1BQVMsUUFBUSxXQUFRO0FBQUEsTUFDakYsRUFBRSxNQUFNLHlCQUF5QixPQUFPLE1BQU0sYUFBYSxNQUFTLFFBQVEsV0FBUTtBQUFBLE1BQ3BGLEVBQUUsTUFBTSxzQkFBc0IsT0FBTyxNQUFNLGFBQWEsTUFBUyxRQUFRLFdBQVE7QUFBQSxNQUNqRixFQUFFLE1BQU0sZUFBZSxPQUFPLE1BQU0sYUFBYSxNQUFTLFFBQVEsV0FBUTtBQUFBLE1BQzFFLEVBQUUsTUFBTSx5QkFBc0IsT0FBTyxNQUFNLGFBQWEsTUFBUyxRQUFRLFdBQVE7QUFBQSxNQUNqRixFQUFFLE1BQU0scUNBQXFDLE9BQU8sTUFBTSxhQUFhLE1BQVEsUUFBUSxZQUFTO0FBQUEsTUFDaEcsRUFBRSxNQUFNLHVCQUF1QixPQUFPLE1BQU0sYUFBYSxNQUFRLFFB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