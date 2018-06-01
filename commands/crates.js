const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    //Intitlization 
    userEntry = JSON.parse(fs.readFileSync("./SUI.json","utf8"));
    let messageArray = message.content.split(' ');

    // 1)Compare if USER_EXIST
    Current_User = message.member.id;
    var MsgRef = firebase.database().ref('Container/users/database/'+Current_User)
    let user = message.author
    let spaminterval = 10
        if (user.aspam) {
            if (new Date().getTime() - user.aspam < spaminterval*1000) {
                message.channel.send('Spam Alert! Wait for: ' + Math.floor(Math.round((spaminterval - (new Date().getTime() - user.aspam) / 1000) * 100) / 100) + ' seconds')
                .then(msg => msg.delete(2000));
                return;
            }
            else { user.aspam = new Date().getTime();
                    RunCommand();}
        }
        else { user.aspam = new Date().getTime();
                    RunCommand();}

    function RunCommand()
    {
        MsgRef.once('value',function(snap){
            var user_id = snap.child('user_id').val()
            console.log(`USER ID:`+user_id)
            if(user_id === null)
            {
                var ref = firebase.database().ref('Container/users/database')
                messageJSON = userEntry['USER'];
                var payload1 = {}
                var payload = {}
                var message = messageJSON
                payload1[Current_User] = message
                ref.update(payload1);
                payload[Current_User+'/user_id'] = Current_User
                ref.update(payload);
            } 
        })        
            // 2)Compare the crate choose
            var crate_name = messageArray[1];
            if(!crate_name) return message.channel.send('`Please Mention a Container Name : "Bronze"`')
            Ncrate_name = crate_name.toLowerCase();
            Lcrate_name = Ncrate_name[0].toUpperCase() + Ncrate_name.slice(1)
            switch(Lcrate_name)
            {
                case `Bronze`:  
                                var pin = Crates(1,7,40,180,500,null); //Refer Crate_Perc.txt
                                if(pin != null)
                                {
                                    var Upin = pin.toUpperCase();
                                    Picker(Upin,pin,Current_User,'BRZ');

                                }
                                else 
                                {
                                return message.reply('Else Reached')//message.channel.send(`**You dont have enough** :package: **${Lcrate_name} Container :package:** `);
                                }
                                
                break;
                default:    message.channel.send('`Such Container Doesnt Not Exist`');
            }
        }

    ////FUNCTIONS & CLASS
    function Embed(PaintNameU,PaintURL,PaintTypeU,PaintID,UserPaint,HexID){
        let newEmbed = new Discord.RichEmbed()
        .setAuthor(`${Lcrate_name} Container`)
        .setColor(HexID)
        .addField(`Congratulations ${message.member.displayName}, You got ${PaintNameU} Paint (${PaintTypeU})`,`**You have ${UserPaint} of these** `)
        .setImage(PaintURL);
        //.addField(`Paint URL`,`***${Paint_URL}***`);

        message.channel.send(newEmbed);
    }
    
    function Picker(Upin,pin,userID,Crate_Name)
    {
        point = Category_Length(pin);
        HexID = HexColor(Upin);

        var ALMA = firebase.database().ref('Container');
        var payload1 = {}
        var payload2 = {}
        var payload3 = {}
        ALMA.once('value',function(snap){

            //Retrive Data
            var PaintName = snap.child('paints/database/'+Upin+'/'+pin+point+'/name').val()
            var PaintURL = snap.child('paints/database/'+Upin+'/'+pin+point+'/URL').val()
            var PaintType = snap.child('paints/database/'+Upin+'/'+pin+point+'/type').val()
            var PaintID = snap.child('paints/database/'+Upin+'/'+pin+point+'/id').val()
            var BotPaint = snap.child('bots/database/paints/'+Upin+'/'+pin+point).val()
            var BotTotalPaints = snap.child('bots/database/paints/'+Upin+'/'+pin+'t').val();
            var UserPaint = snap.child('users/database/'+userID+'/paints/'+Upin+'/'+pin+point).val()
            var UserTotalPaints = snap.child('users/database/'+userID+'/paints/'+Upin+'/'+pin+'t').val();
            var UserCrates = snap.child('users/database/'+userID+'/crates/'+Crate_Name).val();

            if(UserCrates <= 0) return message.channel.send(`**You dont have enough** :package: **${Lcrate_name} Container :package:** `);
            
            var PaintNameU = PaintName[0].toUpperCase() + PaintName.slice(1);
            var PaintTypeU = PaintType.toUpperCase();

            //Modify Data
            BotPaint = BotPaint + 1;
            BotTotalPaints = BotTotalPaints + 1;
            UserPaint = UserPaint + 1;
            UserTotalPaints = UserTotalPaints + 1;
            UserCrates = UserCrates - 1;

            //Load in Modified Data
            payload1['bots/database/paints/'+Upin+'/'+pin+point] = BotPaint
            payload2['bots/database/paints/'+Upin+'/'+pin+'t'] = BotTotalPaints
            payload1['users/database/'+userID+'/paints/'+Upin+'/'+pin+point] = UserPaint;
            payload2['users/database/'+userID+'/paints/'+Upin+'/'+pin+'t'] = UserTotalPaints
            payload3['users/database/'+userID+'/crates/'+Crate_Name] = UserCrates

            //Update Data
            ALMA.update(payload1)
            ALMA.update(payload2)
            ALMA.update(payload3)

            //Display Embed
            //console.log(point)
            Embed(PaintNameU,PaintURL,PaintTypeU,PaintID,UserPaint,HexID);
        })
    }

    function Category_Length(pin)
    {
        if(pin ==='c')
        {   
            new_code = Math.floor(Math.random() * 61)+ 1;
            if(new_code <=8){new_code = 8 }
            return new_code;
        }
        if(pin === 'u')
        {
            new_code = Math.floor(Math.random() * 12)+ 1;
            if(new_code <=1){new_code = 1 }
            return new_code;
        }
        if(pin ==='r')
        {
            new_code = Math.floor(Math.random() * 10)+ 1;
            if(new_code <=1){new_code = 1 }
            return new_code;
        }
        if(pin === 'e')
        {
            new_code = Math.floor(Math.random() * 2)+1;
            if(new_code <=1){new_code = 1 }
            return new_code;
        }
        if(pin === 'l')
        {
            new_code = Math.floor(Math.random() * 2)+1;
            if(new_code <=1){new_code = 1 }
            return new_code;
        }

    }

    function Crates(CR,UR,RR,ER,LR,AR)
    {
        code = Math.round(Math.random() * 10000)+1
        if(code%AR === 0) return 'a'  
        if(code%LR === 0) return 'l'  
        if(code%ER === 0) return 'e' 
        if(code%RR === 0) return 'r'  
        if(code%UR === 0) return 'u'  
        if(code%CR === 0) return 'c'  
    }

    function HexColor(Upin)
    {
        if(Upin === 'C') return '#adabab'  //Grey
        if(Upin === 'U') return '#4040f9'  //Blue
        if(Upin === 'R') return '#7fff00'  //Green
        if(Upin === 'E') return '#ffdf33'  //Gold
        if(Upin === 'L') return '#ff2400'  //Red
        if(Upin === 'A') return '#ff34b3'  //Pink
        if(Upin === 'S') return '#b701b7'  //Violet  
    }

}

module.exports.help = {
    name : "crates"
}