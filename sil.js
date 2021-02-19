const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
let sa = await db.fetch(`sillog_${message.guild.id}`)
      let acebots = args[0]

 let prefix = ayarlar.prefix
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanmak İçin İzniniz **\`Mesajları_Yönet\`** Yok!`)).then(message => message.delete({timeout:3500}));
  message.delete()
if(!acebots) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription('**Lütfen Silinicek Mesaj Miktarını Yazın.!** 🚫')).then(message => message.delete({timeout:3500}));
  message.delete()
if(acebots > 250) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`**\`250\`**'ün Üzerinde **Mesaj Silemem!**`)).then(message => message.delete({timeout:3500}));
  message.delete()
  
  message.channel.bulkDelete(acebots).then(() =>  {
    let embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`
Mesajları Silen Yetkili - <@${message.author.id}>

Mesajların Silindiği Kanal - ${message.channel}

Silinen Mesaj Miktarı - **\`${acebots}\`**

`)
    .setFooter(`${message.author.tag} Tarafından Kullanıldı`)
 message.channel.send(embed).then(message => message.delete({timeout:5000})); 

  })
  
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clear","temizle"],
  permLevel: 1
};

exports.help = {
  name: 'sil'
};