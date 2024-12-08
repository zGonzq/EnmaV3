const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../../models/economy');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Muestra el saldo de tu cuenta o de otro usuario')
    .addUserOption((option) => option
      .setName('usuario')
      .setDescription('El usuario del que quieres ver el saldo')
      .setRequired(false)),


  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
        return interaction.reply({ embeds: [embed.setDescription('Este comando solo está disponible en servidores.').setColor('Red')] });
    }

    const targetUser = interaction.options.getUser('usuario') || interaction.user;

    if(targetUser.bot) {
        return interaction.reply({ embeds: [embed.setDescription('No puedes ver el balance de un bot.').setColor('Red')] });
    }

    let data = await economy.findOne({ userId: targetUser.id, guildId: interaction.guild.id });

    if (!data) {
        data = new economy({
            userId: targetUser.id,
            guildId: interaction.guild.id,
        });
        await data.save();
    }

    const now = new Date();

    const getCooldownStatus = (lastTime, cooldown) => {
        const diff = now - lastTime;
        const diffMinutes = Math.floor(diff / 1000 / 60);
        const diffHours = Math.floor(diff / 1000 / 60 / 60);

        if (cooldown === 'hourly' && diffHours < 1) {
            return `Disponible en ${60 - diffMinutes % 60} minutos 🔴`;
        } else if (cooldown === 'daily' && diffHours < 24) {
            return `Disponible en ${24 - diffHours} horas 🔴`;
        } else if (cooldown === 'weekly' && diffHours < 168) {
            return `Disponible en ${168 - diffHours} horas 🔴`;
        } else if (cooldown === 'minutes' && diffMinutes < 5) {
            return `Disponible en ${5 - diffMinutes} minutos 🔴`;
        } else if (cooldown === 'half-hour' && diffMinutes < 30) {
            return `Disponible en ${30 - diffMinutes} minutos 🔴`;
        } else if (cooldown === 'ten minutes' && diffMinutes < 10) {
            return `Disponible en ${10 - diffMinutes} minutos 🔴`;
        } else {
            return 'Disponible 🟢';
        }
    };

    const cooldowns = [
        { name: 'Daily', value: getCooldownStatus(data.lastDaily, 'daily') },
        { name: 'Work', value: getCooldownStatus(data.lastWork, 'half-hour') },
        { name: 'Miniwork', value: getCooldownStatus(data.lastMiniwork, 'minutes') },
        { name: 'Mine', value: getCooldownStatus(data.lastMine, 'minutes') },
        { name: 'Rob', value: getCooldownStatus(data.lastRob, 'hourly') },
        { name: 'Fish', value: getCooldownStatus(data.lastFish, 'minutes') },
        { name: 'Crime', value: getCooldownStatus(data.lastCrime, 'half-hour') },
        { name: 'Coinflip', value: getCooldownStatus(data.lastCoinflip, 'ten minutes') },
    ];

    const cooldownsText = cooldowns.map(cooldown => `${cooldown.name}: ${cooldown.value}`).join('\n');

    embed.setTitle(`Balance de ${targetUser.tag}`)
        .setColor('Blurple')
        .addFields(
            { name: 'Balance', value: `${data.balance} monedas`, inline: false },
            { name: 'Tiempos restantes', value: cooldownsText, inline: false }
        );

    interaction.reply({ embeds: [embed] });
  },
};