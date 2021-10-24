const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.CommandPerm) && !message.member.hasPermission(("ADMINISTRTOR"))) {return};

    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}));
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) {return message.channel.send(embed.setDescription(`Bir kullanıcıyı etiketlemelisin.`))}
    let role = config.Ability.Vip; if(!role) {return};

    if(member.roles.cache.has(role)){
        member.roles.remove(role)
        message.channel.send(embed.setColor(config.Colors.Purple).setDescription(`${member} adlı kullanıcıdan, <@&${role}> adlı rol alındı.`))
    } else {
        member.roles.add(role)
        message.channel.send(embed.setColor(config.Colors.Turquoise).setDescription(`${member} adlı kullanıcıya, <@&${role}> adlı rol verildi.`))
    }

}

exports.help = { name: "vip"};

exports.conf = { aliases: ["vip", "vıp"]};