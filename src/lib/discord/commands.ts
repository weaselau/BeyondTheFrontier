//? Dependencies

import { SlashCommandBuilder } from "discord.js"



//? Variables

const RoleChoices = [
    { name: 'Project Zomboid', value: 'project_zomboid' },
    { name: 'Minecraft', value: 'minecraft' }
]



//? Commands

const Commands = [



    new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Send an embed')

        .addStringOption(option => option.setName('title').setDescription('Title of the embed').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Description of the embed').setRequired(true)),



    new SlashCommandBuilder()
        .setName('log')
        .setDescription('Log to Console')

        .addStringOption(option => option.setName('text').setDescription('Text to be logged to the Console').setRequired(true)),


]

export default Commands