# Enma Bot

EnmaV3 es un bot de Discord desarrollado para proporcionar una variedad de funcionalidades, incluyendo economía, moderación, diversión, integraciones y utilidades. Este README proporciona una visión general de las tecnologías utilizadas, las APIs integradas, los comandos disponibles y la estructura del proyecto.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Discord.js**: Librería para interactuar con la API de Discord.
- **Mongoose**: Librería para modelar datos en MongoDB.
- **Axios**: Cliente HTTP para realizar solicitudes a APIs externas.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **commandkit**: Framework para gestionar comandos y eventos de Discord.js.

## APIs Integradas

- **osu! API**: Para obtener estadísticas de usuarios de osu!
- **Trace.moe API**: Para buscar información de anime a partir de una imagen.
- **Jikan API**: Para obtener información de anime.
- **PokeAPI**: Para obtener información de Pokémon.
- **OpenWeatherMap API**: Para obtener información del clima.

## Comandos

### Economía
- `/balance`: Muestra el saldo de tu cuenta o de otro usuario.
- `/daily`: Reclama tus monedas diarias.
- `/mine`: Mina para encontrar minerales espaciales y ganar monedas.
- `/pay`: Paga a otro usuario una cantidad de monedas.
- `/rob`: Intenta robar monedas de otro usuario.
- `/shop`: Muestra los roles disponibles en la tienda.
- `/buy`: Compra un rol de la tienda.
- `/work`: Trabaja para ganar monedas.
- `/miniwork`: Trabaja por un corto período para ganar algunas monedas.
- `/coinflip`: Apuesta monedas en un lanzamiento de moneda.
- `/crime`: Intenta cometer un crimen para ganar monedas.
- `/fish`: Intenta pescar para ganar monedas.

### Moderación
- `/timeout`: Silencia a un usuario.
- `/clear`: Limpia los mensajes del chat.

### Diversión
- `/8ball`: Hazle una pregunta a la bola mágica.
- `/rps`: Juega piedra, papel o tijeras.
- `/rng`: Genera un número aleatorio.

### Integraciones
- `/osu`: Obtiene estadísticas de un usuario de osu!
- `/findanime`: Busca información de un anime a partir de una imagen.
- `/randomanime`: Recomienda un anime aleatorio.
- `/findpokemon`: Busca información de un Pokémon específico.
- `/weather`: Obtiene el clima de una ciudad específica.

### Utilidades
- `/help`: Muestra la lista de comandos organizados por categorías.
- `/feedback`: Envía tus comentarios o sugerencias.
- `/todo`: Gestiona tu lista de tareas.
- `/embed`: Crea un embed personalizado.
- `/emoji`: Obtener el png de un emoji.
- `/cumpleanos`: Gestiona tu fecha de cumpleaños.
- `/invite`: Invita al bot a tu servidor.

### Administración
- `/setshop`: Gestiona la tienda de roles.
- `/giveall`: Añade un rol a todos los usuarios o bots del servidor.
- `/logs`: Gestiona los logs del servidor.
- `/welcomemsg`: Configura los mensajes de bienvenida y despedida.

### Desarrollo
- `/reload`: Recarga algunos archivos del bot.
- `/givemoney`: Da dinero a tu usuario para testing.
- `/serverlist`: Enumera cada servidor en el que está el bot y cuántos jugadores hay por servidor.

## Estructura del Proyecto

```
EnmaV3/
├── src/
│   ├── commands/
│   │   ├── Admin/
│   │   ├── Context/
│   │   ├── Dev/
│   │   ├── Economy/
│   │   ├── Fun/
│   │   ├── General/
│   │   ├── Integrations/
│   │   ├── Moderator/
│   │   └── Util/
│   ├── events/
│   │   ├── channelCreate/
│   │   ├── channelDelete/
│   │   ├── guildBanAdd/
│   │   ├── guildBanRemove/
│   │   ├── guildMemberAdd/
│   │   ├── guildMemberRemove/
│   │   ├── guildUpdate/
│   │   ├── inviteCreate/
│   │   ├── inviteDelete/
│   │   ├── messageCreate/
│   │   ├── messageDelete/
│   │   ├── messageDeleteBulk/
│   │   ├── messageUpdate/
│   │   ├── ready/
│   │   ├── roleCreate/
│   │   ├── roleDelete/
│   │   ├── roleUpdate/
│   │   └── voiceStateUpdate/
│   ├── handler/
│   ├── models/
│   └── utils/
├── .env
├── .gitignore
├── package.json
├── README.md
└── index.js
```

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/EnmaV3.git
    ```
2. Instala las dependencias:
    ```sh
    cd EnmaV3
    npm install
    ```
3. Crea un archivo `.env` y configura las variables de entorno necesarias:
    ```env
    TOKEN=tu-token-de-discord
    MONGO_URI=tu-uri-de-mongodb
    OSU_API_KEY=tu-api-key-de-osu
    WEATHER_API_KEY=tu-api-key-de-openweathermap
    FEEDBACK_WEBHOOK_URL=tu-webhook-url
    ```
4. Inicia el bot:
    ```sh
    npm start
    ```

## Contribución

Si deseas contribuir al proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
