const { MessageEmbed } = require("discord.js");
const db = require("../../Database/UserDocs");
const config = require("../../config.json");
const UserDocs = require("../../Database/UserDocs");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.RegisterPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0]);
    let embed = new MessageEmbed().setColor(config.Colors.Purple).setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})); 
    if(!member) {return message.channel.send(embed.setDescription(`İsmini değiştireceğin kullanıcıyı belirtmelisin.`)).then(x => x.delete({timeout:8000}))};
    if(member.roles.cache.has(config.Roles.Unregister[0])) {return message.channel.send(embed.setDescription(`Bir kullanıcının ismini güncellemeden önce onu kayıt etmelisin.`)).then(x => x.delete({timeout:8000}))};
    const Name = String(args[1]); const Age = Number(args[2]);
    if(Name.length >= 32) {return message.channel.send(embed.setDescription(`Geçerli bir  ve yaş belirtmelisin.`)).then(x => x.delete({timeout:8000}))};
    if(!Name || !Age) {return message.channel.send(embed.setDescription(`Geçerli bir  ve yaş belirtmelisin.`)).then(x => x.delete({timeout:8000}))};
    let fullname = `${member.user.username.includes(config.Guild.Tag) ? config.Guild.Tag : config.Guild.Tag2} ${Name} ${config.Guild.TagName} ${Age}`

    if(member.roles.cache.has(config.Roles.Erkek[0])) {
        db.find({userID: member.id}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1){
                message.channel.send(embed.setFooter(`Eğer kullanıcı kayıtlı ise ilk önce kayıtsıza atmalısın. Örnek kullanım: ${config.Bot.Prefix}kayıtsız @LeFearr`).setDescription(`Bir kullanıcının ismini güncellemeden önce onu kayıt etmelisin.`)).then(x => x.delete({timeout:8000}))
            } else {
                await member.setNickname(fullname);
                const newName = new UserDocs({
                    userID: member.id,
                    userName: fullname,
                    authID: message.author.id,
                    roleID: config.Roles.Erkek[0],
                    date: message.createdAt
                }).save().catch(err => console.log(err.message));
                message.channel.send(embed.setDescription(`${member} Adlı kullanıcının ismi, ${message.author} tarafından \`${fullname}\` olarak değiştirildi.`))
            }
        })
    }

    if(member.roles.cache.has(config.Roles.Kız[0])) {
        db.find({userID: member.id}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1){
                message.channel.send(embed.setDescription(`Bir kullanıcının ismini güncellemeden önce onu kayıt etmelisin.`)).then(x => x.delete({timeout:8000}))
            } else {
                await member.setNickname(fullname);
                const newName = new UserDocs({
                    userID: member.id,
                    userName: fullname,
                    authID: message.author.id,
                    roleID: config.Roles.Kız[0],
                    date: message.createdAt
                }).save().catch(err => console.log(err.message));
                message.channel.send(embed.setDescription(`${member} Adlı kullanıcının ismi, ${message.author} tarafından \`${fullname}\` olarak değiştirildi.`))
            }
        })
    }
}

exports.conf = { aliases: ["isim", "name", "i"]}

exports.help = { name: "isim"}