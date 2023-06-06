//? Dependencies

import Config from '@lib/config'
import Client from "@lib/discord"
import { _client } from '@lib/discord/index'
import Discord from 'discord.js'
import GameDig from "gamedig"
//? Client

Client()
    .then(client => {
        MemberCount()
        setInterval(() => {
            MemberCount()
        }, 5000)
    })


    async function MemberCount(){
        const Query = await GameDig.query({ type: 'dayz', host: '192.168.0.84', port: 2307 }).catch((err) => {err: err}) as GameDig.QueryResult
        console.log(Query)
        _client.user?.setPresence({
            status: 'online',
            activities: [{
                type: Discord.ActivityType.Watching,
                name: `${Query.players === undefined? 'Server Offline': Query.players.length} / ${Query.maxplayers}`
            }]
        })
    }
//? ${Query.players.length} / ${Query.maxplayers}