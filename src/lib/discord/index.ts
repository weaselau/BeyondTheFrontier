//? Dependencies

import Config from '@lib/config'
import * as Discord from "discord.js"

//? Client

export let _client: Discord.Client

export default function Client(): Promise<Discord.Client> {
    return new Promise((resolve, reject) => {

        if (!_client?.isReady()) {
            _client = new Discord.Client({
                intents: [
                    Discord.GatewayIntentBits.GuildMembers
                ]
            })

            _client.login(Config.discord.token).catch(reject)

            _client.on('ready', () => {
                console.log(`Logged in as ${_client.user?.tag || '"Unknown"'}`)
                if (_client.user) resolve(_client)
                else reject('Client is not ready!')
                }
            )}
        }
    )}

