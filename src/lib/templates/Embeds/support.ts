//? Dependencies
import Client, { Channel } from "@lib/discord"
import { _client } from '@lib/discord/index'
import Config from '@lib/config'
import { Message, EmbedBuilder, resolveColor, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, InteractionCollector, ChatInputCommandInteraction, CacheType, AnyComponentBuilder, ActivityType } from 'discord.js'
//? Dependencies



export default async function SupportChannel() {

    const _channel = await Channel(Config.discord.guild, '1039148738628825098')
    const _message: Message = _channel.messages.cache.get('1039148951305199676') || await _channel.messages.fetch('1039148951305199676')

    if (!_message) return console.log('Support Channel Message could not be found!')


    //? Button Menu


    const button = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([
            new ButtonBuilder()
                .setCustomId('ticket.create')
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