const db = require('quick.db')
const ms = require('parse-ms')
const dc = require('discord.js')

exports.run = async(client, message, args) => {
  let cooldown = 3600000
  
  let hourly = await db.fetch(`hourly_${message.author.id}`)
  
  if(hourly !== null && cooldown - (Date.now() - hourly) > 0) {
    let time = ms(cooldown - (Date.now() - hourly))
    let cd = new dc.MessageEmbed()
    .setTitle(`Be patient Gay!`)
    .setDescription(`Uh oh look this guy impatient, you have to wait ${time.minutes}m and ${time.seconds}s to claim the reward again`)
    .setColor('RANDOM')
    .setTimestamp()
    
    message.channel.send(cd)
  } else {
    let dr = new dc.MessageEmbed()
    .setAuthor(`Hourly Reward`, message.author.displayAvatarURL())
    .setDescription(`**5500 Gems** Finished added to your balance`)
    .setTimestamp()
    .setColor('RANDOM')
    
    message.channel.send(dr)
    db.set(`hourly_${message.author.id}`, Date.now())
    db.add(`money_${message.author.id}`, 5500)
  }
}