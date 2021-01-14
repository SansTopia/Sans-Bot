const dc = require('discord.js')

exports.run = async(client, message, args) => {
  let y = new dc.MessageEmbed()
  .setTitle(`SANS BOT Commands`)
  .setColor('RANDOM')
  .addField('💰 Economy 💰', '`balance`, `daily`, `deposit`, `hourly`, `withdraw`, `work`, `pay`')
  .addField('⚙️ Others ⚙️', '`ping`, `covid`, `info`,')
  .setFooter(client.user.username, client.user.displayAvatarURL());
  
  message.channel.send(y)
}