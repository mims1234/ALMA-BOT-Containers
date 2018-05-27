const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    


    let Uicon = message.member.user.avatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor("Bot Help")
    .setColor('#ff34b3')
    .addField("Bot Commands",`
**a$crates Bronze** -> *Opens Bronze Container*
*__Note__ : In case you dont have any request from MiMs*
\n**a$profile** -> *Displays your Profile*
\n**a$profile paints <type>** -> *Displays your Paints*
*__Note__ : Types : common | uncommon | rare | epic | legendary | artefact*`);

    return message.channel.send(botembed);

}

module.exports.help = {
    name : "help"
}