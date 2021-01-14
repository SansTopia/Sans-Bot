const discord = require("discord.js")
const db = require("quick.db")
const owner = ["575558325832253440","767539975553024041"]


module.exports = {
  name: "addmoney",
  aliases: ["am", "addcoins"],
  description: "Owner only command - Add more money to a user",
  run: async(client, message, args) => {
  if (! owner.includes(message.author.id)) {
      return message.channel.send('Only the **special person** can preform this command!'); 
  } 
    
    let user = message.mentions.members.first() //Must ping user that you will add him the money to
    if(!user) return message.channel.send("You must **Specify** a **User**")
    let money = db.fetch(`money_${user.id}`)
    
    if(money === null) money = 0
    
    if(!args[1]) return message.channel.send("You must **Specify** an amount to **Add**")
    if(isNaN(args[1])) return message.channel.send("The money your **Adding** is not a **Number**")
    
    db.add(`money_${user.id}`, args[1]) //Sadly in quick.db you can add decimal numbers (ex: 53.12)
    const embed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("**Successfully** gave Gems " + `**${args[1]}** to ${user} `) //Sorry for the spelling mistake
    message.channel.send(embed)

    }
}
