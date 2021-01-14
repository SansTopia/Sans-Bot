const db = require('quick.db')
const ms = require('parse-ms')
const dc = require('discord.js')

exports.run = async(client, message, args) => {
  let cooldown = 30000
  
  let work = await db.fetch(`work_${message.author.id}`)
  
  if(work !== null && cooldown - (Date.now() - work) > 0) {
    let time = ms(cooldown - (Date.now() - work))
    let lol = new dc.MessageEmbed()
    .setTitle(`You're tired, want to break again?`)
    .setDescription(`Please wait until ${time.minutes}m and ${time.seconds}s to work again`)
    .setColor('RANDOM')
    .setTimestamp()
    
    message.channel.send(lol)
  } else {
    const emo = message.client.emojis.cache.get('798142159202549760')

    let ranney = Math.floor(Math.random() * 5000) + 100
    
    let farms = ["Dirt", "Grass", "Coal", "Silver", "Gold", "Titanium", "Diamond"]
    let farm = farms[Math.floor(Math.random()* farms.length)]
    
    let lel = new dc.MessageEmbed()
    .setAuthor(`Work`, message.author.displayAvatarURL())
    .setDescription(`You break some ${farm} and get ${ranney} Gems ${emo}`)
    .setTimestamp()
    .setColor('RANDOM')
    
    message.channel.send(lel)
    db.set(`work_${message.author.id}`, Date.now())
    db.add(`money_${message.author.id}`, ranney)
  }
}