import * as Discord from 'discord.js'
import { Guild, _client } from '.'
import Client from '@lib/discord'
import { roles } from 'Commands';
import { MembershipScreeningFieldType, TeamMemberMembershipState } from 'discord.js';

import Config from '@lib/config'

//?
//? Leave
//?



export function onMemberLeave(member: Discord.GuildMember | Discord.PartialGuildMember) {
    let channel = _client?.channels.cache.get('1038753283898097765')
    if (channel?.type !== Discord.ChannelType.GuildText) return;

    channel?.send({
        embeds: [
            new Discord.EmbedBuilder()
                .setTitle(channel.guild.name + ' is sad to see you go')
                .setDescription(member.displayName + ' has left the server')
                .setColor('Red')
        ]
    })
}



//?
//? Join
//?



export function onMemberJoin(member: Discord.GuildMember | Discord.PartialGuildMember) {
    let channel = _client?.channels.cache.get('1038753283898097765')
    if (channel?.type !== Discord.ChannelType.GuildText) return;

    channel?.send({
        embeds: [
            new Discord.EmbedBuilder()
                .setTitle('Welcome To ' + channel.guild.name)
                .setDescription('Please Welcome ' + member.displayName + ' to the server! Please check out <#1025250729717411870>')
                .setColor('Green')
        ]
    })

    let role = member.guild.roles.cache.get('1014218871667961866')
    if(!role) return
    role = member.roles.resolve(role)
    member.roles.add(role)

}



//?
//? Interaction: Select Menu
//?



export function InteractionSelectMenu(interaction: Discord.SelectMenuInteraction) {
    const Roles: any = {
        'a': 'Project zomboid',
        'b': 'Minecraft',
        'c': 'Rust'
    }

    if(interaction.customId === 'select') {
        interaction.values.forEach(element => {
            let guild = _client.guilds.cache.get(Config.discord.guild)
            let Member = guild?.members.cache.get(interaction.user.id)

            let role = guild?.roles.cache.get(element)
            if(!role) return
            Member?.roles.add(Member?.roles.resolve(role))
            


        });
    }
}