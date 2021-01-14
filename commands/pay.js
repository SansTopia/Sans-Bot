const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
  
  let user;
  if(message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else if (args[0]) {
    user = message.guild.members.cache.get(args[0]).user
    
  }
  
  let bank = db.get(`bank_${message.author.id}`);
  
  if(!user) return message.channel.send("Please mention some user!!")
  if(user.bot || user === client.user) return message.channel.send(`Do you want to transfer money to the bot?`)
  if(user.id === message.author.id || user === message.author) return message.channel.send(`You can transfer money to yourself without my help!!`)
  
  let amount = parseInt(args[1])
  if(!amount) return message.channel.send("Please input some number..")
  if(isNaN(amount)) return message.channel.send("Please input a valid number!!")
  
  if(bank === 0) return message.reply(`**You don't have a money in your bank**`)
  if(amount > bank) return message.reply(`**You don't have enough money**`)
  if(amount < 1) return message.reply(`**What do you transfer dude?**`)
  
  let embed = new MessageEmbed()
  .setAuthor(`Transfer`, message.author.displayAvatarURL())
  .setThumbnail(user.displayAvatarURL())
  .setDescription(`You has given **${amount.toLocaleString()} Gems** to <@${user.id}>`)
  .setColor("RANDOM")
  .setFooter(`Transfer by ${message.author.username}`)
  
  await db.add(`bank_${user.id}`, amount);
  await db.subtract(`bank_${message.author.id}`, amount)
  
  return message.channel.send(embed)
}