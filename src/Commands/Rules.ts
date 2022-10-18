//? Dependencies

import { ChatInputCommandInteraction, CacheType, EmbedBuilder, resolveColor } from "discord.js"


//? Command

export default (interaction: ChatInputCommandInteraction<CacheType>) => {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle('test')
                .setDescription('test')
                .setFields({ name: 'test', value: 'test', inline: true })
                .setFooter({ text: 'test', })
        ]
    })
        .then(() => interaction.reply({ content: "Embed Successfully Sent!", ephemeral: true }))
        .catch(err => interaction.reply({ content: `Failed to send embed!\n\n\`\`\`ts\n${err}\`\`\``, ephemeral: true }))

}
