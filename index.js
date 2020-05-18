const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const util = require("util")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("pb!about", { type: 'PLAYING' });
});
client.on('message', message => {
  if(message.author.bot || message.system) return;
    if(message.channel.type === 'dm') { 
        return; 
    }
    if(message.content.indexOf("pota") !== -1||message.content.indexOf("🥔")!== -1){
      message.react("🥔")
    }
    if (message.content.indexOf(config.prefix) === 0) { 
        let msg = message.content.slice(config.prefix.length);
        let args = msg.split(" "); 
        let cmd = args[0].toLowerCase();
        args.shift(); 
        if (cmd === "eval" && parseInt(message.author.id) === parseInt(config.owner)){ 
          const code = args.join(" ");
          evalCmd(message, code);
        }
        try{
          let commandFile = require(`./commands/${cmd}.js`);
          commandFile.run(client, message, args, config);
        }
        catch{}
    }
});
async function evalCmd(message, code) {
  if(parseInt(message.author.id) !== parseInt(config.owner)) return message.channel.send("You do not have permission to run this command");
  try {
      let evaled = eval(code)
      if (typeof evaled !== "string")
          evaled = util.inspect(evaled);
          message.channel.send(clean(evaled, message), {code:"xl"});
  } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err, message)}\n\`\`\``);
  }
}
function clean(text, message) {
  try{
  if (typeof(text) !== 'string') {
      text = util.inspect(text, { depth: 0 });
  }
  text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0') //Don't let it post your token
      .replace("chris","user1")
      .replace("\\chris","\\user1")
      .replace("chris\\","user1")
      .replace("eval-plz-work","Discord Bot")
  return text;
  }
  catch (err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
  }
}
client.login(config.token);