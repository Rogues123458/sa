const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(cclient, message, args) => {

if(message.author.id !== "793080970437066754") if(message.author.id !== "793080970437066754") return message.channel.send(":x: Bu komutu sadece sahiplerim kullanabilir.")

let cuser = message.mentions.users.first() || cclient.users.cache.get(args[0])
if(!cuser) return message.channel.send(":x: Bir kullanıcı belirtmelisin!")

message.channel.send("✅ **"+cuser.tag+"** kullanıcısı başarıyla karalisteden çıkarıldı.")
const elminstêr = new Discord.MessageEmbed()
.setColor(`GREEN`)
.setTimestamp()
.setFooter('HypeLogger')
.setDescription(`✅ **${cuser.tag}** kullanıcısı karalisteden çıkarıldı.`)
  cclient.channels.cache.get("LOGKANALİD").send(elminstêr)
db.delete(`ckaraliste.${cuser.id}`)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'beyazliste',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };