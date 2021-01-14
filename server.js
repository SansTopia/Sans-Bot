const Discord = require("discord.js");
const client = new Discord.Client();
//UPTIME ROBOT (WEB)
const { get } = require("snekfetch");
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Pinging");
  response.sendStatus(200);
})
app.listen(process.env.PORT);
setInterval(() => {
http.get('http://discord-tutori4l.glitch.me/');
}, 280000);

client.on("ready", async () => {
  console.log(`${client.user.tag} sudah online!`);
  client.user.setActivity("PREFIX = S!");
  client.channels.cache.get('797652650900193291').send(`HELLO WORLD! IM BACK!`).then(i => i.delete({timeout : 10000}));
});

client.on("message", async message => {
if (message.content === "P") message.reply("eh napa bor?");  
if (message.content === "Help") message.reply("do S!help");
if (message.content === "Sans") message.reply("apa om?"); 
if (message.content === "hi") message.reply("Hi")
//COMMAND BOT DI SERVER.JS
const prefix = "S!"

if(!message.content.startsWith(prefix)) return null;
let msg = message.content.toLowerCase();
let args = message.content.slice(prefix.length).trim().split(" ");
let cmd = args.shift().toLowerCase();
let command = cmd;
  
let commandFiles;
try{
  commandFiles = require(`./commands/${cmd}.js`)
} catch (err) {
  return message.reply('hmm something went wrong i can feel it')
}
const db = require("quick.db")
const now = Date.now()
if(db.has(`cd_${message.author.id}`)) {
  const expirationTime = db.get(`cd_${message.author.id}`) + 3000
  if(now < expirationTime) {
  const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd}\` command.`);
  }
}
  db.set(`cd_${message.author.id}`, now);
  setTimeout(() => {
    db.delete(`cd_${message.author.id}`)
  },3000)
try {
  commandFiles.run(client, message, args)
} catch (err) {
  } finally {
    console.log(`${message.author.tag} menggunakan command ${prefix}${cmd}`)
  client.channels.cache.get('782466971333558283').send(`${message.author.tag} menggunakan command ${cmd}`)
  }

});
client.login(process.env.TOKEN);