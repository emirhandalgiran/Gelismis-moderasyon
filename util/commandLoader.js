global.commands = new global.Discord.Collection();
global.aliases = new global.Discord.Collection();


    global.fs.readdir("./Commands/", (err, files) => {
        if(err) console.log(err.message);
        files.forEach(f => {
            if(f.endsWith(".js")){
                global.fs.rename("./Commands/" + f, "./Commands/Developer" + f, err => console.log(err.message));
            } else
            global.fs.readdir("./Commands/" + f, (err2, files) => {
                if(err) console.log(err2.message);
                files.forEach(dir => {
                    if(!dir.endsWith(".js")) {return};
                    let props = require(`../Commands/${f}/${dir}`);

                    console.log(`|${f}/${dir}`);
                    if (props.onLoad) props.onLoad(global.client);
                    global.commands.set(props.help.name, props);
                    props.conf.aliases.forEach(alias => {
                    global.aliases.set(alias, props.help.name)
                    });
                });
            });
        });
    });

    global.elevation = message => {
        if (!message.guild) {return};
    
        let permlvl = 0;
        if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
        if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
        if (message.author.id === config.Bot.Owner) permlvl = 4;
        return permlvl};

    var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
    global.client.on('warn', e => {
        console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
    });
    global.client.on('error', e => {
        console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
    });