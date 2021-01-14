const discord = require("discord.js")
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

module.exports = {
  name: "covid",
  category: "info",
  description: "Get the stats of corona",
  usage: "corona all or corona <country>",
  aliases: ["cov", "corona", "covid19"],
  run: async (client, message, args) => {

 
    
    if(!args.length) {
      return message.channel.send("Please give the name of country")
    }
    
    if(args.join(" ") === "all") {
      let corona = await track.all() //it will give global cases
      
      let embed = new discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("RANDOM")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField('Total Cases', 
      corona.cases.toLocaleString(), true)
      .addField('Total Deaths', 
      corona.deaths.toLocaleString(), true)
      .addField('Total Recovered',
      corona.recovered.toLocaleString(), true)
      .addField('Today Cases', 
      corona.todayCases.toLocaleString(), true)
      .addField('Today Deaths', 
      corona.todayDeaths.toLocaleString(), true)
      .addField('Active Cases', 
      corona.active.toLocaleString(), true);
      
      return message.channel.send(embed)
      
      
      
    }else {
      let corona = await track.countries(args.join(" ")) //change it to countries
      
      let embed = new discord.MessageEmbed()
      .setTitle(`${corona.country}`)
      .setColor("RANDOM")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField('Total Cases', 
      corona.cases.toLocaleString(), true)
      .addField('Total Deaths', 
      corona.deaths.toLocaleString(), true)
      .addField('Total Recovered', 
      corona.recovered.toLocaleString(), true)
      .addField('Todays Cases',
      corona.todayCases.toLocaleString(), true)
      .addField('Todays Deaths',
      corona.todayDeaths.toLocaleString(), true)
      .addField('Active Cases', 
      corona.active.toLocaleString(), true);
      
      return message.channel.send(embed)
      
      
    }
    
    
    }
}