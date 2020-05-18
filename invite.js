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
  const inviteembed = new Discord.MessageEmbed()
      .setTitle("Invite")
      .setDescription("Invite the bot to your server!")
      .setURL("https://discord.com/oauth2/authorize?client_id=711344376466636840&scope=bot&permissions=379968")
      .setColor(highestrolecolor);
  message.channel.send(inviteembed)
}