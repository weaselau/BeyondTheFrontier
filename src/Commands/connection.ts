//? Dependencies

import { ChatInputCommandInteraction, CacheType, EmbedBuilder, resolveColor } from "discord.js"


//? Command

export default (interaction: ChatInputCommandInteraction<CacheType>) => {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle('Important Information')
                .setDescription('This is the Important Information Tab')
                .setColor(resolveColor('#567fe8'))
                .setFields(
                    {
                        name: 'Important Information',
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