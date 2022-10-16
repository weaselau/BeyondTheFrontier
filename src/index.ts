//? Dependencies

import { Message, EmbedBuilder, resolveColor } from 'discord.js'

import Client, { Channel } from "@lib/discord"
import Query from "@lib/gamedig"



//? Client

Client()
    .then(client => {
        ProjectZomboid()
        setInterval(ProjectZomboid, 1000 * 60 * 5)
    })



//? Gamedig

async function ProjectZomboid() {

    const _channel = await Channel('614680459728650250', '1030539047996751903')
    const _message: Message = _channel.messages.cache.get('1031237192602898443') || await _channel.messages.fetch('1031237192602898443')

    if (!_message) return console.log('Project Zomboid Message could not be found!')



    Query('przomboid', '120.153.241.223', 16261)
        .then((data: any) => {

            const _players = data.players.join('\n').substring(0, 2000)
            const _overflow = _players.length == 2000 ? '\n\nThere are more players that cannot be loaded...' : ''


            _message.edit({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Project Zomboid')
                        .setColor(resolveColor('#20db16'))
                        .setFields([
                            { name: 'Player Count', value: `${data.players.length} / ${data.maxplayers}`, inline: false },
                            { name: 'Map', value: data.map, inline: false },
                            { name: 'Players', value: '>>> ' + (_players || 'There are No Players Online...') + _overflow, inline: false }
                        ])
                        .setTimestamp(new Date())
                ]
            })

        })
        .catch(error => {

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