const db = require('quick.db')
const dc = require('discord.js')

exports.run = async(client, message, args) => {
  if(!args) {
return message.channel.send(`** Lemme help you, enter some nominal in ur bank to withdraw!**`)
}

let balance = parseInt(db.get(`bank_${message.author.id}`))
    if(args[0] === "all") {
      
      let mbed = new dc.MessageEmbed()
      .setAuthor(`Deposit`, message.author.displayAvatarURL())
      .setDescription(`You have withdrawn **${balance.toLocaleString()} Gems**`)
      .setTimestamp()
      .setColor('RANDOM')
      
      db.add(`money_${message.author.id}`, balance)
      db.subtract(`bank_${message.author.id}`, balance)
      return message.channel.send(mbed)
    }

if(isNaN(args[0])) {
return message.channel.send(`**Something's wrong... try again later**`)
}

let amount = parseInt(args[0])

    if(balance < amount) {
      return message.channel.send(`**Hey!, If you don't have money... go to work!!**`)
    } else {
      let m = new dc.MessageEmbed()
      .setAuthor(`Withdraw`, message.author.displayAvatarURL())
      .setDescription(`You have withdrawn **${amount.toLocaleString()} Gems**`)
      .setTimestamp()
      .setColor('RANDOM')
      
      message.channel.send(m)
      db.add(`money_${message.author.id}`, amount)
      db.subtract(`bank_${message.author.id}`, amount)
    }
}