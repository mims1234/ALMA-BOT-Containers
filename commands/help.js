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
*__Note__ : Paints ex : Green | Space | Frost and etc*`)
    .addBlankField()
    .addField('Premium Trial Commands [ BETA TESTING ]',`
\n**$rainbow <type>**:
*Changes role colors every 2 secs in a certain available patterns*\n
**Instructions :**\n
*#1 Create a role named ALMA make sure it has ADMIN Permission and default role color*\n
*#2 Craate a role named rainbow make sure it has no Permissions at all and has defualt role color*\n
*#3 Now make ALMA role highest Ranked Role in the Server and just below that should be rainbow role*\n
*#4 Now just add the rainbow role to the member you want to have rainbow colored roles* :)\n
*#5 Simple as that now you use the command with these custom types -> cop | rainbow | alien [NOTE: LowerCase Only]*\n
**#NOTE You cannot change or stop this command untill 500 Secs**
    `);

    return message.channel.send(botembed);

}

module.exports.help = {
    name : "help"
}
