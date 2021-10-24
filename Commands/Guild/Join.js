const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    let embed = new MessageEmbed().setColor(config.Colors.Purple).setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}));
    if(isNaN(args[0])) {return message.channel.send(embed.setDescription(`Bir sayı belirtmelisin.`))}
    const members = message.guild.members.cache.filter(a => !a.user.bot).array().sort((b, a) => b.joinedTimestamp - a.joinedTimestamp) 
    const num = Number(args[0]);
    if(num > members.length){return message.channel.send(embed.setDescription(`Sunucuda ${members.length} üye var.`))
    } else {
        message.channel.send(embed.setDescription(`<@${members[num - 1].user.id}> üyesi sunucunun ${args[0]}. üyesi.`));        
    }
}

exports.help = { name: 'join', };

exports.conf = { aliases: ["join", "sıra"], };