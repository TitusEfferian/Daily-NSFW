import { Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
import { createClient } from 'redis';
import fetch from 'node-fetch';
import cron from 'node-cron';
import { bot_token, rejuk_notsafe_id } from './config';
import { CommunityUploadInterface } from './types';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const redisClient = createClient({
    url: 'redis://redis:6379'
});

const getMetaTotal = async () => {
    const value = await redisClient.get('total');
    return value;
};

client.once('ready', async () => {
    const channel = client.channels.cache.get(rejuk_notsafe_id) as TextChannel;
    await redisClient.connect();
    redisClient.on('error', err => {
        console.log(err);
    });
    cron.schedule('50 * * * *', async () => {
        if (channel) {
            const fetchResult = await fetch('https://community-uploads.highwinds-cdn.com/api/v9/community_uploads?channel_name__in[]=media&channel_name__in[]=nsfw-general&kind=landing&loc=https://hanime.tv');
            const { data, meta } = await fetchResult.json() as CommunityUploadInterface;
            const metaTotal = await getMetaTotal();
            if (metaTotal === null) {
                redisClient.set('total', String(meta.total));
            }
            else if (meta.total - Number(metaTotal) >= 10) {
                redisClient.set('total', String(meta.total));
                channel.send({
                    embeds: data.filter((_, index) => index < 10).map(({ url, username }) => {
                        return new MessageEmbed().setTitle(`from ${username}`).setImage(url);
                    }),
                });
            }
        }
    });
    console.log('Ready!');
});

client.login(bot_token).catch(err => {
    console.log(err)
})