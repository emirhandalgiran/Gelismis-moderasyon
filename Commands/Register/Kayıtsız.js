const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.Purple).setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}));

    if(!member) {return message.channel.send(embed.setDescription(`Kayıtsıza atacağın kullanıcıyı belirtmelisin.`)).then(x => x.delete({timeout:8000}))};
    if(member.manageable) {

        await member.setNickname(member.user.username);
        let rolesArray = [];
        member.roles.cache.filter(r => r.id).map(r => { rolesArray.push(r.id)});
        await member.roles.remove(rolesArray);
        await member.roles.add(config.Roles.Unregister);
        message.channel.send(embed.setDescription(`${member} Adlı kullanıcı, ${message.author} tarafından kayıtsız'a atıldı.`));
    }
}

exports.conf = { aliases: ["kayıtsız", "unregister", "register"]}

exports.help = { name: "kayıtsız"}