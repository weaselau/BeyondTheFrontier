//? Dependencies

import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'
import Client, { Channel } from "@lib/discord"
import { _client } from '@lib/discord/index'

//? Dependencies




export default async function RolesMenu() {

    const _channel = await Channel(Config.discord.guild, '1038755570154479626')
    const _message: Message = _channel.messages.cache.get('1038821463714709555') || await _channel.messages.fetch('1038821463714709555')

    if (!_message) return console.log('Role Menu Message could not be found!')


    //? Interation Select Menu


    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing Selected')
                .setMinValues(1)
                .setMaxValues(9)
                .setOptions([
                    {
                        label: 'Project Zomboid',
                        description: 'Project Zomboid Game Role',
                        value: 'pz',
                        emoji: '🪓',
                    },
                    {
                        label: 'Minecraft',
                        description: 'Minecraft Game Role',
                        value: 'mc',
                        emoji: '🔨',
                    },
                    {
                        label: 'Rust',
                        description: 'Rust Game Role',
                        value: 'rt',
                        emoji: '🏹',
                    },
                    {
                        label: 'Northstar',
                        description: 'Northstar Game Role',
                        value: 'ns',
                        emoji: '🤖',
                    },
                    {
                        label: 'Space Engineers',
                        description: 'Space Engineers Game Role',
                        value: 'se',
                        emoji: '🚀',
                    },
                    {
                        label: 'Eco',
                        description: 'Eco Game Role',
                        value: 'ec',
                        emoji: '🌏',
                    },
                    {
                        label: 'Factorio',
                        description: 'Factorio Game Role',
                        value: 'ft',
                        emoji: '💰',
                    },
                    {
                        label: 'Rimworld',
                        description: 'Rimworld Role',
                        value: 'rw',
                        emoji: '🎒',
                    },
                    {
                        label: 'DayZ',
                        description: 'DayZ Role',
                        value: 'dz',
                        emoji: '☠️',
                    },
                ]),
        )


    //? Role Menu Itself


    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('**Role Menu**')
                .setDescription('>>> What Games do you play?')
                .setTimestamp(new Date())
        ], components: [row]

    })
        .catch(() => {
            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Role Menu')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Role Menu is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}