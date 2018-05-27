const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    //uicon = message.user.avatarURL;
   

    new_code = Math.floor(Math.random() * 10)+1;
    if(new_code <=0){new_code = 1 }
     

    let embed1 = new Discord.RichEmbed()
    .setAuthor('Grey')
    .setColor('#adabab')
    let embed2 = new Discord.RichEmbed()
    .setAuthor('Blue')
    .setColor('#4040f9')
    let embed3 = new Discord.RichEmbed()
    .setAuthor('Green')
    .setColor('#7fff00 ') //01ff01->Acid Green
    let embed4 = new Discord.RichEmbed()
    .setAuthor('Gold')
    .setColor('#ffdf33 ')
    let embed5 = new Discord.RichEmbed()
    .setAuthor('Red')
    .setColor('#ff2400 ')
    let embed6 = new Discord.RichEmbed()
    .setAuthor('Violet')
    .setColor('#b701b7 ')
    let embed7 = new Discord.RichEmbed()
    .setAuthor('Pink')
    .setColor('#ff34b3 ') //e856e8 -> Pink

    message.channel.send(embed1)
    message.channel.send(embed2)
    message.channel.send(embed3)
    message.channel.send(embed4)
    message.channel.send(embed5)
    message.channel.send(embed6)
    message.channel.send(embed7)

}

module.exports.help = {
    name : "update"
}