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
                        value: '**all the rules seen will can be subject to change**',
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
