const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    //Intitlization 
    //let newProfile = new Set();
    User = JSON.parse(fs.readFileSync("./SUI.json","utf8"));
    let messageArray = message.content.split(' ');

    // 1)Compare if USER_EXIST
    Current_User = message.member.id;
    var MsgRef = firebase.database().ref('users/database/'+Current_User)
    MsgRef.once('value',function(snap){
        var user_id = snap.child('user_id').val()
        console.log(`USER ID:`+user_id)
        if(user_id === null)
        {
            var ref = firebase.database().ref('users/database')
            messageJSON = User['USER'];
            var payload1 = {}
            var payload = {}
            var message = messageJSON
            payload1[Current_User] = message
            ref.update(payload1);
            payload[Current_User+'/user_id'] = Current_User
            ref.update(payload);
        } 
    })

        setTimeout(function(){
            var info = messageArray[1];
            var Cinfo2 = messageArray[2];
            if(!info) info = 'nothing'
            if(!Cinfo2) Cinfo2 = 'nothing'
            info2 = Cinfo2.toLowerCase();
            Linfo = info.toLowerCase();
            switch(Linfo)
            {
                case 'paints':  user = message.author
                                spaminterval = 1
                                    if (user.dspam) {
                                        if (new Date().getTime() - user.dspam < spaminterval*1000) {
                                            message.channel.send('Spam Alert! Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.dspam) / 1000) * 100) / 100) + ' seconds')
                                            .then(msg => msg.delete(2000));
                                            setTimeout(function(){
                                                message.delete();
                                            },1000)
                                            return;
                                        }
                                        else { user.dspam = new Date().getTime();
                                            Display_paints(info2);}
                                    }
                                    else { user.dspam = new Date().getTime();
                                        Display_paints(info2);}
       
                break;
                case 'preview': var info3 = messageArray[3];
                                if(!info3 || info3 === ' ') return message.channel.send('<paint_name> was missing !?\n\n `a$profile preview <type> <paint_name>`')
                                var Ninfo3 = info3.toLowerCase()
                                var Linfo3 = info3[0].toUpperCase()+Ninfo3.slice(1);
                                user = message.author
                                spaminterval = 1
                                    if (user.cspam) {
                                        if (new Date().getTime() - user.cspam < spaminterval*1000) {
                                            message.channel.send('Spam Alert! Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.cspam) / 1000) * 100) / 100) + ' seconds')
                                            .then(msg => msg.delete(2000));
                                            setTimeout(function(){
                                                message.delete();
                                            },1000)
                                            return;
                                        }
                                        else { user.cspam = new Date().getTime();
                                            Preview_paints(info2,Linfo3);}
                                    }
                                    else { user.cspam = new Date().getTime();
                                        Preview_paints(info2,Linfo3);}

                break;
                default:user = message.author
                        spaminterval = 30
                        //if(info2) return message.channel.send('Command : `a$profile`<-(~No Spaces)~')
                        if (user.bspam) {
                            if (new Date().getTime() - user.bspam < spaminterval*1000) {
                                message.channel.send('Spam Alert! Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.bspam) / 1000) * 100) / 100) + ' seconds')
                                .then(msg => msg.delete(2000));
                                setTimeout(function(){
                                    message.delete();
                                },1000)
                                return;
                            }
                            else { user.bspam = new Date().getTime();
                                Display_profile();}
                        }
                        else { user.bspam = new Date().getTime();
                            Display_profile();}
            }
        },2000);
    
//Functiosns

    function Display_profile()
    {
        var UserRef = firebase.database().ref('users/database/'+Current_User);
        UserRef.once('value',function(snap){
            var crys = snap.child('crystals').val();
            var TC = snap.child('total_crates').val();
            var TP = snap.child('total_paints').val();

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

            Uicon = message.member.user.avatarURL;
            Uname = message.member.displayName;

            let Embed = new Discord.RichEmbed()
            .setAuthor(Uname+' Profile')
            .setThumbnail(Uicon)
            .setColor('#00bca3')
            .addField('Inventory',`
**Crystals** : *${crys}*
**Total Crates** : *${TC}*
**Total Paints** : *${TP}*
-------------------------`)
            .addField('Paints',`
**Common** : *${C}*
**Uncommon** : *${U}*
**Rare** : *${R}*
**Epic** : *${E}*
**Legenday** : *${L}*
**Artefact** : *${A}*
-------------------------`)
            .addField('Containers',`
**Bronze** : *${BRZ}*
**Silver** : *${SIL}*
**Gold** : *${GOL}*
**Platinum** : *${PLA}*
**Diamond** : *${DIA}*
-------------------------`);

            return message.channel.send(Embed);
        })
    }

    function Display_paints(code)
    {
        if(code === 'common'||code === 'uncommon'||code === 'rare'||code === 'epic'||code === 'legendary'||code === 'artefact')
        {
            if(!code) return message.channel.send('Type Not mentioned')

            if(code === 'common') num = 61, cat ='C' ;
            if(code === 'uncommon') num = 12, cat ='U';
            if(code === 'rare') num = 10, cat ='R';
            if(code === 'epic') num = 2, cat ='E';
            if(code === 'legendary') num = 2, cat ='L';
            if(code === 'artefact') num = 0, cat ='A';

    
            Lcat = cat.toLowerCase();

            var c = [];
            var d = [];
            j=1;
            var UserPaintRef = firebase.database().ref('users/database/'+Current_User)
            UserPaintRef.once('value',function(snap){

                for(var i=1;i<=num;i++)
                {
                    var a = snap.child('paints/'+cat+'/'+Lcat+i).val()
                    var b = Lcat+i;
                    if(a>=1)
                    {
                        c[j] = a
                        d[j] = b
                        j=j+1;
                    }
                }
                var name = [],URL = [],amount = [];
                //console.log(d)
                setTimeout(function(){
                    var PaintRef = firebase.database().ref('paints/database/')
                    PaintRef.once('value',function(snap){
                        for(j=1;j<=(d.length-1);j++)
                        {
                            name[j] = snap.child(cat+'/'+d[j]+'/name').val();
                            URL[j] = snap.child(cat+'/'+d[j]+'/URL').val();
                            amount[j] = c[j];
                        }
                        // message.channel.send('message')
                        msg = `Type : ${category}\n`
                        for(var i=1;i<=name.length-1;i++)
                        {
                            msg = msg + '\n'+name[i]+' = '+amount[i]
                        } 
                        if(name.length === 0) return message.channel.send('You have no paint of this type')
                        message.channel.send('```prolog\n'+msg+'```')
                    
                    })
                },100)
            })
        }
        else
        {   return message.channel.send('Please Mention which Category : \n\n`Common`\n`Uncommon`\n`Rare`\n`Epic`\n`Legendary`\n`Artefact`')}
    }

    function Preview_paints(code1,code2)
    {
        user = message.author.id
        if(code1 === 'common'||code1 === 'uncommon'||code1 === 'rare'||code1 === 'epic'||code1 === 'legendary'||code1 === 'artefact')
        {
            if(code1 === 'common') num = 61, cat ='C' ;
            if(code1 === 'uncommon') num = 12, cat ='U';
            if(code1 === 'rare') num = 10, cat ='R';
            if(code1 === 'epic') num = 2, cat ='E';
            if(code1 === 'legendary') num = 2, cat ='L';
            if(code1 === 'artefact') num = 0, cat ='A';

            Lcat = cat.toLowerCase();

            var c = []
            var d = []
            var j = 1;
            var PaintPreviewRef = firebase.database().ref('paints/database/'+cat)
            PaintPreviewRef.once('value',function(snap){
                key = 0
                for(var i=1;i<=num;i++)
                {
                    var a =snap.child(Lcat+i+'/name').val();
                    var b = Lcat+i;
                    if(a!= null)
                    {
                        if(code2 === a)
                        {   
                            var key = 1;
                            var PaintName = a
                            var PaintID = b;
                            var PaintURL = snap.child(Lcat+i+'/URL').val();
                            var UserPreviwRef = firebase.database().ref('users/database/'+user)
                            UserPreviwRef.once('value',function(snap){
                                    var PaintAmount = snap.child('paints/'+cat+'/'+PaintID).val()
                                    if(PaintAmount>0)
                                    {
                                        let Embed = new Discord.RichEmbed()
                                        .setAuthor('Paint Preview')
                                        .setImage(PaintURL)
                                        .addField(PaintName,`\n**You have ${PaintAmount} ${PaintName} Paint**`);
                                        return message.channel.send(Embed);
                                    }
                                    else{ return message.channel.send(`**You don't have ${PaintName} Paint**`) }
                            })
                        }
                    }
                } 
                setTimeout(function(){if(key === 0)return message.channel.send(`${code2} paint doesn't exist in this type`)},1)

            })
        }
        else {return message.channel.send('Please Mention Exisiting Category : \n\n`Common`\n`Uncommon`\n`Rare`\n`Epic`\n`Legendary`\n`Artefact`\n\n***__'+code1+`__***  **type doesn't exist!!**`)}

        
    }

 
}

module.exports.help = {
    name : "profile"
}