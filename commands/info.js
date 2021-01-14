const dc = require('discord.js')

exports.run = async(client, message, args) => {
  let y = new dc.MessageEmbed()
  .setTitle(`INFO THIS BOT`)
  .setColor('RANDOM')
  .setThumbnail(client.user.displayAvatarURL())
  .addField('⚙️ Made by', '`SANSTOPIA#7540 Newbie CODER`')
  .addField('☕ Thank`s to', '`NINJA PEACE#3661 For Help Me`')
  .addField('CREDIT', '`Hi im SANS BOT, I was made to help out with everything. maybe some commands are missing, but I hope you like it.`')
  
  message.channel.send(y)
}