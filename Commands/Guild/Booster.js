const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = (client, message, args) => {

    if(!message.member.roles.cache.has(config.Roles.Booster) && !message.member.hasPermission("ADMINISTRATOR") ) return;

    let member = message.member; 
    let name =  args.slice(0).join(' ');
    let embed = new MessageEmbed().setColor(config.Colors.Turquoise).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}));
    const fullname = `${member.user.username.includes(config.Guild.Tag) ? config.Guild.Tag : config.Guild.Tag2} ${name}`;
    member.setNickname(fullname);
    message.channel.send(embed.setDescription(`**Yeni Adın:** **\`${fullname}\`**`))
}


exports.help = { name: "boostername"}

exports.conf = { aliases:["para", "nick", "booster", "boostername"] }