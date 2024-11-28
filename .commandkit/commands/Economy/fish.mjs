import {
  require_economy
} from "../../chunk-V3SJSG5S.mjs";
import {
  __commonJS,
  __name,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/Economy/fish.js
var require_fish = __commonJS({
  "src/commands/Economy/fish.js"(exports, module) {
    init_esm_shims();
    var { EmbedBuilder, SlashCommandBuilder } = __require("discord.js");
    var economy = require_economy();
    var fishTypes = [
      { name: "Pez Estrella", price: 1e5, probability: 1e-7, rarity: "Singular" },
      { name: "Pez Gal\xE1ctico", price: 75e3, probability: 1e-6, rarity: "Singular" },
      { name: "Pez Nebuloso", price: 5e4, probability: 3e-5, rarity: "\xDAnico" },
      { name: "Pez Cometa", price: 4237, probability: 5e-5, rarity: "\xDAnico" },
      { name: "Pez Supernova", price: 3125, probability: 6e-5, rarity: "\xDAnico" },
      { name: "Pez Cu\xE1sar", price: 2876, probability: 7e-5, rarity: "\xDAnico" },
      { name: "Pez Pulsar", price: 1987, probability: 8e-5, rarity: "\xDAnico" },
      { name: "Pez Meteoro", price: 1765, probability: 9e-5, rarity: "\xDAnico" },
      { name: "Pez Asteroide", price: 1543, probability: 1e-4, rarity: "M\xEDtico" },
      { name: "Pez Planeta", price: 1321, probability: 2e-4, rarity: "M\xEDtico" },
      { name: "Pez Sat\xE9lite", price: 1109, probability: 3e-4, rarity: "M\xEDtico" },
      { name: "Pez Estrella Fugaz", price: 987, probability: 4e-4, rarity: "M\xEDtico" },
      { name: "Pez Lunar", price: 876, probability: 5e-4, rarity: "M\xEDtico" },
      { name: "Pez Solar", price: 765, probability: 1e-3, rarity: "M\xEDtico" },
      { name: "Pez C\xF3smico", price: 654, probability: 2e-3, rarity: "M\xEDtico" },
      { name: "Pez Espacial", price: 543, probability: 5e-3, rarity: "Legendario" },
      { name: "Pez Estelar", price: 432, probability: 0.01, rarity: "Legendario" },
      { name: "Pez Galaxia", price: 321, probability: 0.02, rarity: "\xC9pico" },
      { name: "Pez V\xEDa L\xE1ctea", price: 210, probability: 0.03, rarity: "\xC9pico" },
      { name: "Pez Andr\xF3meda", price: 109, probability: 0.04, rarity: "\xC9pico" },
      { name: "Pez Ori\xF3n", price: 98, probability: 0.05, rarity: "Raro" },
      { name: "Pez Cassiopeia", price: 87, probability: 0.07, rarity: "Poco com\xFAn" },
      { name: "Pez Pegaso", price: 76, probability: 0.08, rarity: "Poco com\xFAn" },
      { name: "Pez H\xE9rcules", price: 65, probability: 0.1, rarity: "Poco com\xFAn" },
      { name: "Pez Draco", price: 54, probability: 0.15, rarity: "Com\xFAn" },
      { name: "Pez F\xE9nix", price: 43, probability: 0.2, rarity: "Com\xFAn" },
      { name: "Pez Centauro", price: 32, probability: 0.25, rarity: "Com\xFAn" },
      { name: "Pez Hidra", price: 21, probability: 0.25, rarity: "Com\xFAn" }
    ];
    var failMessages = [
      "\xA1El pez se solt\xF3!",
      "\xA1Solo has tra\xEDdo algas!",
      "\xA1El anzuelo se rompi\xF3!",
      "\xA1No has pescado nada!",
      "\xA1El pez escap\xF3!"
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
    function getRandomFish() {
      const random = Math.random();
      let cumulativeProbability = 0;
      for (const fish of fishTypes) {
        cumulativeProbability += fish.probability;
        if (random < cumulativeProbability) {
          return fish;
        }
      }
      return fishTypes[0];
    }
    __name(getRandomFish, "getRandomFish");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("fish").setDescription("Intenta pescar para ganar monedas."),
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
        const lastFish = data.lastFish;
        const now = /* @__PURE__ */ new Date();
        const diff = now - lastFish;
        const diffMinutes = Math.floor(diff / 1e3 / 60);
        if (diffMinutes < 5) {
          const minutesLeft = 5 - diffMinutes;
          return interaction.reply({ embeds: [embed.setDescription(`Ya has pescado recientemente. Puedes pescar de nuevo en ${minutesLeft} minutos.`).setColor("Red")] });
        }
        data.lastFish = now;
        const success = Math.random() < 0.7;
        if (success) {
          const fish = getRandomFish();
          data.balance += fish.price;
          await data.save();
          return interaction.reply({ embeds: [embed.setTitle("Pesca exitosa").setDescription(`Has pescado un ${fish.name} (${fish.rarity}) y ganado ${fish.price} monedas. Ahora tienes ${data.balance} monedas.`).setColor(embedColors.find((color) => color.rarity === fish.rarity).color)] });
        } else {
          const failMessage = failMessages[Math.floor(Math.random() * failMessages.length)];
          return interaction.reply({ embeds: [embed.setTitle("Pesca fallida").setDescription(`${failMessage} No has ganado ninguna moneda.`).setColor("Red")] });
        }
      }
    };
  }
});
export default require_fish();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0Vjb25vbXkvZmlzaC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgeyBFbWJlZEJ1aWxkZXIsIFNsYXNoQ29tbWFuZEJ1aWxkZXIgfSA9IHJlcXVpcmUoXCJkaXNjb3JkLmpzXCIpO1xyXG5jb25zdCBlY29ub215ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWxzL2Vjb25vbXknKTtcclxuXHJcbmNvbnN0IGZpc2hUeXBlcyA9IFtcclxuICAgIHsgbmFtZTogJ1BleiBFc3RyZWxsYScsIHByaWNlOiAxMDAwMDAsIHByb2JhYmlsaXR5OiAwLjAwMDAwMDEsIHJhcml0eTogJ1Npbmd1bGFyJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEdhbFx1MDBFMWN0aWNvJywgcHJpY2U6IDc1MDAwLCBwcm9iYWJpbGl0eTogMC4wMDAwMDEsIHJhcml0eTogJ1Npbmd1bGFyJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IE5lYnVsb3NvJywgcHJpY2U6IDUwMDAwLCBwcm9iYWJpbGl0eTogMC4wMDAwMywgcmFyaXR5OiAnXHUwMERBbmljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBDb21ldGEnLCBwcmljZTogNDIzNywgcHJvYmFiaWxpdHk6IDAuMDAwMDUsIHJhcml0eTogJ1x1MDBEQW5pY28nIH0sXHJcbiAgICB7IG5hbWU6ICdQZXogU3VwZXJub3ZhJywgcHJpY2U6IDMxMjUsIHByb2JhYmlsaXR5OiAwLjAwMDA2LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEN1XHUwMEUxc2FyJywgcHJpY2U6IDI4NzYsIHByb2JhYmlsaXR5OiAwLjAwMDA3LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IFB1bHNhcicsIHByaWNlOiAxOTg3LCBwcm9iYWJpbGl0eTogMC4wMDAwOCwgcmFyaXR5OiAnXHUwMERBbmljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBNZXRlb3JvJywgcHJpY2U6IDE3NjUsIHByb2JhYmlsaXR5OiAwLjAwMDA5LCByYXJpdHk6ICdcdTAwREFuaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEFzdGVyb2lkZScsIHByaWNlOiAxNTQzLCBwcm9iYWJpbGl0eTogMC4wMDAxLCByYXJpdHk6ICdNXHUwMEVEdGljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBQbGFuZXRhJywgcHJpY2U6IDEzMjEsIHByb2JhYmlsaXR5OiAwLjAwMDIsIHJhcml0eTogJ01cdTAwRUR0aWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IFNhdFx1MDBFOWxpdGUnLCBwcmljZTogMTEwOSwgcHJvYmFiaWxpdHk6IDAuMDAwMywgcmFyaXR5OiAnTVx1MDBFRHRpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdQZXogRXN0cmVsbGEgRnVnYXonLCBwcmljZTogOTg3LCBwcm9iYWJpbGl0eTogMC4wMDA0LCByYXJpdHk6ICdNXHUwMEVEdGljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBMdW5hcicsIHByaWNlOiA4NzYsIHByb2JhYmlsaXR5OiAwLjAwMDUsIHJhcml0eTogJ01cdTAwRUR0aWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IFNvbGFyJywgcHJpY2U6IDc2NSwgcHJvYmFiaWxpdHk6IDAuMDAxLCByYXJpdHk6ICdNXHUwMEVEdGljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBDXHUwMEYzc21pY28nLCBwcmljZTogNjU0LCBwcm9iYWJpbGl0eTogMC4wMDIsIHJhcml0eTogJ01cdTAwRUR0aWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEVzcGFjaWFsJywgcHJpY2U6IDU0MywgcHJvYmFiaWxpdHk6IDAuMDA1LCByYXJpdHk6ICdMZWdlbmRhcmlvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEVzdGVsYXInLCBwcmljZTogNDMyLCBwcm9iYWJpbGl0eTogMC4wMSwgcmFyaXR5OiAnTGVnZW5kYXJpbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBHYWxheGlhJywgcHJpY2U6IDMyMSwgcHJvYmFiaWxpdHk6IDAuMDIsIHJhcml0eTogJ1x1MDBDOXBpY28nIH0sXHJcbiAgICB7IG5hbWU6ICdQZXogVlx1MDBFRGEgTFx1MDBFMWN0ZWEnLCBwcmljZTogMjEwLCBwcm9iYWJpbGl0eTogMC4wMywgcmFyaXR5OiAnXHUwMEM5cGljbycgfSxcclxuICAgIHsgbmFtZTogJ1BleiBBbmRyXHUwMEYzbWVkYScsIHByaWNlOiAxMDksIHByb2JhYmlsaXR5OiAwLjA0LCByYXJpdHk6ICdcdTAwQzlwaWNvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IE9yaVx1MDBGM24nLCBwcmljZTogOTgsIHByb2JhYmlsaXR5OiAwLjA1LCByYXJpdHk6ICdSYXJvJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IENhc3Npb3BlaWEnLCBwcmljZTogODcsIHByb2JhYmlsaXR5OiAwLjA3LCByYXJpdHk6ICdQb2NvIGNvbVx1MDBGQW4nIH0sXHJcbiAgICB7IG5hbWU6ICdQZXogUGVnYXNvJywgcHJpY2U6IDc2LCBwcm9iYWJpbGl0eTogMC4wOCwgcmFyaXR5OiAnUG9jbyBjb21cdTAwRkFuJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEhcdTAwRTlyY3VsZXMnLCBwcmljZTogNjUsIHByb2JhYmlsaXR5OiAwLjEwLCByYXJpdHk6ICdQb2NvIGNvbVx1MDBGQW4nIH0sXHJcbiAgICB7IG5hbWU6ICdQZXogRHJhY28nLCBwcmljZTogNTQsIHByb2JhYmlsaXR5OiAwLjE1LCByYXJpdHk6ICdDb21cdTAwRkFuJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IEZcdTAwRTluaXgnLCBwcmljZTogNDMsIHByb2JhYmlsaXR5OiAwLjIwLCByYXJpdHk6ICdDb21cdTAwRkFuJyB9LFxyXG4gICAgeyBuYW1lOiAnUGV6IENlbnRhdXJvJywgcHJpY2U6IDMyLCBwcm9iYWJpbGl0eTogMC4yNSwgcmFyaXR5OiAnQ29tXHUwMEZBbicgfSxcclxuICAgIHsgbmFtZTogJ1BleiBIaWRyYScsIHByaWNlOiAyMSwgcHJvYmFiaWxpdHk6IDAuMjUsIHJhcml0eTogJ0NvbVx1MDBGQW4nIH1cclxuXTtcclxuXHJcbmNvbnN0IGZhaWxNZXNzYWdlcyA9IFtcclxuICAgIFwiXHUwMEExRWwgcGV6IHNlIHNvbHRcdTAwRjMhXCIsXHJcbiAgICBcIlx1MDBBMVNvbG8gaGFzIHRyYVx1MDBFRGRvIGFsZ2FzIVwiLFxyXG4gICAgXCJcdTAwQTFFbCBhbnp1ZWxvIHNlIHJvbXBpXHUwMEYzIVwiLFxyXG4gICAgXCJcdTAwQTFObyBoYXMgcGVzY2FkbyBuYWRhIVwiLFxyXG4gICAgXCJcdTAwQTFFbCBwZXogZXNjYXBcdTAwRjMhXCJcclxuXTtcclxuXHJcbmNvbnN0IGVtYmVkQ29sb3JzID0gW1xyXG4gICAgeyByYXJpdHk6ICdTaW5ndWxhcicsIGNvbG9yOiAnIzAzMDAwMCcgfSxcclxuICAgIHsgcmFyaXR5OiAnXHUwMERBbmljbycsIGNvbG9yOiAnI2ZmMGQyNScgfSxcclxuICAgIHsgcmFyaXR5OiAnTVx1MDBFRHRpY28nLCBjb2xvcjogJyM0MzM2ZmYnIH0sXHJcbiAgICB7IHJhcml0eTogJ0xlZ2VuZGFyaW8nLCBjb2xvcjogJyNmZjc2MDUnIH0sXHJcbiAgICB7IHJhcml0eTogJ1x1MDBDOXBpY28nLCBjb2xvcjogJyM2OTA1ZmYnIH0sXHJcbiAgICB7IHJhcml0eTogJ1Jhcm8nLCBjb2xvcjogJyMwMGM3YmQnIH0sXHJcbiAgICB7IHJhcml0eTogJ1BvY28gY29tXHUwMEZBbicsIGNvbG9yOiAnIzAwZmY5NScgfSxcclxuICAgIHsgcmFyaXR5OiAnQ29tXHUwMEZBbicsIGNvbG9yOiAnI2UwZGVkZScgfVxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tRmlzaCgpIHtcclxuICAgIGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICBsZXQgY3VtdWxhdGl2ZVByb2JhYmlsaXR5ID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZpc2ggb2YgZmlzaFR5cGVzKSB7XHJcbiAgICAgICAgY3VtdWxhdGl2ZVByb2JhYmlsaXR5ICs9IGZpc2gucHJvYmFiaWxpdHk7XHJcbiAgICAgICAgaWYgKHJhbmRvbSA8IGN1bXVsYXRpdmVQcm9iYWJpbGl0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmlzaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpc2hUeXBlc1swXTtcclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyoqIEB0eXBlIHtpbXBvcnQoJ2NvbW1hbmRraXQnKS5Db21tYW5kRGF0YX0gICovXHJcbiAgICBkYXRhOiBuZXcgU2xhc2hDb21tYW5kQnVpbGRlcigpXHJcbiAgICAgIC5zZXROYW1lKCdmaXNoJylcclxuICAgICAgLnNldERlc2NyaXB0aW9uKCdJbnRlbnRhIHBlc2NhciBwYXJhIGdhbmFyIG1vbmVkYXMuJyksXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCdjb21tYW5ka2l0JykuU2xhc2hDb21tYW5kUHJvcHN9IHBhcmFtMFxyXG4gICAgICovXHJcbiAgICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG4gICAgICAgIGlmICghaW50ZXJhY3Rpb24uZ3VpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oJ0VzdGUgY29tYW5kbyBzb2xvIGVzdFx1MDBFMSBkaXNwb25pYmxlIGVuIHNlcnZpZG9yZXMuJykuc2V0Q29sb3IoJ1JlZCcpXSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZWNvbm9teS5maW5kT25lKHsgdXNlcklkOiBpbnRlcmFjdGlvbi51c2VyLmlkLCBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgZWNvbm9teSh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGludGVyYWN0aW9uLnVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICBndWlsZElkOiBpbnRlcmFjdGlvbi5ndWlsZC5pZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEZpc2ggPSBkYXRhLmxhc3RGaXNoO1xyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IG5vdyAtIGxhc3RGaXNoO1xyXG4gICAgICAgIGNvbnN0IGRpZmZNaW51dGVzID0gTWF0aC5mbG9vcihkaWZmIC8gMTAwMCAvIDYwKTtcclxuXHJcbiAgICAgICAgaWYgKGRpZmZNaW51dGVzIDwgNSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzTGVmdCA9IDUgLSBkaWZmTWludXRlcztcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0RGVzY3JpcHRpb24oYFlhIGhhcyBwZXNjYWRvIHJlY2llbnRlbWVudGUuIFB1ZWRlcyBwZXNjYXIgZGUgbnVldm8gZW4gJHttaW51dGVzTGVmdH0gbWludXRvcy5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5sYXN0RmlzaCA9IG5vdztcclxuXHJcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IE1hdGgucmFuZG9tKCkgPCAwLjc7XHJcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlzaCA9IGdldFJhbmRvbUZpc2goKTtcclxuICAgICAgICAgICAgZGF0YS5iYWxhbmNlICs9IGZpc2gucHJpY2U7XHJcbiAgICAgICAgICAgIGF3YWl0IGRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1Blc2NhIGV4aXRvc2EnKS5zZXREZXNjcmlwdGlvbihgSGFzIHBlc2NhZG8gdW4gJHtmaXNoLm5hbWV9ICgke2Zpc2gucmFyaXR5fSkgeSBnYW5hZG8gJHtmaXNoLnByaWNlfSBtb25lZGFzLiBBaG9yYSB0aWVuZXMgJHtkYXRhLmJhbGFuY2V9IG1vbmVkYXMuYCkuc2V0Q29sb3IoZW1iZWRDb2xvcnMuZmluZChjb2xvciA9PiBjb2xvci5yYXJpdHkgPT09IGZpc2gucmFyaXR5KS5jb2xvcildIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhaWxNZXNzYWdlID0gZmFpbE1lc3NhZ2VzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZhaWxNZXNzYWdlcy5sZW5ndGgpXTtcclxuICAgICAgICAgICAgcmV0dXJuIGludGVyYWN0aW9uLnJlcGx5KHsgZW1iZWRzOiBbZW1iZWQuc2V0VGl0bGUoJ1Blc2NhIGZhbGxpZGEnKS5zZXREZXNjcmlwdGlvbihgJHtmYWlsTWVzc2FnZX0gTm8gaGFzIGdhbmFkbyBuaW5ndW5hIG1vbmVkYS5gKS5zZXRDb2xvcignUmVkJyldIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU0sRUFBRSxjQUFjLG9CQUFvQixJQUFJLFVBQVEsWUFBWTtBQUNsRSxRQUFNLFVBQVU7QUFFaEIsUUFBTSxZQUFZO0FBQUEsTUFDZCxFQUFFLE1BQU0sZ0JBQWdCLE9BQU8sS0FBUSxhQUFhLE1BQVcsUUFBUSxXQUFXO0FBQUEsTUFDbEYsRUFBRSxNQUFNLG9CQUFpQixPQUFPLE1BQU8sYUFBYSxNQUFVLFFBQVEsV0FBVztBQUFBLE1BQ2pGLEVBQUUsTUFBTSxnQkFBZ0IsT0FBTyxLQUFP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