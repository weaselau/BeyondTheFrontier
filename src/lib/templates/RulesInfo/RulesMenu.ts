//? Dependencies

import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'
import Client, { Channel } from "@lib/discord"
import { _client } from '@lib/discord/index'

//? Dependencies








//? Rules Menu

export default async function RulesMenu() {
    const _channel = await Channel(Config.discord.guild, '1025250729717411870')
    const _message: Message = _channel.messages.cache.get('1039163153612816415') || await _channel.messages.fetch('1039163153612816415')

    if (!_message) return console.log('Rules Menu Message could not be found!')
    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('Rule Menu')
                .setDescription('This is the rule Tab')
                .setColor(resolveColor('#567fe8'))
                .setFields(
                    {
                        name: 'Discord Rules',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: '\u200B',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: '\u200B',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: 'Rules',
                        value: '1. Respect all Members and Staff. \n 2. No bullying of any kind. \n 3. No posting personal info about others under any circumstance. \n 4. No Racism. \n 5. No Homophobic behaviour',
                        inline: true,
                    },
                    {
                        name: 'Subject to change',
                        value: '**All the rules seen will can be subject to change, please keep this in mind if you have any feed back can you please send it to <#1039148738628825098> threw a Support Ticket, just please state why you have opended the ticket.**',
                        inline: false,
                    },
                    {
                        name: 'Discord',
                        value: 'Discord Invite link - https://discord.gg/WvQTAeJHt3',
                        inline: false,
                    },
                )
                .setTimestamp(new Date())
        ]
    })
        .catch(() => {
            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Rules Menu')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Rules Menu is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}