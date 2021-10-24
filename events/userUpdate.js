const config = require("../config.json");

module.exports = async(oldUser, newUser) =>{

    let guild = global.client.guilds.cache.get(config.Guild.GuildID)
    let user = guild.members.cache.get(newUser.id);
    if(!guild.members.cache.has(newUser.id) || newUser.bot || oldUser === newUser.username) {return};

    if((newUser.username).includes(config.Guild.Tag) && !user.roles.cache.has(config.Guild.TagRole)){
       
            await user.roles.add(config.Guild.TagRole);
            await user.setNickname((user.displayName).replace(config.Guild.Tag2, config.Guild.Tag));
        
    };

    if(!(newUser.username).includes(config.Guild.Tag) && user.roles.cache.has(config.Guild.TagRole)){
        
            await user.roles.remove(user.roles.cache.filter(r => r.position >= guild.roles.cache.get(config.Guild.TagRole).position));
            await user.setNickname((user.displayName).replace(config.Guild.Tag, config.Guild.Tag2)); 
       
    }
}