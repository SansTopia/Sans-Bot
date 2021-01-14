const db = require('quick.db')
const dc = require('discord.js')

exports.run = async(client, message, args) => {
  if(!args) {
return message.channel.send(`**Lemme help you, enter some nominal in ur balance to deposit!**`)
}

let balance = parseInt(db.get(`money_${message.author.id}`))
    if(args[0] === "all") {
      
      let mbed = new dc.MessageEmbed()
      .setAuthor(`Deposit`, message.author.displayAvatarURL())
      .setDescription(`You deposited **${balance.toLocaleString()} Gems**`)
      .setTimestamp()
      .setColor('RANDOM')
      
      db.add(`bank_${message.author.id}`, balance)
      db.subtract(`money_${message.author.id}`, balance)
      return message.channel.send(mbed)
    }

if(isNaN(args[0])) {
return message.channel.send(`**Please enter the correct amount**`)
}

let amount = parseInt(args[0])

    if(balance < amount) {
      return message.channel.send(`**You don't have enough money!!**`)
    } else {
      let m = new dc.MessageEmbed()
      .setAuthor(`Deposit`, message.author.displayAvatarURL())
      .setDescription(`You deposited **${amount.toLocaleString()} Gems**`)
      .setTimestamp()
      .setColor('RANDOM')
      
      message.channel.send(m)
      db.add(`bank_${message.author.id}`, amount)
      db.subtract(`money_${message.author.id}`, amount)
    }
}