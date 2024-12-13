const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Silencia a un usuario')
    .addUserOption((option) => option
      .setName('usuario')
      .setDescription('El usuario al que quieres silenciar')
      .setRequired(true))
    .addStringOption((option) => option
        .setName('tiempo')
        .setDescription('El tiempo que durará el silencio')
        .setRequired(true))
    .addStringOption((option) => option
        .setName('razon')
        .setDescription('La razón del silencio')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: async ({ interaction, client, handler }) => {


    const user = interaction.options.getUser("usuario");
    const time = interaction.options.getString("tiempo");
    const reason = interaction.options.getString("razon") || 'No especificada.';

    const member = await interaction.guild.members.fetch(user);

    const msDuration = ms(time);
    if (isNaN(msDuration)) {
      await interaction.editReply('El tiempo ingresado no es válido.');
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply('El tiempo ingresado debe ser mayor a 5 segundos y menor a 28 días.');
      return;
    }

    if (!member) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('El usuario no existe.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (member.id === interaction.guild.ownerId) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedo poner en "time out" al dueño del servidor.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (member.id === interaction.user.id) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedes ponerte en "time out" a ti mismo.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (member.user.bot) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedo poner en "time out" a un bot.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (member.permissions.has(PermissionFlagsBits.MuteMembers)) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedo poner en "time out" a este usuario.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedo poner en "time out" a este usuario.').setColor('Red')],
            ephemeral: true,
        });
    }

    if (interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Error').setDescription('No puedes poner en "time out" a este usuario.').setColor('Red')],
            ephemeral: true,
        });
    }

    try {
        const { default: prettyMs } = await import('pretty-ms');
        
        if (member.isCommunicationDisabled()) {
            await member.timeout(msDuration, reason);
            return interaction.reply({
                embeds: [new EmbedBuilder().setTitle('Time out').setDescription(`El usuario ${member} ya estaba en "time out", pero se ha actualizado por ${prettyMs(msDuration, { verbose: true })}.`).setColor('Random')],
            });
        }

        await member.timeout(msDuration, reason);
        return interaction.reply({
            embeds: [new EmbedBuilder().setTitle('Time out').setDescription(`El usuario ${member} ha sido puesto en "time out" por ${prettyMs(msDuration, { verbose: true })}.`).setColor('Random')],
        });

    } catch (error) {
        console.log(`Sucedio un error al ejecutar el comando: ${error}`);
    }

  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    botPermissions: ['MuteMembers'],
  },
};
