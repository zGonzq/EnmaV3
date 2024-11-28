import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/commands/General/8ball.js
var require_ball = __commonJS({
  "src/commands/General/8ball.js"(exports, module) {
    init_esm_shims();
    var { SlashCommandBuilder, EmbedBuilder } = __require("discord.js");
    module.exports = {
      /** @type {import('commandkit').CommandData}  */
      data: new SlashCommandBuilder().setName("8ball").setDescription("Hazle una pregunta a la bola m\xE1gica"),
      /**
       * @param {import('commandkit').SlashCommandProps} param0
       */
      run: async ({ interaction, client, handler }) => {
        const embed = new EmbedBuilder();
        const question = interaction.options.getString("question");
        const answers = [
          "S\xED.",
          "No.",
          "Probablemente.",
          "No lo s\xE9.",
          "Pregunta de nuevo m\xE1s tarde.",
          "No puedo responder a eso.",
          "\xA1Claro que s\xED!",
          "\xA1Claro que no!",
          "\xA1Por supuesto!",
          "\xA1Por supuesto que no!",
          "\xA1Por supuesto que s\xED!",
          "\xA1Por supuesto que no lo s\xE9!"
        ];
        const answer = answers[Math.floor(Math.random() * answers.length)];
        embed.setTitle("\u{1F3B1} Bola m\xE1gica");
        embed.setFields({
          name: "Pregunta",
          value: question
        }, {
          name: "Respuesta",
          value: answer
        });
        embed.setColor("Random");
        await interaction.reply({ embeds: [embed] });
      }
    };
  }
});
export default require_ball();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL0dlbmVyYWwvOGJhbGwuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgU2xhc2hDb21tYW5kQnVpbGRlciwgRW1iZWRCdWlsZGVyIH0gPSByZXF1aXJlKCdkaXNjb3JkLmpzJyk7XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIC8qKiBAdHlwZSB7aW1wb3J0KCdjb21tYW5ka2l0JykuQ29tbWFuZERhdGF9ICAqL1xyXG4gIGRhdGE6IG5ldyBTbGFzaENvbW1hbmRCdWlsZGVyKClcclxuICAgIC5zZXROYW1lKCc4YmFsbCcpXHJcbiAgICAuc2V0RGVzY3JpcHRpb24oJ0hhemxlIHVuYSBwcmVndW50YSBhIGxhIGJvbGEgbVx1MDBFMWdpY2EnKSxcclxuICAvKipcclxuICAgKiBAcGFyYW0ge2ltcG9ydCgnY29tbWFuZGtpdCcpLlNsYXNoQ29tbWFuZFByb3BzfSBwYXJhbTBcclxuICAgKi9cclxuICBydW46IGFzeW5jICh7IGludGVyYWN0aW9uLCBjbGllbnQsIGhhbmRsZXIgfSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG5cclxuXHJcbiAgICBjb25zdCBxdWVzdGlvbiA9IGludGVyYWN0aW9uLm9wdGlvbnMuZ2V0U3RyaW5nKCdxdWVzdGlvbicpO1xyXG4gICAgY29uc3QgYW5zd2VycyA9IFtcclxuICAgICAgICAnU1x1MDBFRC4nLFxyXG4gICAgICAgICdOby4nLFxyXG4gICAgICAgICdQcm9iYWJsZW1lbnRlLicsXHJcbiAgICAgICAgJ05vIGxvIHNcdTAwRTkuJyxcclxuICAgICAgICAnUHJlZ3VudGEgZGUgbnVldm8gbVx1MDBFMXMgdGFyZGUuJyxcclxuICAgICAgICAnTm8gcHVlZG8gcmVzcG9uZGVyIGEgZXNvLicsXHJcbiAgICAgICAgJ1x1MDBBMUNsYXJvIHF1ZSBzXHUwMEVEIScsXHJcbiAgICAgICAgJ1x1MDBBMUNsYXJvIHF1ZSBubyEnLFxyXG4gICAgICAgICdcdTAwQTFQb3Igc3VwdWVzdG8hJyxcclxuICAgICAgICAnXHUwMEExUG9yIHN1cHVlc3RvIHF1ZSBubyEnLFxyXG4gICAgICAgICdcdTAwQTFQb3Igc3VwdWVzdG8gcXVlIHNcdTAwRUQhJyxcclxuICAgICAgICAnXHUwMEExUG9yIHN1cHVlc3RvIHF1ZSBubyBsbyBzXHUwMEU5IScsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICBjb25zdCBhbnN3ZXIgPSBhbnN3ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFuc3dlcnMubGVuZ3RoKV07XHJcblxyXG4gICAgZW1iZWQuc2V0VGl0bGUoJ1x1RDgzQ1x1REZCMSBCb2xhIG1cdTAwRTFnaWNhJyk7XHJcbiAgICBlbWJlZC5zZXRGaWVsZHMoe1xyXG4gICAgICAgIG5hbWU6ICdQcmVndW50YScsXHJcbiAgICAgICAgdmFsdWU6IHF1ZXN0aW9uXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1Jlc3B1ZXN0YScsXHJcbiAgICAgICAgdmFsdWU6IGFuc3dlclxyXG4gICAgfSlcclxuICAgIGVtYmVkLnNldENvbG9yKCdSYW5kb20nKTtcclxuXHJcbiAgICBhd2FpdCBpbnRlcmFjdGlvbi5yZXBseSh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICAgIH1cclxufVxyXG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQU0sRUFBRSxxQkFBcUIsYUFBYSxJQUFJLFVBQVEsWUFBWTtBQUNsRSxXQUFPLFVBQVU7QUFBQTtBQUFBLE1BRWYsTUFBTSxJQUFJLG9CQUFvQixFQUMzQixRQUFRLE9BQU8sRUFDZixlQUFlLHdDQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSXZELEtBQUssT0FBTyxFQUFFLGFBQWEsUUFBUSxRQUFRLE1BQU07QUFFL0MsY0FBTSxRQUFRLElBQUksYUFBYTtBQUcvQixjQUFNLFdBQVcsWUFBWSxRQUFRLFVBQVUsVUFBVTtBQUN6RCxjQUFNLFVBQVU7QUFBQSxVQUNaO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNBO0FBRUosY0FBTSxTQUFTLFFBQVEsS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLFFBQVEsTUFBTSxDQUFDO0FBRWpFLGNBQU0sU0FBUywwQkFBZ0I7QUFDL0IsY0FBTSxVQUFVO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDWCxHQUFHO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDWCxDQUFDO0FBQ0QsY0FBTSxTQUFTLFFBQVE7QUFFdkIsY0FBTSxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFBQSxNQUMzQztBQUFBLElBQ0o7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=