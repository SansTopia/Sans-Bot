const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    aliases: [],
    description: "Make a suggestion and have the community vote",
    category: "utility",
    usage: "suggest <suggestion>",
    run: async (client, message, args) => {
        let suggestion = args.slice(0).join(" ");
        let SuggestionChannel = message.guild.channels.cache.find(channel => channel.name === "🌫˚⋆┊✬『sans-bot』");
        if (!SuggestionChannel) return message.channel.send("Please create a channel named 🌫˚⋆┊✬『sans-bot』 before using this command!");
        const embed = new MessageEmbed()
            .setTitle("New Suggestion")
            .setDescription(suggestion)
            .setColor("RANDOM")
            .setFooter(`${message.author.tag}`)
            .setTimestamp()
        SuggestionChannel.send(embed).then(msg => {
            msg.react("👍🏻")
            msg.react("👎🏻")
        message.channel.send("Thanks you, suggestion has been sent!");
        message.delete()
        });
    }
}