const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    let msg = message.content.split(' ')
    let ColorFile = JSON.parse(fs.readFileSync("./rainbow.json","utf8"));
    //if(message.author.id != '292675388180791297') return message.channel.send('Permission Denied');
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Permission Denied');

    code = msg[1]
    key = 1
    mod = 0;
    role = 'rainbow'
    spam = msg[2]
    if(!spam || spam<=0 || spam >= 5000) spam = 500


    let gRole = message.guild.roles.find(`name`,role);
    if(!gRole) return message.reply("Rainbow Role is Missing in this Server");

    if(!code) var ColorCode = Object.keys(ColorFile.random)
    switch()
    {
        case 'cop': var ColorCode = Object.keys(ColorFile.cop);
        break;
        case 'ranbom':  var ColorCode = Object.keys(ColorFile.random)
        break;
        case 'alien': var ColorCode = Object.keys(ColorFile.random)
        break;
        default : return message.channel.send(`${code} type doesn't exist!`);
    }
    if(code === 'cop') var ColorCode = Object.keys(ColorFile.cop)
    if(code === 'random') var ColorCode = Object.keys(ColorFile.random)
    if(code === 'alien') var ColorCode = Object.keys(ColorFile.alien)
    
    // if(code === 'stop') 

    //if(message.author.id != '292675388180791297') 
    {
        let user = message.guild
        let spaminterval = spam
            if (user.r1spam) {
                if (new Date().getTime() - user.r1spam < (spaminterval)*1000) {
                    message.channel.send('**Guild Rainbow Command Cooldown**\n*Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.r1spam) / 1000) * 100) / 100) + ' seconds*')
                    .then(msg => msg.delete(5000));
                    return;
                }
                else { user.r1spam = new Date().getTime();
                        setTimeout(function(){
                            Rcolor(mod,key,ColorCode,spam);
                            message.delete().catch();
                        },500)
                    }
            }
            else { user.r1spam = new Date().getTime();
                    setTimeout(function(){
                        Rcolor(mod,key,ColorCode,spam);
                        message.delete().catch();
                    },500)
                }
    }
    // else { 
    //     Rcolor(mod,key,ColorCode,spam);
    //     message.delete().catch();
    //  }
    console.log(`${role} Added Rainbow`)
    
    
    function Rcolor(mod,key,ColorCode,spam)
    {
            if(!ColorCode.length) return;
            path = mod%ColorCode.length
            newrole = gRole.edit({
                color: ColorCode[path]
            })
            mod = mod + 1;
            if(key < spam)
            {
                setTimeout(function()
                {
                    key = key + 1;
                    Rcolor(mod,key,ColorCode,spam)
                },2000);
            }
            else{ return console.log('Rainbow Will Stop soon') }
    }
}
module.exports.help = {
    name : "rainbow"
}
