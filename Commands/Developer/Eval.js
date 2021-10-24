const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, message, args,) => {
  if(!config.Bot.Owner.includes(message.author.id)) {return};
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send((evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`\n${err}\n\`\`\``);
    }
  }

exports.help = { name: "eval" }

exports.conf = { aliases: ["eval"] };