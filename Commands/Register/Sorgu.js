const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("../../Database/Registries");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.RegisterPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let embed = new MessageEmbed().setColor(config.Colors.Purple)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    
    
    if(member){
        db.find({ userID: member.id}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1) {
                message.channel.send(embed.setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`
                • Toplam Kayıtlar:  \`0\`
                • Toplam Erkek Kayıtların: \`0\`
                • Toplam Kadın Kayıtların: \`0\``));
            } else {
                let item = data.reverse().reverse();
                let yazı = item.map(x => `• Toplam Kayıtlar:  \`${x.scoreCount}\`\n• Toplam Erkek Kayıtların: \`${x.scoreMan}\`\n• Toplam Kadın Kayıtların: \`${x.scoreGirl}\``)
                message.channel.send(embed.setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`${yazı}`));
            }
        });

    }
    if(!member){
        db.find({ userID: message.author.id}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1) {
                message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`
                • Toplam Kayıtlar:  \`0\`
                • Toplam Erkek Kayıtların: \`0\`
                • Toplam Kadın Kayıtların: \`0\``));
            } else {
                let item = data.reverse().reverse();
                let yazı = item.map(x => `• Toplam Kayıtlar:  \`${x.scoreCount}\`\n• Toplam Erkek Kayıtların: \`${x.scoreMan}\`\n• Toplam Kadın Kayıtların: \`${x.scoreGirl}\``)
                message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${yazı}`));
            }
    });


    }
    
 

}

exports.conf = { aliases: ["kayıt-sorgu", "sorgu", "kayıtsorgu", "kayıt-bilgi", "kayıtbilgi"]}

exports.help = { name: "Sorgu"}