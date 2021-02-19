const Discord = require("discord.js");
const Database = require("../Helpers/Database");


exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`)).then(msg => msg.delete({timeout: 5000}))
    const db2 = new Database("./Servers/" + message.guild.id, "Invites");

db2.set("invites")
message.channel.send("Tüm Kullanıcıların Davetleri Sıfırlandı")
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'davetleri-sıfırla',
  description: 'Sunucuda ki herkesin davetini sıfırlarsınız',
  usage: 'davetleri-sıfırla'
};

