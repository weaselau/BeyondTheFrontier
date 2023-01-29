//? Dependencies
import * as Discord from 'discord.js'
import { Guild, _client } from '@lib/discord/index'
import Client from '@lib/discord'
import Config from '@lib/config'
import { channelLink, MembershipScreeningFieldType, TeamMemberMembershipState } from 'discord.js';
//? Dependencies




export default function InteractionSelectMenu(interaction: Discord.SelectMenuInteraction) {
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


            let dzrole = guild.roles.cache.find(role => role.name === 'Dayz'); if(!rwrole) return;
            if (interaction.values.includes('dz')) Member?.roles.add(rwrole)



        interaction.reply({ephemeral: true, content: 'Role/s added succsessfully'})
    }
}