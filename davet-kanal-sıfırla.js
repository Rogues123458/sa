const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
	  const db = new Database("./Servers/" + message.guild.id, "Settings");
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`)).then(msg => msg.delete({timeout: 5000}))
    
    var type = ["Channel"];
    db.set(`settings`);

message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Davet Kanalı Başarılı Bir Şekilde Sıfırlandı!`)).then(msg => msg.delete({timeout: 5000}))


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet-kanal-sıfırla',
  description: 'Ayarladığınız davet kanalını sıfırlarsınız',
  usage: 'davet-kanal-sıfırla'
};