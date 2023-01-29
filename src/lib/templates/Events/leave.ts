//? Dependencies
import * as Discord from 'discord.js'
import { Guild, _client } from '@lib/discord/index'
import Client from '@lib/discord'
import { channelLink, MembershipScreeningFieldType, TeamMemberMembershipState } from 'discord.js';
//? Dependencies




export default function onMemberLeave(member: Discord.GuildMember | Discord.PartialGuildMember) {
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