const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Birthday = require('../../models/cumpleanos');

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cumpleanos')
        .setDescription('Gestiona tu fecha de cumpleaños')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ver')
                .setDescription('Muestra tu fecha de cumpleaños registrada'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('borrar')
                .setDescription('Borra tu fecha de cumpleaños registrada'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('registrar')
                .setDescription('Registra tu fecha de cumpleaños')
                .addIntegerOption(option => option.setName('dia').setDescription('El día de tu cumpleaños').setRequired(true).setMinValue(1).setMaxValue(31))
                .addIntegerOption(option => option.setName('mes').setDescription('El mes de tu cumpleaños').setRequired(true).setMinValue(1).setMaxValue(12))),

    run: async ({ interaction }) => {
        const subcommand = interaction.options.getSubcommand();
        const existingBirthday = await Birthday.findOne({ userID: interaction.user.id });

        if (subcommand === 'ver') {
            if (!existingBirthday) {
                const embed = new EmbedBuilder()
                    .setColor('Orange')
                    .setTitle('Fecha de cumpleaños')
                    .setDescription('No tienes una fecha de cumpleaños registrada.');
                return interaction.reply({ embeds: [embed] });
            }

            const monthName = months[existingBirthday.month - 1];
            const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle('Fecha de cumpleaños')
                .setDescription(`Tu fecha de cumpleaños es el ${existingBirthday.day} de ${monthName}.`);
            return interaction.reply({ embeds: [embed] });
        }

        if (subcommand === 'disable') {
            if (!existingBirthday) {
                const embed = new EmbedBuilder()
                    .setColor('Orange')
                    .setTitle('Fecha de cumpleaños')
                    .setDescription('No tienes una fecha de cumpleaños registrada.');
                return interaction.reply({ embeds: [embed] });
            }

            await Birthday.findOneAndDelete({ userID: interaction.user.id });
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Fecha de cumpleaños')
                .setDescription('Tu fecha de cumpleaños ha sido borrada.');
            return interaction.reply({ embeds: [embed] });
        }

        if (existingBirthday) {
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('Fecha de cumpleaños')
                .setDescription('Ya tienes una fecha de cumpleaños registrada.');
            return interaction.reply({ embeds: [embed] });
        }

        const day = interaction.options.getInteger('dia');
        const month = interaction.options.getInteger('mes');

        const birthday = new Birthday({
            userID: interaction.user.id,
            day: day,
            month: month
        });

        await birthday.save();
        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Fecha de cumpleaños')
            .setDescription('Tu fecha de cumpleaños ha sido registrada.');
        interaction.reply({ embeds: [embed] });
    }
};