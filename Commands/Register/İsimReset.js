const { MessageEmbed } = require("discord.js");
const db = require("../../Database/UserDocs");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Black).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true}));
    if(!member) {return message.channel.send(embed.setDescription(`İsim dökümanlarını sıfırlayacağın kullanıcıyı belirtmelisin.`)).then(x => x.delete({timeout:8000}))};

    db.find({userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(data.length < 1){
            message.channel.send(embed.setDescription(`Etiketlediğin kullanıcının isim dökümanlarını database'de bulamadım.`)).then(x => x.delete({timeout:8000}));
        } else {
            db.deleteMany({userID: member.id}, async(err, data) => {
                if(err) console.log(err.message);
                message.channel.send(embed.setDescription(`${member} Adlı kullanıcının isim dökümanlarını sıfırladım.`));
            })
        }
    })
}

exports.conf = { aliases: ["isimreset", "isimlerreset", "isimlertemizle"]}

exports.help = { name: "isimreset"}