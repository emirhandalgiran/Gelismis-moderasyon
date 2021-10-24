const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    const Num = parseInt(args[0]);
    if(!args[0] || Num < 1 || Num > 100) return message.channel.send("1 ve 100 arası bir sayı girin.");
    message.delete().catch(() => undefined);
    message.channel.bulkDelete(Num).then((messages) => message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`Başarıyla **${messages.size}** adet mesaj silindi!`)));
};

exports.help = { 
    name: "sil"
};

exports.conf = { 
    aliases: ["temizle", "sil", "clear", "purge"]
};