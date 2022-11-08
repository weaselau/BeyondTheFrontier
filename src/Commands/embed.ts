//? Dependencies



import { ChatInputCommandInteraction, CacheType, EmbedBuilder, resolveColor } from "discord.js"



//? Command



export default (interaction: ChatInputCommandInteraction<CacheType>) => {

    interaction.channel?.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(interaction.options.get('title')?.value as string)
                .setDescription(interaction.options.get('description')?.value as string)
                .setColor(resolveColor("#ffffff"))
                .setTimestamp(new Date())
        ]
    })
        .then(() => interaction.reply({ content: "Embed Successfully Sent!", ephemeral: true }))
        .catch(err => interaction.reply({ content: `Failed to send embed!\n\n\`\`\`ts\n${err}\`\`\``, ephemeral: true }))

}