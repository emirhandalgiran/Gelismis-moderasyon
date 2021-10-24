const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {

	let member = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let avatar = member.avatarURL({ dynamic: true, size: 2048 });
    let embed = new MessageEmbed().setColor("RANDOM").setAuthor(member.tag, avatar).setImage(avatar).setDescription(`[Resim Adresi](${avatar})`).setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
	message.channel.send(embed)
 	
}
exports.help = { name: "avatar"}

exports.conf = { aliases:["avatar"] }