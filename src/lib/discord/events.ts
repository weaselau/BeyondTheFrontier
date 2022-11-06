import * as Discord from 'discord.js'
import { resolveColor } from 'discord.js'
import Client from '.'

var channel: Discord.TextChannel | undefined

//Leave
export function onMemberLeave(member: Discord.GuildMember | Discord.PartialGuildMember) {
    if(member.guild.id !== '614680459728650250') return
    if(!channel) {
        Client().then(_client => {
            let _channel = _client.channels.cache.get('1038753283898097765')
            if(_channel?.type !== Discord.ChannelType.GuildText) return
            channel = _channel
        })
    }

    channel?.send({embeds: [
        new Discord.EmbedBuilder()
        .setTitle(channel.guild.name + 'is sad to see you go')
        .setDescription(member.displayName + 'has left the server')
        .setColor('Red')
    ]})
}


//Join
export function onMemberJoin(member: Discord.GuildMember | Discord.PartialGuildMember) {
    if(member.guild.id !== '614680459728650250') return
    if(!channel) {
        Client().then(_client => {
            let _channel = _client.channels.cache.get('1038753283898097765')
            if(_channel?.type !== Discord.ChannelType.GuildText) return
            channel = _channel
        })
    }

    channel?.send({embeds: [
        new Discord.EmbedBuilder()
        .setTitle('Welcome To ' + channel.guild.name)
        .setDescription('Please Welcome ' + member.displayName + 'to the server! Please check out <#1025250729717411870>')
        .setColor('Green')
    ]})
}