//? Dependencies

import { Message, EmbedBuilder, resolveColor } from 'discord.js'

import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"



//? Client

Client()
    .then(client => {
        ProjectZomboid()
        Minecraft()
        setInterval(() => {
            ProjectZomboid()
            Minecraft()
        }, 1000 * 60 * 3)
    })



//? Gamedig



async function ProjectZomboid() {

    const _channel = await Channel('614680459728650250', '1030539047996751903')
    const _message: Message = _channel.messages.cache.get('1031237192602898443') || await _channel.messages.fetch('1031237192602898443')

    if (!_message) return console.log('Project Zomboid Message could not be found!')



    Query('przomboid', '120.153.241.223', 16261)
        .then((data: any) => {


            const _rawPlayers = data.players.map((player: any) => {
                const _timestamp = new Date(Math.floor(player.raw.time * 1000))
               
                return `${player.name} - ${String(_timestamp.getHours()).padStart(2, '0')}:${String(_timestamp.getMinutes()).padStart(2, '0')}:${String(_timestamp.getSeconds()).padStart(2, '0')}`
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
                            { name: 'Map', value: data.map, inline: false },
                            { name: 'ping', value: '>>> ' + (data.ping) + _overflow, inline: false },
                            { name: 'Environment - Weather', value: '>>> ' + (data.raw.environment) + _overflow, inline: false },
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
                        .setTitle('Project Zomboid')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Server is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}



async function Minecraft() {
    const _channel = await Channel('614680459728650250', '1030539047996751903')
    const _message: Message = _channel.messages.cache.get('1031799098803769364') || await _channel.messages.fetch('1031799098803769364')

    if (!_message) return console.log('Minecraft Message could not be found!')



    Query('minecraft', '120.153.241.223', 25565)
        .then((data: any) => {

            const _players = data.players.join('\n').substring(0, 2000)
            const _overflow = _players.length == 2000 ? '\n\nThere are more players that cannot be loaded...' : ''


            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(data.name)
                        .setColor(resolveColor('#20db16'))
                        .setFields([
                            { name: 'Player Count', value: `${data.players.length} / ${data.maxplayers}`, inline: false },
                            { name: 'Map', value: data.map, inline: false },
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
                        .setTitle('Minecraft')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Server is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}   