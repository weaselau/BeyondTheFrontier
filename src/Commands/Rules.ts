//? Dependencies

import { ChatInputCommandInteraction, CacheType, EmbedBuilder, resolveColor } from "discord.js"


//? Command

export default (interaction: ChatInputCommandInteraction<CacheType>) => {

    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle('Rule Menu')
                .setDescription('This is the rule Tab')
                .setColor(resolveColor('#567fe8'))
                .setFields(
                    {
                        name: 'Discord Rules',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: '\u200B',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: '\u200B',
                        value: '\u200B',
                        inline: true,
                    },
                    {
                        name: 'Rules',
                        value: '1. Respect all Members and Staff. \n 2. No bullying of any kind. \n 3. No posting personal info about others under any circumstance. \n 4. No Racism. \n 5. No Homophobic behaviour',
                        inline: true,
                    },
                    {
                        name: 'Subject to change',
                        value: '**All the rules seen will can be subject to change, please keep this in mind if you have any feed back can you please send it to <#1039148738628825098> threw a Support Ticket, just please state why you have opended the ticket.**',
                        inline: false,
                    },
                    {
                        name: 'Discord',
                        value: 'Discord Invite link - https://discord.gg/WvQTAeJHt3',
                        inline: false,
                    },
                )
                .setFooter({ text: 'Footer', })
                .setTimestamp(new Date())
        ]
    })
}
