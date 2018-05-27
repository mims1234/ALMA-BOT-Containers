//ALMA BOT Code
const BotPrefix = require("./prefix.json");
const BotTokenFile = require("./token.json");
const Discord = require("discord.js");

var firebase = require(`firebase`);

firebase.initializeApp({
    serviceAccount:"./mims-firebase-service-test.json",
    databaseURL: "https://mims-project.firebaseio.com/"
})

const fs = require("fs");
const ms = require("ms");

let profile = JSON.parse(fs.readFileSync("./garage.json","utf8"));

const bot =  new Discord.Client();
bot.commands = new Discord.Collection();

//Data Base Storage .JSON Files
fs.readdir("./commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./commands/${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
    })
});

//Bot Start
bot.on("ready" , async () => {
    console.log(`${bot.user.username} is online !`);
    if(!bot.on) return console.log("nodemon index.js")
    bot.user.setActivity("your Future", {type :"WATCHING"});
});

//Bot Message input initiation
bot.on("message", async message => {
    //if(message.author.bot) return;
    if(message.channel.type === "dm") return;

let prefix = BotPrefix.prefix;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

//Prefix Checker for Folder commands
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }

    if(cmd === `zsay`)
    {
        let botmessage = args.join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
    }
});
//Key To Run BOT
bot.login(BotTokenFile.token);