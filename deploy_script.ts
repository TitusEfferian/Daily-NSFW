import { bot_token, client_id, rejuk_server_id } from "./config";

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    new SlashCommandBuilder().setName('nsfw').setDescription('fetch not safe for work from uploaded community'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(bot_token);

rest.put(Routes.applicationGuildCommands(client_id, rejuk_server_id), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);