import {
  __commonJS,
  __require,
  init_esm_shims
} from "../../chunk-M3OKE2XU.mjs";

// src/events/ready/weather.js
var require_weather = __commonJS({
  "src/events/ready/weather.js"(exports, module) {
    init_esm_shims();
    var { EmbedBuilder } = __require("discord.js");
    var axios = __require("axios");
    __require("dotenv").config();
    module.exports = async (client) => {
      const channel = client.channels.cache.get("1180196042550038548");
      const messages = await channel.messages.fetch({ limit: 100 });
      let messageToUpdate = messages.find((msg) => msg.author.bot);
      setInterval(async () => {
        try {
          const now = Math.floor(Date.now() / 1e3);
          const formattedTime = `<t:${now}:T>`;
          const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Pitrufquen&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=es`);
          const weather = weatherResponse.data;
          const embed = new EmbedBuilder().setTitle("Meteorolog\xEDa").setDescription(`Clima en del servidor en la zona sur de Chile.`).setThumbnail(`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`).addFields(
            { name: "Hora", value: formattedTime, inline: true },
            { name: `Puesta de sol`, value: `<t:${weather.sys.sunset}:T>`, inline: true },
            { name: `Amanecer`, value: `<t:${weather.sys.sunrise}:T>`, inline: true },
            { name: "Temperatura", value: `${weather.main.temp}\xB0C`, inline: false },
            { name: "Sensaci\xF3n t\xE9rmica", value: `${weather.main.feels_like}\xB0C`, inline: false },
            { name: `Humedad`, value: `${weather.main.humidity}%`, inline: false },
            { name: `Presi\xF3n`, value: `${weather.main.pressure} hPa`, inline: false },
            { name: `Estado del cielo`, value: `${weather.weather[0].description}`, inline: false },
            { name: `Viento`, value: `${weather.wind.speed} m/s`, inline: false },
            { name: `Nubosidad`, value: `${weather.clouds.all}%`, inline: false }
          ).setColor("Random");
          if (!messageToUpdate) {
            messageToUpdate = await channel.send({ embeds: [embed] });
          } else {
            messageToUpdate.edit({ embeds: [embed] });
          }
        } catch (error) {
          console.log("Error al obtener los datos del clima:", error);
        }
      }, 3e4);
    };
  }
});
export default require_weather();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL2V2ZW50cy9yZWFkeS93ZWF0aGVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCB7IEVtYmVkQnVpbGRlciB9ID0gcmVxdWlyZSgnZGlzY29yZC5qcycpO1xyXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XHJcbnJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xyXG5cclxuLyoqICogQHBhcmFtIHtpbXBvcnQoJ2Rpc2NvcmQuanMnKS5DbGllbnR9IGNsaWVudCAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jIChjbGllbnQpID0+IHtcclxuICAgIGNvbnN0IGNoYW5uZWwgPSBjbGllbnQuY2hhbm5lbHMuY2FjaGUuZ2V0KCcxMTgwMTk2MDQyNTUwMDM4NTQ4Jyk7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGNoYW5uZWwubWVzc2FnZXMuZmV0Y2goeyBsaW1pdDogMTAwIH0pO1xyXG4gICAgbGV0IG1lc3NhZ2VUb1VwZGF0ZSA9IG1lc3NhZ2VzLmZpbmQobXNnID0+IG1zZy5hdXRob3IuYm90KTtcclxuXHJcbiAgICBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9IGA8dDoke25vd306VD5gO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9UGl0cnVmcXVlbiZhcHBpZD0ke3Byb2Nlc3MuZW52LldFQVRIRVJfQVBJX0tFWX0mdW5pdHM9bWV0cmljJmxhbmc9ZXNgKTtcclxuICAgICAgICBjb25zdCB3ZWF0aGVyID0gd2VhdGhlclJlc3BvbnNlLmRhdGE7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUoJ01ldGVvcm9sb2dcdTAwRURhJylcclxuICAgICAgICAgICAgLnNldERlc2NyaXB0aW9uKGBDbGltYSBlbiBkZWwgc2Vydmlkb3IgZW4gbGEgem9uYSBzdXIgZGUgQ2hpbGUuYClcclxuICAgICAgICAgICAgLnNldFRodW1ibmFpbChgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHt3ZWF0aGVyLndlYXRoZXJbMF0uaWNvbn0ucG5nYClcclxuICAgICAgICAgICAgLmFkZEZpZWxkcyhcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ0hvcmEnLCB2YWx1ZTogZm9ybWF0dGVkVGltZSwgaW5saW5lOiB0cnVlfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogYFB1ZXN0YSBkZSBzb2xgLCB2YWx1ZTogYDx0OiR7d2VhdGhlci5zeXMuc3Vuc2V0fTpUPmAsIGlubGluZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBgQW1hbmVjZXJgLCB2YWx1ZTogYDx0OiR7d2VhdGhlci5zeXMuc3VucmlzZX06VD5gLCBpbmxpbmU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogJ1RlbXBlcmF0dXJhJywgdmFsdWU6IGAke3dlYXRoZXIubWFpbi50ZW1wfVx1MDBCMENgLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6ICdTZW5zYWNpXHUwMEYzbiB0XHUwMEU5cm1pY2EnLCB2YWx1ZTogYCR7d2VhdGhlci5tYWluLmZlZWxzX2xpa2V9XHUwMEIwQ2AsIGlubGluZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogYEh1bWVkYWRgLCB2YWx1ZTogYCR7d2VhdGhlci5tYWluLmh1bWlkaXR5fSVgLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBQcmVzaVx1MDBGM25gLCB2YWx1ZTogYCR7d2VhdGhlci5tYWluLnByZXNzdXJlfSBoUGFgLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBFc3RhZG8gZGVsIGNpZWxvYCwgdmFsdWU6IGAke3dlYXRoZXIud2VhdGhlclswXS5kZXNjcmlwdGlvbn1gLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBWaWVudG9gLCB2YWx1ZTogYCR7d2VhdGhlci53aW5kLnNwZWVkfSBtL3NgLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IGBOdWJvc2lkYWRgLCB2YWx1ZTogYCR7d2VhdGhlci5jbG91ZHMuYWxsfSVgLCBpbmxpbmU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnNldENvbG9yKCdSYW5kb20nKTtcclxuICAgIFxyXG4gICAgICAgIGlmICghbWVzc2FnZVRvVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VUb1VwZGF0ZSA9IGF3YWl0IGNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXNzYWdlVG9VcGRhdGUuZWRpdCh7IGVtYmVkczogW2VtYmVkXSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBhbCBvYnRlbmVyIGxvcyBkYXRvcyBkZWwgY2xpbWE6JywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDMwMDAwKTtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUFNLEVBQUUsYUFBYSxJQUFJLFVBQVEsWUFBWTtBQUM3QyxRQUFNLFFBQVEsVUFBUSxPQUFPO0FBQzdCLGNBQVEsUUFBUSxFQUFFLE9BQU87QUFHekIsV0FBTyxVQUFVLE9BQU8sV0FBVztBQUMvQixZQUFNLFVBQVUsT0FBTyxTQUFTLE1BQU0sSUFBSSxxQkFBcUI7QUFDL0QsWUFBTSxXQUFXLE1BQU0sUUFBUSxTQUFTLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQztBQUM1RCxVQUFJLGtCQUFrQixTQUFTLEtBQUssU0FBTyxJQUFJLE9BQU8sR0FBRztBQUV6RCxrQkFBWSxZQUFZO0FBQ3RCLFlBQUk7QUFDRixnQkFBTSxNQUFNLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxHQUFJO0FBQ3hDLGdCQUFNLGdCQUFnQixNQUFNLEdBQUc7QUFFL0IsZ0JBQU0sa0JBQWtCLE1BQU0sTUFBTSxJQUFJLHFFQUFxRSxRQUFRLElBQUksZUFBZSx1QkFBdUI7QUFDL0osZ0JBQU0sVUFBVSxnQkFBZ0I7QUFFaEMsZ0JBQU0sUUFBUSxJQUFJLGFBQWEsRUFDMUIsU0FBUyxpQkFBYyxFQUN2QixlQUFlLGdEQUFnRCxFQUMvRCxhQUFhLG9DQUFvQyxRQUFRLFFBQVEsQ0FBQyxFQUFFLElBQUksTUFBTSxFQUM5RTtBQUFBLFlBQ0csRUFBRSxNQUFNLFFBQVEsT0FBTyxlQUFlLFFBQVEsS0FBSTtBQUFBLFlBQ2xELEVBQUUsTUFBTSxpQkFBaUIsT0FBTyxNQUFNLFFBQVEsSUFBSSxNQUFNLE9BQU8sUUFBUSxLQUFLO0FBQUEsWUFDNUUsRUFBRSxNQUFNLFlBQVksT0FBTyxNQUFNLFFBQVEsSUFBSSxPQUFPLE9BQU8sUUFBUSxLQUFLO0FBQUEsWUFDeEUsRUFBRSxNQUFNLGVBQWUsT0FBTyxHQUFHLFFBQVEsS0FBSyxJQUFJLFNBQU0sUUFBUSxNQUFNO0FBQUEsWUFDdEUsRUFBRSxNQUFNLDJCQUFxQixPQUFPLEdBQUcsUUFBUSxLQUFLLFVBQVUsU0FBTSxRQUFRLE1BQU07QUFBQSxZQUNsRixFQUFFLE1BQU0sV0FBVyxPQUFPLEdBQUcsUUFBUSxLQUFLLFFBQVEsS0FBSyxRQUFRLE1BQU07QUFBQSxZQUNyRSxFQUFFLE1BQU0sY0FBVyxPQUFPLEdBQUcsUUFBUSxLQUFLLFFBQVEsUUFBUSxRQUFRLE1BQU07QUFBQSxZQUN4RSxFQUFFLE1BQU0sb0JBQW9CLE9BQU8sR0FBRyxRQUFRLFFBQVEsQ0FBQyxFQUFFLFdBQVcsSUFBSSxRQUFRLE1BQU07QUFBQSxZQUN0RixFQUFFLE1BQU0sVUFBVSxPQUFPLEdBQUcsUUFBUSxLQUFLLEtBQUssUUFBUSxRQUFRLE1BQU07QUFBQSxZQUNwRSxFQUFFLE1BQU0sYUFBYSxPQUFPLEdBQUcsUUFBUSxPQUFPLEdBQUcsS0FBSyxRQUFRLE1BQU07QUFBQSxVQUN4RSxFQUNDLFNBQVMsUUFBUTtBQUV0QixjQUFJLENBQUMsaUJBQWlCO0FBQ2xCLDhCQUFrQixNQUFNLFFBQVEsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUFBLFVBQzVELE9BQU87QUFDSCw0QkFBZ0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUFBLFVBQ3hDO0FBQUEsUUFDSixTQUFTLE9BQU87QUFDWixrQkFBUSxJQUFJLHlDQUF5QyxLQUFLO0FBQUEsUUFDOUQ7QUFBQSxNQUNKLEdBQUcsR0FBSztBQUFBLElBQ1o7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=