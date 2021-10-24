const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("../../Database/JailDocs");
const role = require("../../Database/JailDocs");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.JailPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.White); if(!message.guild) {return};
    if(!member) {return message.channel.send(embed.setDescription(`Jail atacağın kullanıcıyı etiketlemelisin.`)).then(z => z.delete({timeout:8000}))};
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı senden üst/aynı yetkide.`)).then(z => z.delete({timeout:8000}))}
    if(!member.roles.cache.has(config.Roles.Jail)) {return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı cezalı değil.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))).then(z => z.delete({timeout:8000}))}

    const odlData = await db.findOne({userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(data.length < 1) {
            message.channel.send(embed.setDescription(`${member} Adlı kullanıcının rollerini database'de bulamadım. Tekrar kayıt etmeniz gerekiyor.`))
        } 
    });


    let roles = odlData.roleArray || [];
    member.roles.add(roles);
    member.roles.remove(config.Roles.Jail);
    message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member} - (\`${member.id}\`) Adlı kullanıcı jailden çıkarıldı.`));

    db.deleteMany({userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
    });

}

exports.conf = { aliases: ["unjail", "cezakaldır"]}

exports.help = { name: "unjail"}