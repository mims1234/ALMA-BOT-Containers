const Discord = require("discord.js");
const firebase = require("firebase");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    
    //Intitlization 
    userEntry = JSON.parse(fs.readFileSync("./SUI.json","utf8"));
    let messageArray = message.content.split(' ');

    // 1)Compare if USER_EXIST
    Current_User = message.member.id;
    var MsgRef = firebase.database().ref('users/database/'+Current_User)
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
                var ref = firebase.database().ref('users/database')
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
            Ncrate_name = crate_name.toLowerCase();
            Lcrate_name = Ncrate_name[0].toUpperCase() + Ncrate_name.slice(1)
            switch(Lcrate_name)
            {
                case `Bronze`:   num = 100
                                code = Math.floor(Math.random() * num)+1
                                var pin = Crates(80,16,3.2,0.64,0.128,num,code);
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
                default:    message.channel.send('`Reached Default`');
            }
        }

        ////FUNCTIONS & CLASS
        function Embed(Paint_NameU,Paint_URL,Paint_TypeU,Paint_id,Amount,HexID){
            let newEmbed = new Discord.RichEmbed()
            .setAuthor(`Container Opening`)
            .setColor(HexID)
            .addField(`Paint Info`,`
    **Name**  ${Paint_NameU}
    **Type**    ${Paint_TypeU}
    **Amount** ${Amount}
    **ID**         ${Paint_id}`)
            .setImage(Paint_URL)
            //.addField(`Paint URL`,`***${Paint_URL}***`);

            message.channel.send(newEmbed);
        }
    

    function Picker(Upin,pin,user_id,Crate_Name)
    {
        point = Category_Length(pin);
        HexID = HexColor(Upin);

        var PaintRef = firebase.database().ref('paints/database'+`/${Upin}`).child(`${pin}${point}`);
        PaintRef.once('value',function(snap){
            var Paint_Name = snap.child('name').val()
            var Paint_URL = snap.child('URL').val()
            var Paint_Type = snap.child('type').val()
            var Paint_id = snap.child('id').val()

            setTimeout(function(){
            var Paint_NameU = Paint_Name[0].toUpperCase() + Paint_Name.slice(1);
            var Paint_TypeU = Paint_Type[0].toUpperCase() + Paint_Type.slice(1);

                //BOT PROFILE 
                var botDRef = firebase.database().ref('bots/database/');
                botDRef.once('value',function(snap){
                    sum = snap.child('paints/'+Upin+'/'+pin+point).val()
                    TP = snap.child('total_paints').val()
                    pin_sum = snap.child('paints/'+Upin+'/'+pin+'t').val();
                    TP = TP + 1;
                    sum = sum + 1;
                    pin_sum = pin_sum + 1;
                    setTimeout(function(){
                        botURef = firebase.database().ref('bots/database/');
                        var payload3 = {}
                        var payload4 = {}
                        payload3['paints/'+Upin+'/'+pin+point] = sum
                        payload3['total_paints'] = TP;
                        payload4['paints/'+Upin+'/'+pin+'t'] = pin_sum
                        botURef.update(payload3);
                        botURef.update(payload4);
                    },1000);
                })

                //USER PROFILE
                var userDRef = firebase.database().ref('users/database/'+user_id);
                userDRef.once('value',function(snap){
                    var sum = snap.child('paints/'+Upin+'/'+pin+point).val()
                    var TP = snap.child('total_paints').val()
                    var pin_sum = snap.child('paints/'+Upin+'/'+pin+'t').val();
                    var Crate_check = snap.child('crates/'+Crate_Name).val();
                    if(Crate_check <= 0) return message.channel.send(`**You dont have enough** :package: **${Lcrate_name} Container :package:** `);
                    TP = TP + 1;
                    sum = sum + 1;
                    pin_sum = pin_sum + 1;
                    setTimeout(function(){
                        Crate_check = Crate_check - 1;
                        userURef = firebase.database().ref('users/database/'+user_id)
                        var payload3 = {};
                        var payload4 = {}
                        payload3['paints/'+Upin+'/'+pin+point] = sum;
                        payload3['total_paints'] = TP;
                        payload4['paints/'+Upin+'/'+pin+'t'] = pin_sum
                        payload3['crates/'+Crate_Name] = Crate_check
                        userURef.update(payload3);
                        userURef.update(payload4);
                    },1000);

                    //Display Embed
                    //console.log(point)
                    Embed(Paint_NameU,Paint_URL,Paint_TypeU,Paint_id,sum,HexID);
                });
            },100);
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

    function Crates(CR,UR,RR,ER,LR,num,code)
    {

            var sum = CR+UR+RR+ER+LR;
            // console.log(sum)
            if(sum>100) return ;
            
            //c = Randomizer(CR,num)
            u = Randomizer(UR,num)
            r = Randomizer(RR,num)
            e = Randomizer(ER,num)
            l = Randomizer(LR,num)
        
            //message.channel.send('c :\n'+c)
            //  message.channel.send('u :\n'+u)
            //  message.channel.send('r :\n'+r)
            //  message.channel.send('e :\n'+e)
            //  message.channel.send('l :\n'+l)
            //  message.channel.send('code :\n'+code)

            for(i=0;i<l.length;i++) {if(code === l[i]) { return "l"}}
            for(i=0;i<e.length;i++) {if(code === e[i]) { return "e"}}
            for(i=0;i<r.length;i++) {if(code === r[i]) { return "r"}}
            for(i=0;i<u.length;i++) {if(code === u[i]) { return "u"}} 
            return "c";

    }

    function Randomizer(Rate,num)
    {
        Category = Math.ceil((Rate/100) * num);
        if(Category === 0) return total = 0
        total = [];
        for(i=1;i<=Category;i++) { total[i] = Random = Math.floor(Math.random() * num);}
        return total
    }

    function HexColor(Upin)
    {
        switch(Upin)
        {
            case 'C': return '#adabab' //Grey
            break;
            case 'U': return '#4040f9'  //Blue
            break;
            case 'R': return '#7fff00'  //Green
            break;
            case 'E': return '#ffdf33'  //Gold
            break;
            case 'L': return '#ff2400'  //Red
            break;
            case 'A': return '#ff34b3'  //Pink
            break;
            case 'S': return '#b701b7'  //Violet
        }
    }


}

module.exports.help = {
    name : "crates"
}
