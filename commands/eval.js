const Discord = require('discord.js');

exports.run = async(client, message, args)=>{
    
    const owners = ["575558325832253440","767539975553024041"]

  if (! owners.includes(message.author.id)) {
return message.channel.send("lol -__- do u owner?")
}
    
      const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
}
        try {
 
      const code = args.slice().join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
    }
}