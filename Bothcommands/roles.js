const botconfig = require("../botconfig.json");
const authentication = require("../authentication"); //Imports functions from authentication file
const functions = require("../functions.js")
//ID's of all rank roles
const hustlerID = "488021473361920010"
const pickpocketID = "488021509458362368"
const thiefID = "488021491649085441"
const lawlessID = "488021525233139724"
const mastermindID = "488021546036625414"
const overlordID = "526214202621427724"
const rtsfamilyID = "526160668882239508"
const initiateID = "453564342290612251"
const leadfootID = "453564406673047552"
const wheelman = "453564426302390284"
const legendaryID = "453564453628280835"
const speeddemonID = "453564481075806219"
const pigsfamilyID = "526203890639699968"

module.exports.run = async (bot, message, args) => {
    if (message) { //if theres a message
        var person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.member); //get person by first mention or first arg or message author
        if (message.guild.id == botconfig.PIGSServer) {
            var alwaysKeep = ["576784981024571412", "487288337065836558", "572838338470346757", "546071134961926148", "529644127734988821", "539250396653289492", "518527151960752131", "520761019841118219", "511347144683290624", "498885132468486175", "495359477701410816", "493805677546831872", "511148681681174528", "487289181685678090", "491992119049977867", "490261228585746433", "526107078838714368", "489242068770619403", "510237061719261194", "513844670611193866", "516802932260470825", "516803056222994442", "487288297421406208", "487623401247342613", "492446479554838528", "487286418855428096", "495650147754311690", "499007548993568768", "487289216968032256", "539240789809692691", "501822882071052308", "530765121522499584", "487286138529120256"]
            var employeeID = "562991083882151937"
            var GuestRole = botconfig.PIGSGuestRole
            var MainSheet = botconfig.PIGSSheet
            var EmployeeRange = botconfig.PIGSEmployeeRange
            var DiscordIndex = botconfig.PIGSEmployeeRangeDiscordIndex
            var DeadlineIndex = botconfig.PIGSEmployeeRangeDeadlineIndex
            var InactiveRole = botconfig.PIGSInavtiveRole
            var InGameNameIndex = botconfig.PIGSEmployeeRangeInGameNameIndex
            var RankIndex = botconfig.PIGSEmployeeRangeRankIndex
            var OtherSheet = botconfig.RTSSheet
            var OtherRange = botconfig.RTSEmployeeRange
            var OtherDiscordIndex = botconfig.RTSEmployeeRangeDiscordIndex
            var FamilyID = rtsfamilyID
        } else if (message.guild.id == botconfig.RTSServer) {
            var alwaysKeep = ["453982220907184128", "503224065906180106", "529643022866972684", "472023222674784259", "481486784858030090", "480730660105879580", "479082117154996235", "478955377619370004", "478393923656482827", "478393609540861952", "477115908888723467", "475029760930611200", "475393112915574821", "472386249341272064", "449404264545255446", "471671084392120351", "454190936843354113", "454474803529646111", "477463794965020673", "453917732254121997", "458376796921004052", "453570994985238528", "448681738953162752", "453563912097497110", "472143712655245322", "482902573179731969", "447493627791409173", "453999831434919948", "453744160923713548", "472133586745688075", "455014608810541068", "472145541091033123", "447494569173712898"]
            var employeeID = "483297370482933760"
            var GuestRole = botconfig.RTSGuestRole
            var MainSheet = botconfig.RTSSheet
            var EmployeeRange = botconfig.RTSEmployeeRange
            var DiscordIndex = botconfig.RTSEmployeeRangeDiscordIndex
            var DeadlineIndex = botconfig.RTSEmployeeRangeDeadlineIndex
            var InactiveRole = botconfig.RTSInavtiveRole
            var InGameNameIndex = botconfig.RTSEmployeeRangeInGameNameIndex
            var RankIndex = botconfig.RTSEmployeeRangeRankIndex
            var OtherSheet = botconfig.PIGSSheet
            var OtherRange = botconfig.PIGSEmployeeRange
            var OtherDiscordIndex = botconfig.PIGSEmployeeRangeDiscordIndex
            var FamilyID = pigsfamilyID
        }
    } else {
        return;
    }

    await person.roles.forEach(async element => { //go through all roles
        if (!alwaysKeep.includes(element.id)) await person.removeRole(element.id) //If the current role isn't in the always keep array then remove it 
    });

    await person.addRole(GuestRole) //add guest role

    async function getPIGSemployees(auth) {
        if (message) { //if theres a message
            var MemberDetails = await functions.GetMemberDetails(auth, MainSheet, EmployeeRange, DiscordIndex, person.id, message.channel) //get member details with message.channel
        } else {
            var MemberDetails = await functions.GetMemberDetails(auth, MainSheet, EmployeeRange, DiscordIndex, person.id, null) //no message.channel
        }

        if (MemberDetails) { //if member is hired
            const D1 = new Date(MemberDetails[DeadlineIndex]) //check deadline
            const D2 = new Date()
            const D3 = D2 - D1 //difference between two dates
            if (D3 <= 0) { //if its not past their deadline
                if (person.roles.has(InactiveRole)) person.removeRole(InactiveRole) //if they have inactive role remove it
            } else { //past their deadline
                if (!person.roles.has(InactiveRole)) person.addRole(InactiveRole) //if they don't have inactive role add it
            }

            await person.setNickname(MemberDetails[InGameNameIndex]) //set nickname to in game name

            if (person.roles.has(GuestRole)) await person.removeRole(GuestRole) //if they have guest role remove it

            await person.addRole(employeeID) //add employee role

            //If they are a rank then add the rank role
            if (MemberDetails[RankIndex].toLowerCase() == "hustler" && !person.roles.has(hustlerID)) {
                foundRole = true;
                await person.addRole(hustlerID)

                if (message) await message.channel.send(`Gave ${person} the hustler role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "pickpocket" && !person.roles.has(pickpocketID)) {
                foundRole = true;
                await person.addRole(pickpocketID)

                if (message) await message.channel.send(`Gave ${person} the pickpocket role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "thief" && !person.roles.has(thiefID)) {
                foundRole = true;
                await person.addRole(thiefID)

                if (message) await message.channel.send(`Gave ${person} the thief role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "lawless" && !person.roles.has(lawlessID)) {
                foundRole = true;
                await person.addRole(lawlessID)

                if (message) await message.channel.send(`Gave ${person} the lawless role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "mastermind" && !person.roles.has(mastermindID)) {
                foundRole = true;
                await person.addRole(mastermindID)

                if (message) await message.channel.send(`Gave ${person} the mastermind role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "overlord" && !person.roles.has(overlordID)) {
                foundRole = true;
                await person.addRole(overlordID)
                if (message) await message.channel.send(`Gave ${person} the overlord role`)
            }
            else if (MemberDetails[RankIndex].toLowerCase() == "initiate" && !person.roles.has(initiateID)) {
                foundRole = true;
                await person.addRole(initiateID)
                if (message) await message.channel.send(`Gave ${person} the initiate role`)

            } else if (MemberDetails[RankIndex].toLowerCase() == "lead foot" && !person.roles.has(leadfootID)) {
                foundRole = true;
                await person.addRole(leadfootID)

                if (message) await message.channel.send(`Gave ${person} the lead foot role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "wheelman" && !person.roles.has(wheelman)) {
                foundRole = true;
                await person.addRole(wheelman)

                if (message) await message.channel.send(`Gave ${person} the wheelman role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "legendary" && !person.roles.has(legendaryID)) {
                foundRole = true;
                await person.addRole(legendaryID)

                if (message) await message.channel.send(`Gave ${person} the legendary role`)
            } else if (MemberDetails[RankIndex].toLowerCase() == "speed demon" && !person.roles.has(speeddemonID)) {
                foundRole = true;
                await person.addRole(speeddemonID)

                if (message) await message.channel.send(`Gave ${person} the speed demon role`)
            }
        } else { //Not hired in main comp
            const MemberDetails = await functions.GetMemberDetails(auth, OtherSheet, OtherRange, OtherDiscordIndex, person.id, message.channel) //check other company
            if (MemberDetails) { //Hired in other company
                if (person.roles.has(GuestRole)) await person.removeRole(GuestRole) //if they have guest role remove it
                await person.addRole(FamilyID) //add the family role
                await person.addRole(employeeID) //add employee rolle
                if (message) message.channel.send(`Gave ${person} the family role`)
            }
        }
    }
    authentication.authenticate().then((auth) => { //authenticate the function
        setTimeout(() => {
            getPIGSemployees(auth); //after 500 ms get the employee (give time to remove all roles)
        }, 500);

    });
}
module.exports.help = {
    name: "roles",
    usage: "{person}",
    description: "Refresh roles",
    permission: "SEND_MESSAGES"
}