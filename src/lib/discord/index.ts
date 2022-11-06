//? Dependencies

import Config from '@lib/config'
import * as Discord from "discord.js"



import GlobalCommands from '@lib/discord/commands'

import * as _commands from '../../Commands'

import * as Events from '@lib/discord/events'



//? Client

export let _client: Discord.Client

export default function Client(): Promise<Discord.Client> {
    return new Promise((resolve, reject) => {

        if (!_client?.isReady()) {
            _client = new Discord.Client({
                intents: [
                    Discord.GatewayIntentBits.Guilds,
                    Discord.GatewayIntentBits.GuildMembers,
                    Discord.GatewayIntentBits.GuildMessages
                ]
            })

            _client.login(Config.discord.token).catch(reject)

            _client.on('ready', () => {
                console.log(`Logged in as ${_client.user?.tag || '"Unknown"'}`)
                if (_client.user) resolve(_client)
                else reject('Client is not ready!')


                //? Register Global Commands
                _client.application?.commands.set(GlobalCommands)
                    .then(() => console.log(`${GlobalCommands.length}x Slash Commands Successfully Reloaded`))


                //? Interaction Handler
                const Commands: any = _commands
                _client.on('interactionCreate', interaction => {
                    try {
                        if (interaction.isChatInputCommand()) Commands[interaction.commandName](interaction)
                    } catch {
                        if (interaction.isChatInputCommand()) interaction.reply({ content: 'This Command does not exist on the Server!', ephemeral: true })
                        else console.log(`Interaction "${interaction.id}" does not exist on the Server!`)
                    }
                })

            })

            _client.on('guildMemberAdd', (member) => Events.onMemberJoin(member))
            _client.on('guildMemberRemove', (member) => Events.onMemberLeave(member))

        } else resolve(_client)

    })
}



//? Common Exports

export function Guild(guildId: string): Promise<Discord.Guild> { return new Promise((resolve, reject) => Client().then(async client => resolve(client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId))).catch(reject)) }
export function Channel(guildId: string, channelId: string): Promise<Discord.TextChannel> { return new Promise((resolve, reject) => Guild(guildId).then(async guild => resolve((guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId).catch(reject)) as Discord.TextChannel))) }