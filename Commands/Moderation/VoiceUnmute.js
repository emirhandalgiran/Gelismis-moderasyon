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
    if(!member.voice.channel) {return message.channel.send(embed.setDescription(`${member} Adlı kullanıcı ses kanallarında bulunmuyor.`)).then(z => z.delete({timeout:8000}))}
    if(!member.voice.setMute(true)) {return message.channel.send(embed.setDescription(`${member} Adlı kullanıcı susturulmuş değil.`)).then(z => z.delete({timeout:8000}))}
    
    if(member.voice.channel){
        member.voice.setMute(false)
        message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member}\`) Adlı kullanıcının sesli kanallarda susturulması ${message.author} tarafından kaldırıldı.`))
    }
}

exports.conf = { aliases: ["vunmute", "voiceunmute"]}

exports.help = { name: "vunmute"}