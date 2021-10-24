const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("../../Database/Penalties")
const roles = require("../../Database/JailDocs");
const moment = require("moment");
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.JailPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.White); if(!message.guild) {return};
    if(!member) {return message.channel.send(embed.setDescription(`Jail atacağın kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))};
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`)).then(z => z.delete({timeout:8000}))}
    if(member.roles.cache.has(config.Roles.Jail)) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı zaten cezalı.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(z => z.delete({timeout:8000}))}
    moment.locale("tr")
    let type = `[TEMP-JAIL]`; 
    let reason = args.slice(2).join(" ") || "Belirtilmedi";  
    let jailtime = args[1];    
    if(!jailtime) {return message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`Mute zamanı belirtmelisiniz`).setFooter(`Örnek kullanım: ${config.Bot.Prefix}mute @LeFearr 15m Küfür`))};
    jailtime = jailtime.replace("sn", "s").replace("dk", "m").replace("saat", "h").replace("g", "d")

    let rolesArray = [];
    member.roles.cache.filter(r => r.id).map(r => {rolesArray.push(r.id)})
    await member.roles.remove(rolesArray);
    await member.roles.add(config.Roles.Jail);
    global.jail.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı jail'e atıldı.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Cezalandırılma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Zaman: \`${jailtime}\`\n• Sebep: \`${reason}\``));
    
    const role = new roles({userID: member.id}).save().catch(err => console.log(err.message));

    setTimeout(async function(){
        await member.roles.add(rolesArray);
        await member.roles.remove(config.Roles.Jail);
        global.jail.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı jail'den çıkarıldı.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Cezalandırılma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Zaman: \`${jailtime}\`\n• Sebep: \`${reason}\``));
        db.deleteMany({userID: member.id}, async(err, data) => { if(err) console.log(err.message)});
    }, ms(jailtime));
    


}

exports.conf = { aliases: ["tempjail", "süreliceza"]}

exports.help = { name: "tempjail"}