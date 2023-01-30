//? Dependencies

import Config from '@lib/config'
import Client, { Channel } from "@lib/discord"
import * as Mongo from 'lib/mongo'
import { _client } from '@lib/discord/index'
import Discord from 'discord.js'

//? Dependencies



//? GameDig Import

import { Minecraft, ProjectZomboid, SpaceEngineers } from '@lib/Gamedig/index'

//? Templates

import { RulesMenu, InfomationMenu, RolesMenu, SupportChannel } from '@lib/templates/index'


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
        setInterval(() => {
            RulesMenu()
            InfomationMenu()
            RolesMenu()
        }, 1000 * 60 * 720)
        setInterval(() => {
            SupportChannel()
        }, 1000 * 60 * 60)
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