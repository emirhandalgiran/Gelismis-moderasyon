const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("../../Database/Penalties")
const roles = require("../../Database/MuteDocs");
const moment = require("moment");
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.MutePerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Turquoise); if(!message.guild) {return};
    if(!member) {return message.channel.send(embed.setDescription(`Mute atacağın kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))};
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`)).then(z => z.delete({timeout:8000}))}
    if(member.roles.cache.has(config.Roles.Muted)) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı zaten susturulmuş.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(z => z.delete({timeout:8000}))}
    moment.locale("tr")
    let type = `[TEMP-MUTE]`; 
    let reason = args.slice(2).join(" ") || "Belirtilmedi";  
    let mutetime = args[1];    
    if(!mutetime) {return message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`Mute zamanı belirtmelisiniz`).setFooter(`Örnek kullanım: ${config.Bot.Prefix}mute @LeFearr 15m Küfür`))};
    mutetime = mutetime.replace("sn", "s").replace("dk", "m").replace("saat", "h").replace("g", "d")


    global.mute.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı metin kanallarında susturuldu.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Susturulma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Süre: \`${mutetime}\`\n• Sebep: \`${reason}\``));
    member.roles.add(config.Roles.Muted).catch(err => console.log(err.message));

    const newData = new db({
        userID: member.id,
        authID: message.author.id,
        reason: reason,
        type: type,
        date: message.createdAt
    }).save().catch(err => console.log(err.message));


    setTimeout(async function(){
        member.roles.remove(config.Roles.Muted);
        global.mute.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı metin kanallarında susturulması kaldırıldı.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Susturulma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Süre: \`${mutetime}\`\n• Sebep: \`${reason}\``))
    }, ms(mutetime));

    const role = new roles({userID: member.id}).save().catch(err => console.log(err.message));

}

exports.conf = { aliases: ["tempmute", "sürelisustur"]}

exports.help = { name: "tempmute"}