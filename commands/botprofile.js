const Discord = require("discord.js");
const firebase = require("firebase");

module.exports.run = async (bot,message,args) => {
    
    admin = message.author.id;
    if(admin != '292675388180791297') return message.channel.send('You do Not have permission to use this command !')
    let messageArray = message.content.split(' ');

    user = message.author
    spaminterval = 5
    if (user.a3spam) {
        if (new Date().getTime() - user.a3spam < spaminterval*1000) {
            message.channel.send('Spam Alert! Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.a3spam) / 1000) * 100) / 100) + ' seconds')
            .then(msg => msg.delete(2000));
            setTimeout(function(){},1000)
            return;
        }
        else { user.a3spam = new Date().getTime();
            Display_profile();}
    }
    else { user.a3spam = new Date().getTime();
        Display_profile();
    }


//Functiosns

function Display_profile()
{
    var UserRef = firebase.database().ref('Container/bots/database');
    UserRef.once('value',function(snap){
        var crys = snap.child('crystals').val();

        var C = snap.child('paints/C/ct').val();
        var U = snap.child('paints/U/ut').val();
        var R = snap.child('paints/R/rt').val();
        var E = snap.child('paints/E/et').val();
        var L = snap.child('paints/L/lt').val();
        var A = snap.child('paints/A/at').val();

        var BRZ = snap.child('crates/BRZ').val();
        var SIL = snap.child('crates/SIL').val();
        var GOL = snap.child('crates/GOL').val();
        var PLA = snap.child('crates/PLA').val();
        var DIA = snap.child('crates/DIA').val();

        TC = BRZ+SIL+GOL+PLA+DIA;
        TP = C+U+R+E+L+A;
        Uicon = bot.user.avatarURL;

        let Embed = new Discord.RichEmbed()
        .setAuthor('Game Stats')
        .setThumbnail(Uicon)
        .setColor('#ff2400')
        .addField('Inventory',`
-------------------------
**Crystals** : *${crys}*
**Total Crates** : *${TC}*
**Total Paints** : *${TP}*
-------------------------`)
        .addField('Paints',`
-------------------------
**Common** : *${C}*
**Uncommon** : *${U}*
**Rare** : *${R}*
**Epic** : *${E}*
**Legenday** : *${L}*
**Artefact** : *${A}*
`,true)
        .addField('Containers',`
-------------------------
**Bronze** : *${BRZ}*
`,true)

        .setFooter('Use $help to display all commands');

        return message.channel.send(Embed);
    })
}

}

module.exports.help = {
    name : "botprofile"
}