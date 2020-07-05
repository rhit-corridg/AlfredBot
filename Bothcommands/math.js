const mathjs = require("mathjs")

module.exports.run = async (bot, message, args) => {
    try {
        var answer = mathjs.evaluate(args.join(" "))
        message.channel.send(answer.toString())
        console.log(answer, typeof answer)
    } catch (e) {
        console.log(e)
        message.channel.send("Invalid equation.")
    }
    
}

module.exports.help = {
    name: "math",
    usage: "",
    description: "Do math",
    permission: "SEND_MESSAGES"
}