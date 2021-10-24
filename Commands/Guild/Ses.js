const { MessageEmbed } = require("discord.js")
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;


    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0; for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const public = message.guild.channels.cache.filter(channel => channel.parentID === config.Parent.Public);
    let pub = 0; for (const [id, voiceChannel] of public) pub += voiceChannel.members.size;


    const register = message.guild.channels.cache.filter(channel => channel.parentID === config.Parent.Register);
    let reg = 0; for (const [id, voiceChannel] of register) reg += voiceChannel.members.size;

    const vk = message.guild.channels.cache.filter(channel => channel.parentID === config.Parent.VK);
    let vkk = 0; for (const [id, voiceChannel] of vk) vkk += voiceChannel.members.size;

    const dc = message.guild.channels.cache.filter(channel => channel.parentID === config.Parent.Dc);
    let dcc = 0; for (const [id, voiceChannel] of dc) dcc += voiceChannel.members.size;


    const afk = message.guild.channels.cache.filter(c => c.id === message.guild.afkChannelID)
    let awayfk = 0;  for (const [id, voiceChannel] of afk) awayfk += voiceChannel.members.size;

    message.channel.send(embed.setDescription(`**Genel ses:** \`${count}\`\n\n**Public ses:** \`${pub}\``))

}

exports.conf = { aliases: ["ses", "sesbilgi", "ses-bilgi"]}

exports.help = { name: "ses" }