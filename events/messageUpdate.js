const Discord = require("discord.js");

module.exports = {
    name: "messageUpdate",
    async execute(oldMessage, newMessage) {

        //If the content is the same, OR is a bot, return
        if (oldMessage.content === newMessage.content ||
            oldMessage.author.bot) {
            return;
        }

        //Define channel for the below line
        let channel = oldMessage.client.dataStorage.serverData;

        //Define chatChannel
        let chatChannel = oldMessage.guild.channels.cache.get(channel[oldMessage.guild.id]["chatChannel"]);

        //Do nothing if there isn't a channel
        if (!chatChannel) {
            return;
        }

        //Assemble the logging
        let cLog = new Discord.MessageEmbed()
            .setColor("#e8a726")
            .setTitle("Edited Message")
            .setDescription(`**From:** || ${oldMessage.content.trim() === '' ? "<media>" : oldMessage.content} || \n **To:** || ${newMessage.content} ||`);

        //Get the URL for any media attached and add it to the embed
        let urls = [...oldMessage.attachments.values()];
        for (let i = 0; i < urls.length; i++) {
            cLog.addField("Attachments", urls[i].proxyURL)
        }

        //Finally, log it!
        await chatChannel.send({
            content: ` :warning:  **${oldMessage.author.tag}** *(${oldMessage.author.id})*'s message has been edited in ${oldMessage.channel}:`,
            embeds: [cLog]
        });
    }
}