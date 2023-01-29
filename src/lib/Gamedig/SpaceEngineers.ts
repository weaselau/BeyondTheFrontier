import Query from "@lib/gamedig"
import Client, { Channel } from "@lib/discord"
import { _client } from '@lib/discord/index'
import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'



export default async function SpaceEngineers() {
    const _channel = await Channel(Config.discord.guild, '1030539047996751903')
    const _message: Message = _channel.messages.cache.get('1048556966521356330') || await _channel.messages.fetch('1048556966521356330')

    Query('spaceengineers', 'beyondthefrontier.au', 27016)
        .then((data: any) => {


            if (!_message) return console.log('Space Engineers Message could not be found!')

            const _rawPlayers = data.players.map((player: any) => {
                return `${player.name}`
            })
            const _players = _rawPlayers.join('\n').substring(0, 2000)
            const _overflow = _players.length == 2000 ? '\n\nThere are more players that cannot be loaded...' : ''

            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(data.name)
                        .setColor(resolveColor('#20db16'))
                        .setFields([
                            { name: 'Player Count', value: `${data.players.length} / ${data.maxplayers}`, inline: false },
                            { name: 'Map', value: '>>> ' + data.map, inline: false},
                            { name: 'Password', value: '>>> ' + data.password, inline: false},
                            { name: 'ping', value: '>>> ' + (data.ping) + _overflow, inline: false },
                            { name: 'Players', value: '>>> ' + (_players || 'There are No Players Online...') + _overflow, inline: false }
                        ])
                        .setTimestamp(new Date())
                ]
            })

        })
        .catch(() => {

            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Space Engineers')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Server is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}