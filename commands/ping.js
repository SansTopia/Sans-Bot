const dc = require('discord.js')

exports.run = async(client, message, args) => {
let p = new dc.MessageEmbed()
.setTitle(`This is My signal?`)
.setThumbnail(client.user.displayAvatarURL())
.setDescription(`:ping_pong: **Ping! Pong! :** ${client.ws.ping} ms`)
.setColor('RANDOM')

message.channel.send(p)
}