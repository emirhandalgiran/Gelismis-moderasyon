const { MessageEmbed } = require("discord.js");
const db = require("../../Database/BannedTag");
const config = require("../../config.json");

module.exports.run = async(client, message, args) => {
    
    if(!config.Bot.Owner.includes(message.author.id)) {return};

    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}));


    if(args[0] === "ekle"){
        let bannedtag = args[1]; 
        if(!bannedtag) {return message.channel.send(embed.setDescription(`Yasaklı listeye eklemek istediğin tagı belirtmelisin.`))};
        let bannedtaglist = message.guild.members.cache.filter(m => {return m.user.username.includes(bannedtag)});

        db.find({guildID: message.guild.id}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1){
                bannedtaglist.forEach(async member => {
                    await member.roles.remove(member.roles.cache.filter(r => r.id).map(r => r.id));
                    await member.roles.add(config.Roles.BannedTagRole);
                });
                const newdb = new db({
                    guildID: message.guild.id,
                    BannedTag: bannedtag
                }).save().catch(err => console.log(err.message));
                message.channel.send(embed.setDescription(`**${bannedtag}** tagı, yasaklı tag listesine eklendi.`));
            } else {
                data = data.reverse().reverse();
                let inc = data.map(x => `${x.BannedTag}`).join(" ,");
                if(inc.includes(bannedtag)){
                    message.channel.send(embed.setDescription(`**${bannedtag}** tagı, zaten yasaklı tag listesinde bulunuyor.`));
                } else {
                    bannedtaglist.forEach(async member => {
                        await member.roles.remove(member.roles.cache.filter(r => r.id).map(r => r.id));
                        await member.roles.add(config.Roles.BannedTagRole);
                    });
                    const newdata = new db({
                        guildID: message.guild.id,
                        BannedTag: bannedtag
                    }).save().catch(err => console.log(err.message));
                    message.channel.send(embed.setDescription(`**${bannedtag}** tagı, yasaklı tag listesine eklendi.`));
                }
            }
        })

    }


    if(args[0] === "liste"){
       db.find({guildID: message.guild.id}, async(err, data)=> {
           if(err) console.log(err.message);
           if(data.length < 1){
            message.channel.send(embed.setDescription(`Sunucuda herhangi bir yasaklı tag bulunmuyor.`));
           } else {
           data = data.reverse().reverse();
           let taglist = data.map(x => `**${x.BannedTag}** `).join(",");
           message.channel.send(embed.setDescription(`Yasaklı Tag Listesi;\n${taglist}`));
           }
       });
}


    if(args[0] === "sil"){
        let tagsil = args[1];
        if(!tagsil){return message.channel.send(embed.setDescription(`Silmek istediğiniz tagı girmelisiniz.`))}
        db.findOneAndDelete({guildID: message.guild.id, BannedTag: tagsil}, async(err, data) => {
            if(err) console.log(err.message);
            if(data.length < 1){
                message.channel.send(embed.setDescription(`Herhangi bir tag yasaklanmamış`))
            } else {
                message.channel.send(embed.setDescription(`**${tagsil}** , tagı yasaklı tag listesinden çıkarıldı.`))
            }
            
        })
    }

    if(args[0] === "temizle"){
        db.deleteMany({}, async(err, data) => {
            if(err) console.log(err.message);
            message.channel.send(embed.setDescription(`Yasaklı tag listesi temizlendi.`));
        })
    }
}

exports.help = { name: "yasaklıtag"}

exports.conf = { aliases: ["yasaklıtag", "bannedtag"] }