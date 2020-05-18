const Discord = require('discord.js');
module.exports.run = async (client,message,arguments,config) => {
  let botmember = await message.guild.members.cache.find(member => member.user.id == client.user.id)
  var highestrolepos = -1
  var highestrolecolor = 0
  botmember.roles.cache.forEach(role =>{
    if(role.rawPosition > highestrolepos){
      highestrolepos = role.rawPosition
      highestrolecolor = role.color
    }
  })
  const aboutembed = new Discord.MessageEmbed()
      .setTitle("About")
      .setDescription("This bot is a potato!\nUse pb!invite to invite the bot")
      .setFooter("This bot reacts to all potatoes")
      .setColor(highestrolecolor);
  message.channel.send(aboutembed)
}