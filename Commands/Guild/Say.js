const { MessageEmbed } = require("discord.js")
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return;


    const tag = config.Guild.Tag
    const üye = message.guild.memberCount
    const online = message.guild.members.cache.filter(online => online.presence.status != "offline").size
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
    let count = 0; for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    const booster = message.guild.roles.cache.get(config.Roles.Booster).members.size
    const tagsize = message.guild.members.cache.filter(ı => ı.user.username.includes(tag)).size
    const embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))

    message.channel.send(embed.setDescription(`**• Toplam üye:  \`${üye}\` 
    <a:v_elmas:827522507774230538> • Sunucumuzdaki ToplamAktif Üye Sayısı:  \`${online}\`
    <a:v_elmas:827522507774230538> • Toplam Tagımızda Bulunan Üye Sayısı:  \`${tagsize}\`
    <a:v_elmas:827522507774230538> • Sunucumuza Basılmış Boost Sayısı:  \`${booster}\`
    <a:v_elmas:827522507774230538> • Toplam Sesli Kanallarımızda Bulunan Üye Sayısı:  \`${count}\`**`))

}

exports.conf = { enabled: true, guildOnly: true, aliases: ["say"]}

exports.help = { name: "say" }