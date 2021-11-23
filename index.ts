import { Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
import {createClient} from 'redis';
import fetch from 'node-fetch';
import {bot_token, rejuk_notsafe_id} from './config';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const isUpdated = (oldData, newData) => {}

client.once('ready', async () => {

    const channel = client.channels.cache.get(rejuk_notsafe_id) as TextChannel;
    const redisClient = createClient({
        url: 'localhost:8080'
    });
    await redisClient.connect();
    redisClient.on('error', err=>{
        console.log(err)
        channel.send(`Redis error: ${err}`);
    });
    // if (channel) {
    //     const fetchResult = await fetch('https://community-uploads.highwinds-cdn.com/api/v9/community_uploads?channel_name__in[]=media&channel_name__in[]=nsfw-general&kind=landing&loc=https://hanime.tv');
    //     const { data } = await fetchResult.json() as { data: { url: string, username: string }[] };
    //     channel.send({
    //         embeds: data.filter((_, index) => index < 10).map(({ url, username }) => {
    //             return new MessageEmbed().setTitle(`from ${username}`).setImage(url);
    //         }),
    //     });
    // }
    console.log('Ready!');
});

// client.on('interactionCreate', async interaction => {
//     console.log(interaction)
// 	if (!interaction.isCommand()) return;

// 	const { commandName, channelId } = interaction;
// 	if(commandName === 'nsfw') {
//         const fetchResult = await fetch('https://community-uploads.highwinds-cdn.com/api/v9/community_uploads?channel_name__in[]=media&channel_name__in[]=nsfw-general&kind=landing&loc=https://hanime.tv');
//         const { data } = await fetchResult.json() as { data: { url: string, username: string }[] };
//         await interaction.reply({
//             embeds: data.filter((_,index)=>index < 10).map(({ url, username }) => {
//                 return new MessageEmbed().setTitle(`from ${username}`).setImage(url);
//             }),
//         })
//     }
// });

client.login(bot_token).catch(err => {
    console.log(err)
})