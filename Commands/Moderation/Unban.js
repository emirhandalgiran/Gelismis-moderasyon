const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.BanPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.mentions.members.first() || args[0];
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(config.Colors.Purple);
    if(!member) {return message.channel.send(embed.setDescription(`Yasağını kaldıracağın kullanıcıyı belirtmelisin.`)).then(x => x.delete({timeout:8000}))};

    const bans = await message.guild.fetchBans(true);
    const bannedmember = bans.find(m => `${m.user.username}#${m.user.discriminator}` == member || m.user.id === member)

    if(bannedmember === undefined) {
        message.channel.send(embed.setDescription(`Belirtilen kullanıcı sunucuda yasaklı değil.`));
    } else {
        message.guild.members.unban(bannedmember.user);
        message.channel.send(embed.setDescription(`<@${member}> Adlı kullanıcının yasağı kaldırıldı.`));
    }
}

exports.conf = { aliases: ["unban"]}

exports.help = { name: "unban"}