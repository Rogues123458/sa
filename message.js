const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();
const db = require('quick.db')
const sure = 2
const beklememesaji = `**Bu Komutu Kullanabilmek İçin \`${sure}\` Saniye Kadar Beklemelisin!!**` 
const ownerbeklemesi = false 
let yazma = new Set();
module.exports = async message => {

const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);  
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = args.shift().toLowerCase();
if (command.length === 0) return;
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    if (yazma.has(message.author.id)) {
      return message.channel.send(beklememesaji);
    }
  } else if (client.aliases.has(command)) {
    if (yazma.has(message.author.id)) {
      return message.channel.send(beklememesaji);
    }
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {

    if(cmd.help.name !== "cevaplama") {
     let kanalengel = await db.fetch(`kanalengel_${message.guild.id}`);
      if(kanalengel) {
     if(kanalengel && kanalengel.some(kanalid => `k${message.channel.id}` === kanalid)) return;
      }
 }
    if (perms < cmd.conf.permLevel) return;
    if(ownerbeklemesi === false) {
      yazma.add(message.author.id);
    } if(ownerbeklemesi === true) {
      if(message.author.id === ayarlar.owner) {
        cmd.run(client, message, params, perms);
        return true;
      }
    }
    setTimeout(() => {
      if(yazma.has(message.author.id)) {
        yazma.delete(message.author.id);
      }
    }, sure * 1000);
    cmd.run(client, message, params, perms);
  }


};


module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  let prefix = ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!ayarlar.sahip.includes(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu sadece **sahibim** kullanabilir!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }