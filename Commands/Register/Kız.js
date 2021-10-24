const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Userdocs = require("../../Database/UserDocs");
const Registeries = require("../../Database/Registries");

module.exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(config.Permissions.RegisterPerm) && !message.member.hasPermission("ADMINISTRATOR")) {return};

    const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let embed = new MessageEmbed().setColor(config.Colors.White).setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}));

    if(!member) {return message.channel.send(embed.setDescription(`Kayıt edeceğin kullanıcıyı etiketlemelisin.`)).then(x => x.delete({timeout:8000}))}
    if(!member.roles.cache.has(config.Roles.Unregister[0])) { return message.channel.send(embed.setDescription(`Etiketlediğin kullanıcı zaten kayıt edilmiş.`)).then(x => x.delete({timeout:8000}))}
    if(member.roles.highest.position >= message.member.roles.highest.position) {return message.channel.send(embed.setDescription(`Bu Kullanıcı Sizden Üst/Aynı Pozsiyondadır.`)).then(x => x.delete({timeout:8000}))} if(member.id === message.author.id) {return};
    const Name = String(args[1]); const Age = Number(args[2]);
    if(Name.length>=32) {return message.channel.send(embed.setDescription(`Geçerli bir isim girmelisin.`)).then(x => x.delete({timeout:8000}))};
    if(!Name || !Age) {return message.channel.send(embed.setDescription('Geçerli bir isim ve yaş gir.')).then(x => x.delete({timeout:8000}))};
    const fullname = `${member.user.username.includes(config.Guild.Tag) ? config.Guild.Tag : config.Guild.Tag2} ${Name} ${config.Guild.TagName} ${Age}`

    member.setNickname(fullname);
    await member.roles.add(config.Roles.Kız);
    await member.roles.remove(config.Roles.Unregister);

    Registeries.findOne({ userID: message.author.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(!data) {
            const newReg = new Registeries({
                userID: message.author.id,
                scoreCount: 1,
                scoreGirl: 1,
                scoreMan: 0
            }).save().catch(err => console.log(err.message));
        } else {
            data.scoreCount++
            data.scoreGirl++
            data.save().catch(err => console.log(err.message));
        }
    });

    let user = new Userdocs({
        userID: member.id,
        userName: fullname,
        authID: message.author.id,
        roleID: config.Roles.Kız[0],
        date: message.createdAt
    }).save().catch(err => console.log(err.message));

    Userdocs.find({ userID: member.id}, async(err, data) => {
        if(err) console.log(err.message);
        if(data.length < 1){
            message.channel.send(embed.setDescription(`${member}, ${message.author} tarafından kayıt edildi. \n\n ${config.React.Check}  \`${fullname}\` adlı kullanıcı sunucuda ilk kez kayıt oldu.`));
        } else {
            let db = data.reverse().reverse(); let sayı = 1
            let isimler = db.map(x => `\`${sayı++}-\` ${x.userName} **[<@&${x.roleID}>]**`).join("\n");           
            message.channel.send(embed.setDescription(`${member}, ${message.author} tarafından kayıt edildi. \n\n ${config.React.Cross}  \`${fullname}\` adlı kullanıcının sunucuda kayıt olduğu isimleri; \n\n${isimler}`));
        }
    });
    
}

exports.conf = { aliases: ["kız", "k"]}

exports.help = { name: "kız"}