import * as Discord from 'discord.js'
import { Guild, _client } from '.'
import Client from '@lib/discord'
import { channelLink, MembershipScreeningFieldType, TeamMemberMembershipState } from 'discord.js';

import Config from '@lib/config'

import { Collections } from '@lib/mongo/index'



//?
//? Leave
//?



export function onMemberLeave(member: Discord.GuildMember | Discord.PartialGuildMember) {
    let channel = _client?.channels.cache.get('1038753283898097765')
    if (channel?.type !== Discord.ChannelType.GuildText) return;

    channel?.send({
        embeds: [
            new Discord.EmbedBuilder()
                .setTitle(channel.guild.name + ' is sad to see you go')
                .setDescription(member.displayName + ' has left the server')
                .setColor('Red')
        ]
    })
}



//?
//? Join
//?



export function onMemberJoin(member: Discord.GuildMember | Discord.PartialGuildMember) {
    let channel = _client?.channels.cache.get('1038753283898097765')
    if (channel?.type !== Discord.ChannelType.GuildText) return;

    channel?.send({
        embeds: [
            new Discord.EmbedBuilder()
                .setTitle('Welcome To ' + channel.guild.name)
                .setDescription('Please Welcome ' + member.displayName + ' to the server! Please check out <#1025250729717411870>')
                .setColor('Green')
        ]
    })

    let role = member.guild.roles.cache.get('1014218871667961866')
    if(!role) return
    role = member.roles.resolve(role)
    member.roles.add(role)

}



//?
//? Interaction: Select Menu
//?



export function InteractionSelectMenu(interaction: Discord.SelectMenuInteraction) {
    if(interaction.customId === 'select') {
            let guild = _client.guilds.cache.get(Config.discord.guild)
            if(!guild) return
            let Member = guild.members.cache.get(interaction.user.id)



            let pzrole = guild.roles.cache.find(role => role.name === 'Project zomboid'); if(!pzrole) return;
            if (interaction.values.includes('pz')) Member?.roles.add(pzrole)



            let mcrole = guild.roles.cache.find(role => role.name === 'Minecraft'); if(!mcrole) return;
            if (interaction.values.includes('mc')) Member?.roles.add(mcrole)



            let rtrole = guild.roles.cache.find(role => role.name === 'Rust'); if(!rtrole) return;
            if (interaction.values.includes('rt')) Member?.roles.add(rtrole)



            let serole = guild.roles.cache.find(role => role.name === 'Space Engineers'); if(!serole) return;
            if (interaction.values.includes('se')) Member?.roles.add(serole)



            let nsrole = guild.roles.cache.find(role => role.name === 'Northstar'); if(!nsrole) return;
            if (interaction.values.includes('ns')) Member?.roles.add(nsrole)



            let ecrole = guild.roles.cache.find(role => role.name === 'Eco'); if(!ecrole) return;
            if (interaction.values.includes('ec')) Member?.roles.add(ecrole)



            let ftrole = guild.roles.cache.find(role => role.name === 'Factorio'); if(!ftrole) return;
            if (interaction.values.includes('ft')) Member?.roles.add(ftrole)



            let rwrole = guild.roles.cache.find(role => role.name === 'RimWorld'); if(!rwrole) return;
            if (interaction.values.includes('rw')) Member?.roles.add(rwrole)



        interaction.reply({ephemeral: true, content: 'Role/s added succsessfully'})
    }
}

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