const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Configura las reglas de automoderación")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("enable")
        .setDescription("Habilita una regla de automoderación")
        .addStringOption((option) =>
          option
            .setName("rule")
            .setDescription("Regla a habilitar")
            .setRequired(true)
            .addChoices(
              { name: "Spam", value: "spam" },
              { name: "Menciones excesivas", value: "mentions" },
              { name: "Palabras prohibidas", value: "words" },
              { name: "Contenido sexual", value: "sexual" },
              { name: "Enlaces invitación", value: "invites" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("disable")
        .setDescription("Deshabilita una regla de automoderación")
        .addStringOption((option) =>
          option
            .setName("rule")
            .setDescription("Regla a deshabilitar")
            .setRequired(true)
            .addChoices(
              { name: "Spam", value: "spam" },
              { name: "Menciones excesivas", value: "mentions" },
              { name: "Palabras prohibidas", value: "words" },
              { name: "Enlaces invitación", value: "invites" },
              { name: "Contenido sexual", value: "sexual" }
            )
        )
    ),

  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();
    const subcommand = interaction.options.getSubcommand();
    const rule = interaction.options.getString("rule");

    try {
      if (subcommand === "enable") {
        switch (rule) {
          case "spam":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Spam",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 3,
              triggerMetadata: {
                mentionTotalLimit: 5,
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage: "Mensaje automáticamente borrado por spam",
                  },
                },
              ],
            });
            break;

          case "mentions":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Menciones Masivas",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 5,
              triggerMetadata: {
                mentionTotalLimit: 5,
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage:
                      "Mensaje automáticamente borrado por menciones excesivas",
                  },
                },
              ],
            });
            break;

          case "words":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Palabras Prohibidas",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 4,
              triggerMetadata: {
                presets: [1, 2, 3],
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage:
                      "Mensaje automáticamente borrado por contener palabras prohibidas",
                  },
                },
              ],
            });
            break;

          case "sexual":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Contenido Sexual",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 4,
              triggerMetadata: {
                presets: [1, 2],
                keywordFilter: ["nsfw", "porn", "xxx"],
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage:
                      "Mensaje eliminado por contenido sexual inapropiado",
                  },
                },
              ],
            });
          case "sexual":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Contenido Sexual",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 4,
              triggerMetadata: {
                presets: [1, 2],
                keywordFilter: ["nsfw", "porn", "xxx"],
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage:
                      "Mensaje eliminado por contenido sexual inapropiado",
                  },
                },
              ],
            });

          case "invites":
            await interaction.guild.autoModerationRules.create({
              name: "Prevenir Invitaciones",
              creatorId: interaction.guild.ownerId,
              enabled: true,
              eventType: 1,
              triggerType: 1,
              triggerMetadata: {
                presets: [1],
              },
              actions: [
                {
                  type: 1,
                  metadata: {
                    channel: interaction.channel,
                    durationSeconds: 10,
                    customMessage:
                      "Mensaje automáticamente borrado por contener una invitación",
                  },
                },
              ],
            });
            break;
        }

        embed
          .setTitle("Automoderación Habilitada")
          .setDescription(
            `La regla "${rule}" ha sido habilitada correctamente.`
          )
          .setColor("Green");
      } else if (subcommand === "disable") {
        const rules = await interaction.guild.autoModerationRules.fetch();
        const ruleToDelete = rules.find((r) => {
          switch (rule) {
            case "spam":
              return r.name === "Prevenir Spam";
            case "mentions":
              return r.name === "Prevenir Menciones Masivas";
            case "words":
              return r.name === "Prevenir Palabras Prohibidas";
            case "invites":
              return r.name === "Prevenir Invitaciones";
          }
        });

        if (ruleToDelete) {
          await ruleToDelete.delete();
          embed
            .setTitle("Automoderación Deshabilitada")
            .setDescription(
              `La regla "${rule}" ha sido deshabilitada correctamente.`
            )
            .setColor("Red");
        } else {
          embed
            .setTitle("Error")
            .setDescription(
              `No se encontró la regla "${rule}" para deshabilitar.`
            )
            .setColor("Red");
        }
      }
    } catch (error) {
      console.error("Error al configurar automoderación:", error);
      embed
        .setTitle("Error")
        .setDescription("Ocurrió un error al configurar la automoderación.")
        .setColor("Red");
    }

    await interaction.reply({ embeds: [embed] });
  },
};
