const { MessageEmbed } = require("discord.js");
const db = require("../../Database/Penalties");
const roles = require("../../Database/MuteDocs");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.MutePerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Purple)
    if(!member) {return message.channel.send(embed.setDescription(`Sunucuda susturalacak kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))}
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`)).then(z => z.delete({timeout:8000}))}
    if(member.roles.cache.has(config.Roles.Muted)) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı zaten susturulmuş.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(z => z.delete({timeout:8000}))}
    let reason = args.slice(1).join(" ") || "Belirtilmedi"; let type = `[CHAT-MUTE]`

    member.roles.add(config.Roles.Muted);
    global.mute.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı metin kanallarında susturuldu.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Atılma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Sebep: \`${reason}\``));

    const newData = new db({
        userID: member.id,
        authID: message.author.id,
        reason: reason,
        type: type,
        date: message.createdAt
    }).save().catch(err => console.log(err.message));

    const role = new roles({userID: member.id}).save().catch(err => console.log(err.message));

}

exports.conf = { aliases: ["mute", "sustur"]}

exports.help = { name: "mute"}