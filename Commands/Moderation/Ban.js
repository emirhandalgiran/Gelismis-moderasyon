const { MessageEmbed } = require("discord.js");
const db = require("../../Database/Penalties");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.BanPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return}; if(!message.guild) {return};
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setThumbnail(member.user.avatarURL({dynamic:true})).setColor(config.Colors.Turquoise).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}));
    if(!member) {return message.channel.send(embed.setDescription(`Sunucudan yasaklamak istediğin kullanıcıyı belirtmelisin.`)).then(x => x.delete({timeout:8000}))}
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`))};
    let reason = args.slice(1).join(' ') || "Belirtilmedi"; let type = `[BAN]`

    member.ban({reason: reason, days: 7}).catch(err => console.log(err.message));
    message.channel.send(embed.setDescription(`${member} Adlı kullanıcı, ${message.author} tarafından sunucudan yasaklandı`));
    global.ban.send(embed.setDescription(`${member} - (\`${member.id}\`) üyesi sunucudan yasaklandı. \n• Yasaklayan: ${message.author} - (\`${message.author.id}\`)\n• Tarih: \`${new Date(message.createdAt).toLocaleString()}\`\n• Sebep: \`${reason}\``));

    const newBan = new db({
        userID: member.id,
        authID: message.author.id,
        reason: reason,
        type: type,
        date: message.createdAt
    }).save().catch(err => console.log(err.message));

}

exports.conf = { aliases: ["ban", "yasakla"]}

exports.help = { name: "ban"}