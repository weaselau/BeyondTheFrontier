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
    if(interaction.customId === 'select') {
            let guild = _client.guilds.cache.get(Config.discord.guild)
            if(!guild) return
            let Member = guild.members.cache.get(interaction.user.id)



            let pzrole = guild.roles.cache.find(role => role.name === 'Project zomboid'); if(!pzrole) return;
            if (interaction.values.includes('pz')) Member?.roles.add(pzrole)



            let mcrole = guild.roles.cache.find(role2 => role2.name === 'Minecraft'); if(!mcrole) return;
            if (interaction.values.includes('mc')) Member?.roles.add(mcrole)



            let rtrole = guild.roles.cache.find(role3 => role3.name === 'Rust'); if(!rtrole) return;
            if (interaction.values.includes('rt')) Member?.roles.add(rtrole)

        interaction.reply({ephemeral: true, content: 'Role/s added succsessfully'})
    }
}