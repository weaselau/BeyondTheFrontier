//? Dependencies

import { ChatInputCommandInteraction, CacheType } from "discord.js"



//? Variables

const Roles: any = {
    project_zomboid: 'Project zomboid',
    minecraft: 'Minecraft'
}



//? Command

export default async (interaction: ChatInputCommandInteraction<CacheType>) => {

    const SubCommand = interaction.options.getSubcommand() as string
    const RoleOption = interaction.options.getString('role') as string

    if (!SubCommand || !RoleOption) return interaction.reply({ content: 'Invalid Command!', ephemeral: true })


    const Guild = interaction.guild
    const Member = await Guild?.members.fetch(interaction.user)
    const Role = Guild?.roles.cache.find(role => role.name == Roles[RoleOption])

    if (!Role) return interaction.reply({ content: 'Invalid Role!', ephemeral: true })


    if (SubCommand == 'add') Member?.roles.add(Role)
    if (SubCommand == 'remove') Member?.roles.remove(Role)

}