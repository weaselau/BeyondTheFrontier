//? Dependencies

import Config from '@lib/config'

import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType } from 'discord.js'

import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"
import { embed } from 'Commands'



//? Client

Client()
    .then(client => {
        RolesMenu()
        ProjectZomboid()
        Minecraft()

        //? 30 minute update time
        setInterval(() => {
            RolesMenu()
        }, 1000 * 60 * 600)

        //? 3 minute update time
        setInterval(() => {
            ProjectZomboid()
            Minecraft()
        }, 1000 * 60 * 3)
    })


//? Roles



async function RolesMenu() {

    const _channel = await Channel(Config.discord.guild, '1038755570154479626')
    const _message: Message = _channel.messages.cache.get('1038821463714709555') || await _channel.messages.fetch('1038821463714709555')

    if (!_message) return console.log('Role Meny Message could not be found!')


    //? Interation Select Menu  


    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing Selected')
                .setOptions(
                    {
                        label: 'Porject Zomboid',
                        description: 'Porject Zomboid Game Role',
                        value: '1',                     
                    },
                    {
                        label: 'Minecraft',
                        description: 'Minecraft Game Role',
                        value: '2',                    
                    },
                    {
                        label: 'Rust',
                        description: 'Rust Game Role',
                        value: '3',                       
                    },
                    {
                        label: 'test2',
                        description: 'test2',
                        value: 'test2', 
                    },
                    {
                        label: 'test3',
                        description: 'test3',
                        value: 'test3',
                    },
                ),
        )


    //? Role Menu Itself


    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('Role Menu')
                .setDescription('Role menu')
        ], components: [
            row
        ]

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



//? Gamedig



async function ProjectZomboid() {

    const _channel = await Channel(Config.discord.guild, '1030539047996751903')
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
    const _channel = await Channel(Config.discord.guild, '1030539047996751903')
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