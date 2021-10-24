const {
    Collection,
    MessageEmbed
} = require("discord.js");
const afk = new Collection();
const moment = require("moment");
const config = require("../../config.json");
moment.locale("tr");

exports.onLoad = (client) => {
    client.on("message", (message) => {
        if (!message.guild || message.author.bot || message.content.toLowerCase().startsWith(`${config.Bot.Prefix}afk`)) return;

        const embed = new MessageEmbed().setColor("RANDOM");

        if (message.member.manageable && message.member.displayName.startsWith("[AFK]")) message.member.setNickname(message.member.displayName.replace(/\[AFK\] ?/gi, ""));

        if (afk.has(message.author.id) && afk.get(message.author.id)) {
            message.reply("Artık `AFK` değilsin. Tekrardan **hoş geldin!**");
            afk.delete(message.author.id);
        }

        if (!message.content.startsWith(config.Bot.Prefix) && message.mentions.users.size > 1 && message.mentions.users.filter((x) => x.id !== message.author.id).some((x) => afk.has(x.id))) {
            message.reply(embed.setDescription("Etiketlediğin kullanıcılar şu an `AFK!`"));
            return;
        }

        if (message.mentions.members.filter((x) => x.id !== message.author.id).some((x) => afk.has(x.id))) {
            const member = message.mentions.users.first();
            const data = afk.get(member.id) || {};
            if (!data) return;
            message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı ${data.reason ? `**${data.reason}** sebebiyle AFK!` : "AFK!"} (**${moment(data.now).fromNow()}**)`));
        }
    });
};

exports.run = async (client, message, args) => {
    const reason = args.join(" ") || "";
    const inviteRegExp = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;

    if (inviteRegExp.test(message.content) || message.deleted) return;
    afk.set(message.author.id, {
        reason: reason.length > 0 ? reason.slice(0, 2000) : null,
        now: Date.now()
    });
    message.delete({
        timeout: 200
    })
    message.reply("artık AFK modundasın. Seni etiketleyenlere AFK olma sebebini bildireceğim.").then((x) => x.delete({
        timeout: 5000
    }));
    if (message.member.manageable && !message.member.displayName.includes("AFK") && message.member.displayName.length < 30) message.member.setNickname("[AFK] " + message.member.displayName.replace(/\[AFK\] ?/g, ""));
};

exports.help = {
    name: "afk"
};

exports.conf = {
    aliases: ["afk"]
};