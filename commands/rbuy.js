const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "buy",
    description: "Buy an item from the store",

    async run (client, message, args) {
        let purchase = args.join(" ");
        if(!purchase) return message.channel.send('Please provide an item to buy')
        let items = await db.fetch(message.author.id, { items: [] });
        let amount = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

        if(purchase === 'Exclusive'){
            if(amount < 500000) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 500000);
            db.push(message.author.id, "Exclusive");
            message.channel.send('Successfully bought Role')
        }
        if(purchase === 'Super Member'){
            if(amount < 250000) return message.channel.send('You do not have enough money to buy this item. Please try another one');
            db.subtract(`money_${message.guild.id}_${message.author.id}`, 250000);
            db.push(message.author.id, "Super Member");
            message.channel.send('Successfully bought Role')
        }
    }
}