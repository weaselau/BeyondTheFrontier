//? Dependencies

import Config from '@lib/config'
import * as Discord from "discord.js"



import GlobalCommands from '@lib/discord/commands'

import * as _commands from '../../Commands'


//? Events, Templates and Roles
import * as Events from '@lib/discord/events'
import * as LeaveJoin from '@lib/templates/index'
import * as Roles from '@lib/templates/index'






//? Client

export let _client: Discord.Client

export default function Client(): Promise<Discord.Client> {
    return new Promise((resolve, reject) => {

        if (!_client?.isReady()) {
            _client = new Discord.Client({
                intents: [
                    Discord.GatewayIntentBits.GuildBans,
                    Discord.GatewayIntentBits.GuildEmojisAndStickers,
                    Discord.GatewayIntentBits.GuildMembers,
                    Discord.GatewayIntentBits.GuildMessageReactions,
                    Discord.GatewayIntentBits.GuildMessages,
                    Discord.GatewayIntentBits.GuildPresences,
                    Discord.GatewayIntentBits.Guilds,
                    Discord.GatewayIntentBits.MessageContent,
                    Discord.GatewayIntentBits.DirectMessages,
                    Discord.GatewayIntentBits.GuildInvites,
                    Discord.GatewayIntentBits.GuildIntegrations,
                    Discord.GatewayIntentBits.GuildVoiceStates
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
                        else if(interaction.isSelectMenu()) Roles.InteractionSelectMenu(interaction)
                        else if (interaction.isButton()) Events.ButtonPress(interaction)
                    } catch {
                        if (interaction.isChatInputCommand()) interaction.reply({ content: 'This Command does not exist on the Server!', ephemeral: true })
                        else console.log(`Interaction "${interaction.id}" does not exist on the Server!`)
                    }
                })

            })

            _client.on('guildMemberAdd', (member) => LeaveJoin.onMemberJoin(member))
            _client.on('guildMemberRemove', (member) => LeaveJoin.onMemberLeave(member))

            _client.on('channelDelete', (channel) => Events.onChannelDelete(channel))

        } else resolve(_client)

    })
}



//? Common Exports

export function Guild(guildId: string): Promise<Discord.Guild> { return new Promise((resolve, reject) => Client().then(async client => resolve(client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId))).catch(reject)) }
export function Channel(guildId: string, channelId: string): Promise<Discord.TextChannel> { return new Promise((resolve, reject) => Guild(guildId).then(async guild => resolve((guild.channels.cache.get(channelId) || await guild.channels.fetch(channelId).catch(reject)) as Discord.TextChannel))) }