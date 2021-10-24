const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.CommandPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};
    if(!message.guild) {return};
    
    let embed = new MessageEmbed().setColor(config.Colors.Purple).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}));
    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    if(!member) {return};
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı pozisyonda.`)).then(x => x.delete({timeout:10000}))};

    message.guild.member(member.id).voice.setChannel(null);
    message.channel.send(embed.setDescription(`${member} adlu kullanıcının bağlantısı kesildi`)).then(x => x.delete({timeout:10000}))

}

exports.help = { name: "kes" }

exports.conf = { aliases: ["kes"]}

//etiketlediğin adam sesten atılır.