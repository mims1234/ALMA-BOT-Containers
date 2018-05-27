const Discord = require("discord.js");
const firebase = require("firebase")

module.exports.run = async (bot,message,args) => {
    
    admin = message.author.id;
    if(admin != '292675388180791297') return message.channel.send('You do Not have permission to use this command !')
    let Player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    messageArray = message.content.split(" ");
    //console.log(messageArray)
    code = messageArray[2];

    if(!code) return message.channel.send('Pleae Select an Option')
    switch(code)
    {
        case "view" : ViewCrate(Player.id,Player);
        break;
        case "add" :  code1 = messageArray[3];
                      code2 = parseInt(messageArray[4]);
                      if(code1 === 'BRZ'||code1 === 'SIL'||code1 === 'GOL'||code1 === 'PLA'||code1 === 'DIA')
                      {
                        if(code2 >0 && code2 <=100) AddCrate(Player.id,Player,code1,code2);
                        else message.channel.send('Range 0 : 100')
                      }
                      else message.channel.send('Must be BRZ / SIL / GOL / PLA / DIA');
        break;
        case "remove" : code1 = messageArray[3];
                        code2 = parseInt(messageArray[4]);
                        if(code1 === 'BRZ'||code1 === 'SIL'||code1 === 'GOL'||code1 === 'PLA'||code1 === 'DIA')
                        {
                          if(code2 >0 && code2 <=100) RemoveCrate(Player.id,Player,code1,code2);
                          else message.channel.send('Range 0 : 100')
                        }
                        else message.channel.send('Must be BRZ / SIL / GOL / PLA / DIA');
        break;
        default : message.channel.send("`Reached Default")
    }
    
    //FUNCTIONS

    // var userRef = firebase.database().ref('users/database/'+Player)
    // ref = firebase.database().ref('users/database/'+Player)

    function RemoveCrate(Player,userPlayer,code1,code2)
    {
        //message.channel.send(code2+' '+code1+' removed succesfully')
        var userRef = firebase.database().ref('users/database/'+Player)
        userRef.once('value',function(snap){
        var sum = snap.child('crates/'+code1).val();
        sum = sum - code2
        //console.log(sum)
        if(sum<0) return message.channel.send('Reached 0 Containers , cannot remove '+code2+'more Containers');
        message.channel.send(code2+' '+code1+' removed succesfully')
            //setTimeout(function(){
                ref = firebase.database().ref('users/database/'+Player)
                var payload = {}
                payload['crates/'+code1] = sum;
                ref.update(payload);
            //},100)
        })
    }

    function AddCrate(Player,userPlayer,code1,code2)
    {
        message.channel.send(code2+' '+code1+' added succesfully')
        var userRef = firebase.database().ref('users/database/'+Player)
        userRef.once('value',function(snap){
        var sum = snap.child('crates/'+code1).val();
        sum = sum + code2
        //console.log(sum)
            //setTimeout(function(){
                ref = firebase.database().ref('users/database/'+Player)
                var payload = {}
                payload['crates/'+code1] = sum;
                ref.update(payload);
            //},100)
        })
    }

    function ViewCrate(Player,userPlayer)
    {
        var userRef = firebase.database().ref('users/database/'+Player)
        userRef.once('value',function(snap){
            var BRZ = snap.child('crates/BRZ').val()
            var SIL = snap.child('crates/SIL').val()
            var GOL = snap.child('crates/GOL').val()
            var PLA = snap.child('crates/PLA').val()
            var DIA = snap.child('crates/DIA').val()

            let Embed = new Discord.RichEmbed()
            .setAuthor(userPlayer.displayName+' Crates Inventory')
            .addField('List',`
**BRONZE**   : ${BRZ}
**SILVER**   : ${SIL} 
**GOLD**     : ${GOL} 
**PLATINUM** : ${PLA} 
**DIAMOND**  : ${DIA}  
`);
            
            return message.channel.send(Embed);
        })


    }
}

module.exports.help = {
    name : "AdminCrates"
}