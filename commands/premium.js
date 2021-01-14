const dc = require('discord.js')

exports.run = async(client, message, args) => {
  
    const premium = ["575558325832253440","767539975553024041","707489341651419136"]

  if (! premium.includes(message.author.id)) {
return message.channel.send("**Bruh u need to buy premium first!**")
  }
  
  let b = new dc.MessageEmbed()
  .setTitle(`Premium Commands`)
  .setColor('RANDOM')
  .addField('Beep Boop Boop Beep! martabak!', '`Sorry this command currently maintenance!`')
  .setFooter(client.user.username, client.user.displayAvatarURL());
  
  message.channel.send(b)
}