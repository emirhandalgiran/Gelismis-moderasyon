const { MessageEmbed, MessageManager } = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

    if(!message.member.voice.channel){return};
    let embed = new MessageEmbed().setColor(config.Colors.Purple)
    let member = message.mentions.members.first();
    if(!member) {return message.channel.send(embed.setDescription(`Bir kullanıcı etiketlemelisiniz.`))};
    if(member.id === message.member.id) {return};
    if(!member.voice.channel) {return message.channel.send(embed.setDescription(`Çekmek istediğiniz kullanıcı herhangi bir ses kanalında bulunmuyor.`)).then(x => x.delete({timeout:10000}))};

    if(message.member.voice.channel.id === member.voice.channel.id) {return};
    const voiceChannel = message.member.voice.channel.id; if(!voiceChannel){return};

    if(message.member.hasPermission("ADMINISTRATOR")){
        await message.guild.member(message.member).voice.setChannel(member.voice.channel.id);
    } else {
        const filter = (reaction, user) => { return [config.React.CheckName, config.React.CrossName].includes(reaction.emoji.name) && user.id === member.id;};
        let mesaj = await message.channel.send(embed.setDescription(`${member}, Odana gelmek istiyor. Kabul ediyor musun ? `));

        await mesaj.react(config.React.Check);
        await mesaj.react(config.React.Cross);

        mesaj.awaitReactions(filter, {max: 1, time: 60000, errors: ["time"]}).then(collected => {

            const reaction = collected.first();
            if(reaction.emoji.name === config.React.CheckName){
                mesaj.delete({timeout:100})
                message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member}, \`${member.voice.channel.name}\` adlı odaya girmene izin verdi.`)).then(x => x.delete({timeout:10000}));
                message.guild.member(message.member).voice.setChannel(member.voice.channel.id);
            } else if(reaction.emoji.name === config.React.CrossName){
                mesaj.delete({timeout:100});
                message.channel.send(embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setDescription(`${member}, \`${member.voice.channel.name}\` adlı odaya girmene izin vermedi.`)).then(x => x.delete({timeout:10000}));

            };
        });
    };

}
exports.help = { name: "git" }

exports.conf = { aliases: ["git"] }