const db = require('quick.db');
const dc = require('discord.js');

exports.run = async (client, message, args) => {
	let user =
		message.mentions.users.first() ||
		message.author ||
		message.guild.members.cache.get(args[0]).user;

	let balance = db.get(`money_${user.id}`);
	if (balance === null) balance = 0;
	let bank = db.get(`bank_${user.id}`);
	if (bank === null) bank = 0;

	let a = new dc.MessageEmbed()
		.setAuthor(`${user.username} balance`, user.displayAvatarURL())
		.setDescription(
			`**Gems :** ${balance.toLocaleString()}
**Storage :** ${bank.toLocaleString()}`
		)
		.setColor('RANDOM')
		.setTimestamp();

	message.channel.send(a);
};