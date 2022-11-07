//? Dependencies

import Config from '@lib/config'

import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder } from 'discord.js'

import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"
import { embed } from 'Commands'
import * as Mongo from 'lib/mongo'



//? Mongo

Mongo.connect()


//? Client

Client()
    .then(client => {
        RolesMenu()
        ProjectZomboid()
        Minecraft()
        SupportChannel()
        RulesMenu()
        InfomationMenu()


        //?
        //? 12 Hour update time
        //?

        setInterval(() => {
            RulesMenu()
            InfomationMenu()
        }, 1000 * 60 * 720)


        //?
        //? 60 minute update time
        //?

        setInterval(() => {
            RolesMenu()
            SupportChannel()
        }, 1000 * 60 * 60)


        //?
        //? 3 minute update time
        //?

        setInterval(() => {
            ProjectZomboid()
            Minecraft()
        }, 1000 * 60 * 3)
    })


//?
//? Rules and Infomation Menu
//?

async function RulesMenu() {
    const _channel = await Channel(Config.discord.guild, '1025250729717411870')
    const _message: Message = _channel.messages.cache.get('1039163153612816415') || await _channel.messages.fetch('1039163153612816415')

    if (!_message) return console.log('Rules Menu Message could not be found!')
    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('**Rules Menu**')
                .setDescription('>>> Rules Menu')
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



async function InfomationMenu() {
    const _channel = await Channel(Config.discord.guild, '1025250729717411870')
    const _message: Message = _channel.messages.cache.get('1039163167378513970') || await _channel.messages.fetch('1039163167378513970')

    if (!_message) return console.log('Infomation Menu Message could not be found!')
    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('**Infomation Menu**')
                .setDescription('>>> Infomation Menu')
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



//?
//? Support Channel
//?


async function SupportChannel() {

    const _channel = await Channel(Config.discord.guild, '1039148738628825098')
    const _message: Message = _channel.messages.cache.get('1039148951305199676') || await _channel.messages.fetch('1039148951305199676')

    if (!_message) return console.log('Support Channel Message could not be found!')


    //? Button Menu


    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([
            new ButtonBuilder()
                .setCustomId('Primary')
                .setLabel('Support Ticket')
                .setStyle(ButtonStyle.Success)
        ])


    //? Support Embed 

    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('**Server Support Channel**')
                .setDescription('>>> Need Help? Our staff are here to support you and the problems you are facing. \n\n test')
                .setTimestamp(new Date())
        ], components: [button]

    })
        .catch(() => {
            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Support Channel')
                        .setColor(resolveColor('#db2525'))
                        .setDescription('>>> The Support Channel is Offline...')
                        .setTimestamp(new Date())
                ]
            })
        })
}



//?
//? Roles
//?



async function RolesMenu() {

    const _channel = await Channel(Config.discord.guild, '1038755570154479626')
    const _message: Message = _channel.messages.cache.get('1038821463714709555') || await _channel.messages.fetch('1038821463714709555')

    if (!_message) return console.log('Role Menu Message could not be found!')


    //? Interation Select Menu  


    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing Selected')
                .setOptions([
                    {
                        label: 'Project Zomboid',
                        description: 'Project Zomboid Game Role',
                        value: 'pz',
                    },
                    {
                        label: 'Minecraft',
                        description: 'Minecraft Game Role',
                        value: 'mc',
                    },
                    {
                        label: 'Rust',
                        description: 'Rust Game Role',
                        value: 'rt',
                    },
                    {
                        label: 'test2',
                        description: 'test2',
                        value: 'd',
                    },
                    {
                        label: 'test3',
                        description: 'test3',
                        value: 'e',
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


//?
//? Gamedig
//?

//?
//? ProjectZomboid
//?
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


//?
//? Minecraft
//?
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