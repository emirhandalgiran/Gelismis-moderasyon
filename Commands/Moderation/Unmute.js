const { MessageEmbed } = require("discord.js");
const db = require("../../Database/MuteDocs")
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.MutePerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Purple)
    if(!member) {return message.channel.send(embed.setDescription(`Sunucuda susturalacak kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))}
    if(!member.roles.cache.has(config.Roles.Muted)) {return message.channel.send(embed.setDescription(`Belirttiğin kullanıcı susturulmuş değil.`)).then(z => z.delete({timeout:8000}))}

    member.roles.remove(config.Roles.Muted);
    message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcının metin kanallarında susturulması ${message.author} - (\`${member.id}\`) tarafından kaldırıldı.`));
    db.deleteMany({userID: member.id}, async(err, data) => { if(err) console.log(err.message)});

}

exports.conf = { aliases: ["unmute"]}

exports.help = { name: "unmute"}