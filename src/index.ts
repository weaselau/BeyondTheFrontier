//? Dependencies

import Config from '@lib/config'
import Client from "@lib/discord"
import { _client } from '@lib/discord/index'
import Discord from 'discord.js'

import DayZ from '@lib/DayZ/DayZ'


//? Dependencies
//? Client

Client()
    .then(client => {
        MemberCount()
        setInterval(() => {
            MemberCount()
            DayZ()
        }, 15000)
    })


    async function MemberCount(){
        _client.user?.setPresence({
            status: 'online',
            activities: [{
                type: Discord.ActivityType.Watching,
                name: `Test Player Count`
            }]
        })
    }