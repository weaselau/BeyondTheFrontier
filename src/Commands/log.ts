//? Dependencies



import { ChatInputCommandInteraction, CacheType } from "discord.js"



//? Command




export default (interaction: ChatInputCommandInteraction<CacheType>) => {

    const Text = interaction.options.get('text')?.value || 'No text provided'

    console.log(`<${interaction.user.username}>: ${Text}`)

    interaction.reply({ content: 'Successfully Logged to the Console!', ephemeral: true })

}