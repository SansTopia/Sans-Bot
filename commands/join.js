const { MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
  let embed = new MessageEmbed()
  .setTitle(`Join to official sans bot server`)
  .setDescription(`[Join official Server] (https://discord.gg/djp2WGmzVz)`)
  .setColor("RANDOM")
  
  message.channel.send(embed)
}