const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
	  const db = new Database("./Servers/" + message.guild.id, "Settings");
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`)).then(msg => msg.delete({timeout: 5000}))


  let kanal = message.mentions.channels.first()
    if(kanal){
    var type = ["Channel"];
    db.set(`settings.${type}`, kanal.id);

return message.channel.send(new Discord.MessageEmbed().setColor('#00ff51').setDescription(`Davet Kanalı Başarıyla ${kanal} Olarak Ayarlandı.`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))

}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet-kanal',
  description: 'Davetlerin gideceği logs kanalını ayarlarsınız',
  usage: 'davet-kanal <#KANAL>'
};