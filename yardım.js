const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Pink İnvite Bot Altyapı Yardım Menüsü`)
.setDescription(`**Davet Komutları\n**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n
**\`${prefix}davet-ekle @rol davet\`** = Belirtilen Davet Sayısına Ulaşıldığında Belirtilen Rolü Verilir. \n
**\`${prefix}ranks\`** = Bot'da Bulunan Rankları Listeler. \n
**\`${prefix}davet-sıfırla\`** = Bütün Davetleri Sıfırlar. \n
**\`${prefix}top10\`** = En Çok Davet Yapan Kişilerin İsimlerini Ve Yaptıkları Davet Sayılarını Gösterir.. \n
**\`${prefix}davetlerim\`** = Kaç kişiyi davet ettiğinizi gösterir.\n
**\`${prefix}davet <Üye>\`** = Etiketlediğiniz kişinin davet bilgilerini görürsünüz. \n 
**\`${prefix}davet-ekle <Üye>\`** = İD'si Yazılan Kullanıcıya Belirtilen Kadar Davet Sayısı Ekler. \n 
**\`${prefix}davet-kanal #kanal\`** = Davet Kanalını Ayarlar. \n
**\`${prefix}davet-kanal-sıfırla\`** = Davet Kanalını Sıfırlar.\n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n 
 
[**Youtube**](https://www.youtube.com/channel/UC5wKh5g7hZ6-n1LMgHenDiQ)    **|**    [**Discord**](https://discord.gg/7Mx3hVQq6s)     **|**  [**Pink İnvite Bot**](https://discord.com/oauth2/authorize?client_id=809034867302989844&scope=bot&permissions=8) 
`)//**Pink İnvite Bot
//.addField(``,``,true)
//https() [**Pink İnvite Bot**
.setTimestamp()
//.setImage("https://cdn.discordapp.com/attachments/720582739941916683/780714816120815636/standard.gif")
.setFooter(`${message.author.username} Tarafından İstendi! | Kullanıcı İD - ${message.author.id}`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: 1,
  guildOnly: 1, 
  aliases: ['help','y','komutlar'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'Yardım Menüsü.',
  usage: 'yardım'
};