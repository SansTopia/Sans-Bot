const db = require('quick.db')
const ms = require('parse-ms')
const dc = require('discord.js')

exports.run = async(client, message, args) => {
  let cooldown = 86400000
  
  let daily = await db.fetch(`daily_${message.author.id}`)
  
  if(daily !== null && cooldown - (Date.now() - daily) > 0) {
    let time = ms(cooldown - (Date.now() - daily))
    let cd = new dc.MessageEmbed()
    .setTitle(`Be patient Gay!`)
    .setDescription(`Uh oh like this Gay impatient, you have to wait ${time.hours}h ${time.minutes}m and ${time.seconds}s to claim the reward again!`)
    .setColor('RANDOM')
    .setTimestamp()
    
    message.channel.send(cd)
  } else {
    let dr = new dc.MessageEmbed()
    .setAuthor(`Daily Reward`, message.author.displayAvatarURL())
    .setDescription(`**25000 Gems** Finished added to your balance`)
    .setTimestamp()
    .setColor('RANDOM')
    
    message.channel.send(dr)
    db.set(`daily_${message.author.id}`, Date.now())
    db.add(`money_${message.author.id}`, 25000)
  }
}