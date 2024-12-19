const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Todo = require('../../models/todo');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('to-do')
    .setDescription('Gestiona tu lista de tareas')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Añade una tarea a tu lista')
        .addStringOption(option => option.setName('title').setDescription('El título de la tarea').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('La descripción de la tarea').setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Elimina una tarea de tu lista')
        .addIntegerOption(option => option.setName('index').setDescription('El índice de la tarea a eliminar').setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('Muestra tu lista de tareas'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('status')
        .setDescription('Actualiza el estado de una tarea')
        .addIntegerOption(option => option.setName('index').setDescription('El índice de la tarea a actualizar').setRequired(true))
        .addStringOption(option => option.setName('status').setDescription('El nuevo estado de la tarea').setRequired(true).addChoices(
          { name: 'Pending', value: 'pending' },
          { name: 'In Progress', value: 'in progress' },
          { name: 'Completed', value: 'completed' }
        ))),

  run: async ({ interaction }) => {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    let userTodo = await Todo.findOne({ userId });
    if (!userTodo) {
      userTodo = new Todo({
        userId,
        tasks: []
      });
    }

    if (subcommand === 'add') {
      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description') || '';

      userTodo.tasks.push({ title, description });
      await userTodo.save();

      return interaction.reply({ content: `Tarea añadida: ${title}`, ephemeral: true });

    } else if (subcommand === 'remove') {
      const index = interaction.options.getInteger('index') - 1;

      if (index < 0 || index >= userTodo.tasks.length) {
        return interaction.reply({ content: 'Índice de tarea inválido.', ephemeral: true });
      }

      const removedTask = userTodo.tasks.splice(index, 1);
      await userTodo.save();

      return interaction.reply({ content: `Tarea eliminada: ${removedTask[0].title}`, ephemeral: true });

    } else if (subcommand === 'list') {
      if (userTodo.tasks.length === 0) {
        return interaction.reply({ content: 'No tienes tareas en tu lista.', ephemeral: true });
      }

      const taskList = userTodo.tasks.map((task, index) => {
        const statusEmoji = task.status === 'completed' ? '🟢' : task.status === 'in progress' ? '🟡' : '🔴';
        return `${statusEmoji} ${index + 1}. ${task.title}`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setTitle('Lista de Tareas')
        .setDescription(taskList)
        .setColor('Blue');

      return interaction.reply({ embeds: [embed], ephemeral: true });

    } else if (subcommand === 'status') {
      const index = interaction.options.getInteger('index') - 1;
      const status = interaction.options.getString('status');

      if (index < 0 || index >= userTodo.tasks.length) {
        return interaction.reply({ content: 'Índice de tarea inválido.', ephemeral: true });
      }

      userTodo.tasks[index].status = status;
      await userTodo.save();

      return interaction.reply({ content: `Estado de la tarea actualizado a ${status}.`, ephemeral: true });
    }
  }
};