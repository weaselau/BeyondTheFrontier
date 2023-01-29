//? Dependencies

import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'
import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"
import * as Mongo from 'lib/mongo'
import { _client } from '@lib/discord/index'
import Discord from 'discord.js'

import { Minecraft, ProjectZomboid, SpaceEngineers } from '@lib/Gamedig/index'
//? Mongo

Mongo.connect()


//? Client

Client()
    .then(client => {
        RolesMenu()
        ProjectZomboid()
        Minecraft()
        SpaceEngineers()
        SupportChannel()
        RulesMenu()
        InfomationMenu()
        MemberCount()

        //?
        //? 12 Hour update time
        //?

        setInterval(() => {
            RulesMenu()
            InfomationMenu()
            RolesMenu()
        }, 1000 * 60 * 720)


        //?
        //? 60 minute update time
        //?

        setInterval(() => {
            SupportChannel()
        }, 1000 * 60 * 60)


        //?
        //? 3 minute update time
        //?

        setInterval(() => {
            ProjectZomboid()
            Minecraft()
            SpaceEngineers()




            MemberCount()
        }, 1000 * 60 * 3)
    })


    async function MemberCount(){
        _client.user?.setPresence({
            status: 'online',
            activities: [{
                type: Discord.ActivityType.Watching,
                name: `${_client.guilds.cache.get(Config.discord.guild)?.memberCount} Members`
            }]
        })
    }




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
                .setFooter({ text: 'Footer', })
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
                .setFooter({ text: 'Footer', })
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
                .setEmoji('🎫')
                .setStyle(ButtonStyle.Success)
        ])


    //? Support Embed 

    _message.edit({
        embeds: [
            new EmbedBuilder()
                .setTitle('**Server Support Channel**')
                .setColor(resolveColor('#567fe8'))
                .setDescription('>>> Need Help? Our staff are here to support you and the problems you are facing. \n\n')
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










