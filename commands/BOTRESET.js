const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    //WARNING MOD USE ONLY
    admin = message.author.id;
    if(admin != '292675388180791297') return message.channel.send('You do Not have permission to use this command !')
    message.channel.send(':warning: BoT Database ERASED :warning:');
    user = JSON.parse(fs.readFileSync("./SUI.json","utf8"));
    var ref = firebase.database().ref('Container/bots')
    messageJSON = user['USER'];
    var payload1 = {}
    var payload2 = {}
    var message = messageJSON
    payload1['database'] = message
    ref.update(payload1);
    payload2['database/crates/BRZ'] = 0
    ref.update(payload2);

}

module.exports.help = {
    name : "BotResetAll"
}