const Discord = global.Discord = require("discord.js");
const config = global.config =  require("./config.json");
const client = global.client = new Discord.Client();
const mongoose = global.mongoose = require("mongoose");
const moment = global.moment = require("moment");
const fs = global.fs = require("fs");
const jaildocs = global.jaildocs = require("./Database/JailDocs");
const mutedocs = global.mutedocs = require("./Database/MuteDocs");
const bannedtag = global.bannedtag = require("./Database/BannedTag")
const welcome = global.welcome = new Discord.WebhookClient(config.Welcome.WebhookID, config.Welcome.WebhookToken);
const ban = global.ban = new Discord.WebhookClient(config.Ban.WebhookID, config.Ban.WebhookToken);
const mute = global.mute = new Discord.WebhookClient(config.Mute.WebhookID, config.Mute.WebhookToken);
const voicemute = global.voicemute = new Discord.WebhookClient(config.VoiceMute.WebhookID, config.VoiceMute.WebhookToken);
const jail = global.jail = new Discord.WebhookClient(config.Jail.WebhookID, config.Jail.WebhookToken);

require("./Util/eventLoader.js")(client);
require("./Util/commandLoader.js");

client.login(config.Bot.Token).then(x => console.log(`${client.user.tag}`)).catch(err => console.log(err.message));