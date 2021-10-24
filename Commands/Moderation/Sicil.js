const { MessageEmbed } = require("discord.js");
const db = require("../../Database/Penalties");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.JailPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setColor(config.Colors.White).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true}))
    if(!member) {return message.channel.send(embed.setDescription(`Sicilini inceleyeceğin kullanıcıyı etiketlemelisin.`)).then(r => r.delete({timeout:8000}))};


    db.find({userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(data.length < 1){
            message.channel.send(embed.setDescription(`${member} Adlı kullanıcının sicili temiz!`))
        } else {
            data = data.reverse().reverse(); let sayı = 1;
            let sicil = data.map(x => `\`${sayı++}-\` **${x.type}** Sebep: \`${x.reason}\` Tarih: \`${new Date(x.date).toLocaleString()}\` Yetkili: <@${x.authID}> - (\`${x.authID}\`)`).join("\n\n")
            message.channel.send(embed.setDescription(sicil))
        }
    })
}

exports.conf = { aliases: ["sicil", "sicilsorgu"]}

exports.help = { name: "sicil"}