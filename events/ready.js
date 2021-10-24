const config = require("../config.json");
module.exports = client => {
client.user.setPresence({ activity: {name: config.Ready.Ready, type: config.Ready.Type,}, status: config.Ready.Status}).catch(err => console.log(err.message))
client.channels.cache.get(global.config.Ready.Voice).join().catch(err => console.log(err.message))
global.mongoose.connect(config.Mongoose.URL, { useNewUrlParser: true, useUnifiedTopology: true, }).then(x => console.log(`${config.Mongoose.Message}\n————————————`)).catch(err => console.log(err.message)); global.mongoose.set("useFindAndModify", false); 
};