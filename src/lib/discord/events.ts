import * as Discord from 'discord.js'
import { Guild, _client } from '.'
import { Collections } from '@lib/mongo/index'











export async function ButtonPress(interaction: Discord.ButtonInteraction) {

    switch (interaction.customId) {
        case 'Primary':
            let OpenTicketsChannel: Discord.Channel | undefined = _client.channels.cache.get('1045376153336172564') //Opens Tickets Channel ID
            let Guild: Discord.Guild | undefined = _client.guilds.cache.get('614680459728650250')
            if(OpenTicketsChannel?.type !== Discord.ChannelType.GuildCategory) return;
            if(OpenTicketsChannel === null || OpenTicketsChannel === undefined) return;
            OpenTicketsChannel.type !== Discord.ChannelType.GuildCategory? { return: null }: null; // I Dont Know What This Is
            if(!Guild) return;
            if(!Collections.Tickets) return console.error('Unable To Find The Tickets Collection')
            if(!interaction.guild) return //? This is required for some reason

            let TicketMongo = Collections.Tickets.insertOne({})
            let amountOfDocs = await Collections.Tickets.countDocuments()

            let newChannel = await Guild.channels.create({name: `${interaction.user.username.toLowerCase()}-${amountOfDocs + 1}`, parent: OpenTicketsChannel, permissionOverwrites: [
                { id: interaction.user.id, allow: [Discord.PermissionFlagsBits.ViewChannel] },
                { id: interaction.guild.roles.everyone, deny: [Discord.PermissionFlagsBits.ViewChannel] },
                { id: '1049056577346343053', allow: [Discord.PermissionFlagsBits.ViewChannel]}
            ]})
            if(!newChannel.isTextBased()) return;
            newChannel.send({embeds: [
                new Discord.EmbedBuilder()
                .setColor(Discord.resolveColor('#567fe8'))
                .setTitle('Ticket Controls')
            ], components: [
                new Discord.ActionRowBuilder<Discord.ButtonBuilder>()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setCustomId('button-save')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Save Ticket'),
                    new Discord.ButtonBuilder()
                    .setCustomId('button-close')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setLabel('Close Ticket')
                ])
            ]})

            newChannel.send('<@' + interaction.user.id + '> <@&1049056577346343053>')

            Collections.Tickets.updateOne(TicketMongo, {$set: { channelID: newChannel.id, author: interaction.user.id }})

            interaction.deferUpdate()
        break;

        case 'button-close':
            if(interaction.channel?.type !== Discord.ChannelType.GuildText || interaction.channel.parent?.id === '1045376256524435497') return
            interaction.reply({content: 'Are you sure you want to close this ticket? (Close this message to cancel)', ephemeral: true, components: [
                new Discord.ActionRowBuilder<Discord.ButtonBuilder>()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setCustomId('button-full-close')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setLabel('Yes, Im Sure')
                ])
            ]})
        break;

        case 'button-save':
            Collections.Tickets?.find().forEach(doc => {
                let messageArray: Array<any> = [  ]
                doc.channelID !== interaction.channel?.id? { return: null }: null
                interaction.channel?.messages.cache.forEach(msg => { //? Due to a flaw in discord API or DJS i cannot retrieve messages from when the bot isnt running (shouldnt be an issue on a server)
                    messageArray.push({
                        author: msg.author.id,
                        timestamp: msg.createdTimestamp,
                        content: msg.content,
                        edited: msg.editedAt === null? false: true
                    })
                })
                Collections.Tickets?.updateOne(doc, {$set: { messages: messageArray }})
                interaction.deferUpdate()
            })
        break;

        case 'button-full-close':
            let ClosedTicketsChannel = _client.channels.cache.get('1045376256524435497')
            if(ClosedTicketsChannel?.type !== Discord.ChannelType.GuildCategory) return;
            if(interaction.channel?.type !== Discord.ChannelType.GuildText) return;
            interaction.channel.edit({parent: ClosedTicketsChannel})
            interaction.deferUpdate()
            interaction.deleteReply()
            interaction.channel.send('Ticket has been closed by <@' + interaction.user + '>')
        break;
    }



}

export function onChannelDelete(ch: Discord.Channel) { 
    //? Used to remove deleted channels from the database
    Collections.Tickets?.find().forEach(doc => {
        doc.channelID === ch.id? Collections.Tickets?.deleteOne(doc): null
    })
}

//? Javascript > Typescript