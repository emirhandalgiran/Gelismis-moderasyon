const { MessageEmbed } = require("discord.js");
const db = require("../../Database/Registries");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.RegisterPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};
    
    let strng = "Top Teyit Listesi"; let embed = new MessageEmbed().setAuthor(strng, message.guild.iconURL({dynamic:true}));
    let sayı = 1
    let top = db.find({}).exec((err, data) => {
    if(err) console.log(err.message);
    data = data.filter(u => message.guild.members.cache.has(u.userID));
    let topsıralama = data.sort((user1, user2) => Number(user2.scoreCount)-Number(user1.scoreCount)).slice(0, 15).map(x => `\`${sayı++}-\` ${message.guild.members.cache.get(x.userID).toString()} **Toplam Kayıt: ${Number(x.scoreCount)} (erkek: ${Number(x.scoreMan)}, kız: ${Number(x.scoreGirl)})**`).join("\n")
    message.channel.send(embed.setDescription(topsıralama))
    });

}

exports.conf = { aliases: ["topteyit"]}

exports.help = { name: "topteyit"}