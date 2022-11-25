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

export function ButtonPress(interaction: Discord.ButtonInteraction) {

    //TODO: Add Interaction ID Switch Statement

    let OpenTicketsChannel = _client.channels.cache.get('1045376153336172564') //Opens Tickets Channel ID
    let Guild: Discord.Guild | undefined = _client.guilds.cache.get('614680459728650250')

    if(OpenTicketsChannel === null || OpenTicketsChannel === undefined) return;
    OpenTicketsChannel.type !== Discord.ChannelType.GuildCategory? { return: null }: null; // I Dont Know What This Is
    if(!Guild) return;
    if(!Collections.Tickets) return console.error('Unable To Find The Tickets Collection')

    console.log('Button Detected')

    /*
    Collections.Tickets.insertOne({})

    Guild?.channels.create({name: `${interaction.user.username.toLowerCase()}-${Collections.Tickets.countDocuments()}`, parent: OpenTicketsChannel})

    */

    //? I Give Up, I've Added Checks Im Not Wasting More Time On This Lets Just Get Koda.
    //? I DO Know The Code Is Fucked, Yes. But I'm Trying To Remove Errors That Typescript Keeps Giving Me Not Actually "Debug" Persay.
    //? I Also Know This Code WON'T Work But That Wasnt My Goal, My Goal Was To Remove Any Errors Arising From Any Types Not Working Even
    //? Though IVE ADDED FUCKING CHECKS
    //? I'm Tired. I'm Cold. I'm Going To Sleep. Fuck. This. Language.
}