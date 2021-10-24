const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATO")) {return}; if(!message.guild) {return};

    let everyone = message.guild.roles.cache.find(r => r.name === "@everyone"); let permObject = {};
    let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))

    if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
      permObject["SEND_MESSAGES"] = false; message.channel.createOverwrite(everyone, permObject);
      message.channel.send(embed.setColor(config.Colors.Purple).setDescription("Kanal kilitlendi!"))
    } else {
      permObject["SEND_MESSAGES"] = null; message.channel.createOverwrite(everyone, permObject);
      message.channel.send(embed.setColor(config.Colors.Turquoise).setDescription("Kanal kilidi açıldı!"));
    };
  };


exports.conf = { aliases: ["kilit"]}

exports.help = { name: "kilit" }