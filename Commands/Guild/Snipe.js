const { MessageEmbed } = require("discord.js");
const snipes = {};
const config = require("../../config.json");

function timeChanger(value) {
    const days = Math.floor(value / 86400000);
    value = value % 86400000;
    const hours = Math.floor(value / 3600000);
    value = value % 3600000;
    const minutes = Math.floor(value / 60000);
    value = value % 60000;
    const seconds = Math.floor(value / 1000);
    return (days ? days + ' gün ' : '') + (hours ? hours + ' saat ' : '') + (minutes ? minutes + ' dakika ' : '') + (seconds ? seconds + ' saniye' : '');
}

exports.onLoad = (client) => {
    client.on("messageDelete", (message) => {
        if (!message.content) return;
     
        const channelSnipes = snipes[message.channel.id] || [];
        if (channelSnipes.length >= 5) {
            channelSnipes.shift();
            channelSnipes.push({
                writer: `${message.author.tag} (${message.author.id})`,
                content: message.content,
                deletedAt: Date.now()
            });
        } else {
            channelSnipes.push({
                writer: `${message.author.tag} (${message.author.id})`,
                content: message.content,
                deletedAt: Date.now()
            });
        }
        snipes[message.channel.id] = channelSnipes;    
    });
};

exports.run = async(client, message, args) => {
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    const channelSnipes = snipes[channel.id];

    if (!channelSnipes) return message.channel.send(`${channel} kanalında bot açıkken hiç mesaj silinmemiş.`);

    const embed = new MessageEmbed().setColor('RANDOM').setDescription(`${channel} kanalında en son silinen ${channelSnipes.length} mesaj;`);

    channelSnipes.map((data) => embed.addField(data.writer, `${data.content} - ${timeChanger(Date.now() - data.deletedAt)}`));

    message.channel.send(embed);
};

exports.help = { 
    name: "snipe"
};

exports.conf = { 
    aliases: ["snipe", "snipes"]
};