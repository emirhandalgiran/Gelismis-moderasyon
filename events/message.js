module.exports = message => {
  let talkedRecently = new Set();
  if (talkedRecently.has(message.author.id)) {return}; talkedRecently.add(message.author.id);
	setTimeout(() => { talkedRecently.delete(message.author.id); }, 0);
  if(message.content.toLowerCase() == `${config.Bot.Prefix}tag`) { message.channel.send(`${config.Guild.Tag}`) }; 
  if(message.content.toLowerCase() == `${config.Bot.Prefix}link`) { message.channel.send(`${config.Guild.Link}`) };
  if (message.author.bot) {return}; if (!message.content.startsWith(global.config.Bot.Prefix)) {return};
  let client = message.client; let cmd;
  let command = message.content.split(' ')[0].slice(global.config.Bot.Prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = global.elevation(message);
  if (global.commands.has(command)) { cmd = global.commands.get(command); 
  } else if (global.aliases.has(command)) {
  cmd = global.commands.get(global.aliases.get(command));}
  if (cmd) { if (perms < cmd.conf.permLevel) {return}; cmd.run(client, message, params, perms); }
};