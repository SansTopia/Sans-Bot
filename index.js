const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { keep_alive } = require("./keep.js")

client.on("ready", async () => {
  console.log(`${client.user.tag} sudah online!`);
  client.user.setActivity(`a Christmas show | Np help`, { type: 'WATCHING' });
  client.channels.cache.get('787343531739316234').send(`**PEACE BOT** sudah online`)
});

client.snipes = new Map()
client.on("messageDelete", function(message, channel){
  client.snipes.set(message.channel.id,{
    content: message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
})

client.on("message", async message => {
  
  let prefix = "Np"
  
  if(message.author.bot || message.channel.type === "dm") return
  
  const { MessageEmbed } = require('discord.js')
  
  let afk = new db.table('AFKs')
  let as = await afk.fetch(message.author.id)
  let m = message.mentions.members.first()
  
  if(m) {
    let status = await afk.fetch(m.id)
    
    if(status) {
      message.reply(`This user has AFK because **${status}**`).then(i => i.delete({timeout : 20000}));
      }
  }
  
  if(as) {
    let p = new MessageEmbed()
    message.reply(`Welcome back!! Your **AFK** has been turned off`).then(i => i.delete({timeout : 10000}));
    afk.delete(message.author.id)
  }
                                     
  if (!message.content.startsWith(prefix)) return null;
  
let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  let command = cmd;

  let commandFiles;
  try {
    commandFiles = require(`./command/${cmd}.js`);
  } catch (err) {
    return
  };

  const now = Date.now();
  if(db.has(`cd_${message.author.id}`)) {
    const expirationTime = db.get(`cd_${message.author.id}`)+ 1000;
    if(now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
          )} more second(s) before reusing \`(cmd)\` command.`
        )
    }
  }
  db.set(`cd_${message.author.id}`, now)
  setTimeout(() => {
    db.delete(`cd_${message.author.id}`);
  }, 1000);
  try {
    commandFiles.run(client, message, args);
  } catch (err) {
  } finally {
    console.log(`${message.author.tag} menggunakan command "${prefix} ${cmd}"`);
    client.channels.cache.get('787343531739316234').send(`**${message.author.tag}** menggunakan command **${cmd} ${args.join(' ')}**`)
  }
});
client.login(process.env.TOKEN);