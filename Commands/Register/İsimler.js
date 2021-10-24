const { MessageEmbed } = require("discord.js");
const db = require("../../Database/UserDocs");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.RegisterPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Red);
    if(!member) {return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisin.`)).then(x => x.delete({timeout:8000}))}

    db.find({ userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(data.length < 1){
            message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`Etiketlediğiniz kullanıcı daha önce sunucuda kayıt olmamış.`));
        } else {
            let item = data.reverse().reverse(); let sayı = 1;
            let isimler = item.map(x => `\`${sayı++}-\`  ${x.userName} **[<@&${x.roleID}>]** - Yetkili: <@${x.authID}> Zaman: \`${new Date(x.date).toLocaleString()}\``).join("\n\n");
            message.channel.send(embed.setThumbnail(member.user.avatarURL({dynamic:true})).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`${member} Adlı kullanıcının eski isimleri; \n\n${isimler}`));
        }
    });
}

exports.conf = { aliases: ["isimler", "names"]}

exports.help = { name: "isimler"}