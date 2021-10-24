const { Message } = require("discord.js");
const { db } = require("../Database/JailDocs");

module.exports = async member => {

    if(member.user.username.includes(global.config.Guild.Tag)){
        member.roles.add(global.config.Roles.TagRole)
    };
    
    member.roles.add(global.config.Roles.Unregister)

    let user = client.users.cache.get(member.id);
    global.moment.locale("tr-TR");
    require("moment-duration-format");

    let day = global.moment(member.user.createdAt).format("DD");
    let date = global.moment(member.user.createdAt).format("YYYY HH:mm:ss");
    let month = global.moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
    let kurulus = `\`${day} ${month} ${date}\``

    const tarih = new Date().getTime() - user.createdAt.getTime();
    var kontrol;
    if (tarih < 1296000000) kontrol = config.React.Cross
    if (tarih > 1296000000) kontrol = config.React.Check

    global.welcome.send(`
<a:cekilis:827508259819880498> **Sunucumuza Hoşgeldin** <@` + member + `> <a:cekilis:827508259819880498>

<a:Rainbow_Ok_Gif:827503052701040670> **Hesabın** ${kurulus} **Tarihinde Kuruldu** ` + kontrol + `

<a:Rainbow_Ok_Gif:827503052701040670> **Sunucumuzun kuralları** <#` + global.config.Guild.Rules + `> **Kanalında Belirtilmiştir.**

<a:Rainbow_Ok_Gif:827503052701040670> **Sunucumuza Kayıt Olduğunda Kuralları Okumuş** **Kabul Etmiş Sayılacaksın**. **Seninle Beraber** \`` + member.guild.memberCount + `\` **Kişi Olduk**! 

<a:Rainbow_Ok_Gif:827503052701040670> **Sunucumuza Kayıt Olmak İçin Ses Teyit Odalarına Girerek Kayıt Olman Gerekiyor,  <@&827517611855183882> Yetkisinde Bulunan Arkadaşlarımız Seninle İlgilenicektir.**

<a:__:827774597554110514>  **İyi Eğlenceler Dileriz!**`);


const jaildata = await global.jaildocs.findOne({userID: member.id});

if(jaildata){

    let rolesArray = [];
    member.roles.cache.filter(r => r.id).map(r => {rolesArray.push(r.id)})
    await member.roles.remove(rolesArray);
    await member.roles.add(global.config.Roles.Jail)
    
};

const mutedata = await global.mutedocs.findOne({userID: member.id});

if(mutedata){
    await member.roles.add(global.config.Roles.Muted);
};


}