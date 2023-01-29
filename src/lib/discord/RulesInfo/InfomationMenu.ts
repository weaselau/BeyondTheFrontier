//? Dependencies

import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'
import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"
import * as Mongo from 'lib/mongo'
import { _client } from '@lib/discord/index'
import Discord from 'discord.js'

//? Dependencies








//? Infomation Menu

export default async function InfomationMenu() {
    const _channel = await Channel(Config.discord.guild, '1025250729717411870')
    const _message: Message = _channel.messages.cache.get('1039163167378513970') || await _channel.messages.fetch('1039163167378513970')

    if (!_message) return console.log('Infomation Menu Message could not be found!')
    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('Important Information')
                .setDescription('This is the Important Information Tab')
                .setColor(resolveColor('#567fe8'))
                .setFields(
                    {
                        name: 'Important Information',
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
                        .setTitle('Infomation Menu')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Infomation Menu is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}