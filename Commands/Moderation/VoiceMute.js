const { MessageEmbed } = require("discord.js");
const db = require("../../Database/Penalties");
const config = require("../../config.json");
const moment = require("moment");
require("moment-duration-format");
const ms = require("ms");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.VoiceMutePerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Turquoise); if(!message.guild) {return};
    if(!member) {return message.channel.send(embed.setDescription(`Mute atacağın kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))};
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`)).then(z => z.delete({timeout:8000}))}
    if(!member.voice.channel){return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı herhangi bir ses kanalında bulunmuyor.`)).then(z => z.delete({timeout:8000}))}
    moment.locale("tr")
    let type = `[VOICE-MUTE]`; 
    let reason = args.slice(2).join(" ") || "Belirtilmedi";  
    let vmutetime = args[1];    
    if(!vmutetime) {return message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`Mute zamanı belirtmelisiniz`).setFooter(`Örnek kullanım: ${config.Bot.Prefix}vmute @LeFearr 15m Küfür`))};
    vmutetime = vmutetime.replace("sn", "s").replace("dk", "m").replace("saat", "h").replace("g", "d")

    if(member.voice.channel){

        member.voice.setMute(true)
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcı, ${message.author} tarafından ${member.voice.channel.name} adlı kanalda susturuldu.`))
        global.voicemute.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı sesli kanallarda susturuldu.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Susturulma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Süre: \`${vmutetime}\`\n• Sebep: \`${reason}\``))
        const newData = new db({
            userID: member.id,
            authID: message.author.id,
            reason: reason,
            type: type,
            date: message.createdAt
        }).save().catch(err => console.log(err.message));
    }

    setTimeout(async function(){

        member.voice.setMute(false)
        global.voicemute.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı sesli kanallarda susturulması kaldırıldı.\n• Yetkili: ${message.author} - (\`${message.author.id}\`)\n• Susturulma Tarihi: \`${new Date(message.createdAt).toLocaleString()}\`\n• Süre: \`${vmutetime}\`\n• Sebep: \`${reason}\``))
    
    }, ms(vmutetime))
}

exports.conf = { aliases: ["vmute"]}

exports.help = { name: "vmute"}