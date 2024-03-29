const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission('KICK_MEMBERS')) {
		//Can't kick members
		return message.channel.send(
			'You are an employee. You are always available'
		);
	}

	let RoleID = '';
	if (message.guild.id == botconfig.PIGSServer) {
		RoleID = botconfig.PIGSRoles.UnavailableRole;
	} else if (message.guild.id == botconfig.RTSServer) {
		RoleID = botconfig.RTSRoles.UnavailableRole;
	}

	if (!message.member.roles.cache.has(RoleID)) {
		//if they have the role by ID
		message.member.roles.add(RoleID); //adds role
		message.channel.send('Enjoy your break.');
		return;
	} else {
		message.channel.send('You are already unavailable');
	}
};

module.exports.help = {
	disabled: true,

	name: 'unavailable',
	usage: '',
	description: 'Marks you as unavailable',
	permission: 'KICK_MEMBERS',
};
