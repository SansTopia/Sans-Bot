const b = require('quick.db')
const d = require('discord.js')
exports.run = async(client, message, args) => {
  if(!args.length) {
    return message.channel.send(`**Please enter some message!!**`)
  } else {
  const status = new b.table('AFKs')
  let afk = await status.fetch(message.author.id);
  
  if(!afk) {
    let c = new d.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`AFK`, message.author.displayAvatarURL())
    .setDescription(`AFK Mode has been set to **${args.join(" ")}**`)
    status.set(message.author.id, args.join(" ") || `AFK`);
  message.channel.send(c)
  }
  }
}