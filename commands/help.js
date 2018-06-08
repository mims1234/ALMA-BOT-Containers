const Discord = require("discord.js");

module.exports.run = async (bot,message,args) => {
    


    let Uicon = message.member.user.avatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor("Bot Help")
    .setColor('#ff34b3')
    .addField("Bot Commands",`
**$crates Bronze** -> *Opens Bronze Container*
*__Note__ : In case you dont have any request from MiMs*
\n**$profile** ->*Displays your Profile*
\n**$profile paints <type>** ->*Displays your Paints*
*__Note__ : Types : common | uncommon | rare | epic | legendary | artefact*
\n**$profile preview <type> <paint-name>** ->*Displays the paint if owned*
*__Note__ : Types : common | uncommon | rare | epic | legendary | artefact*
*__Note__ : Paints ex : Green | Space | Frost and etc*`);

    return message.channel.send(botembed);

}

module.exports.help = {
    name : "help"
}
