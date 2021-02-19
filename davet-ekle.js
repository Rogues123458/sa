const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`)).then(msg => msg.delete({timeout: 5000}))
    var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
    if(!victim) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Öncelikle Bir İD Belirtmelisin!`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))

    victim = message.guild.member(victim);
    if(!victim)   return message.channel.send(new Discord.MessageEmbed().setColor('#00ff51').setDescription(`Aradığnız Kullanıcı Sunucuda Bulunmamaktadır.`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))

    var num = Number(args[1]);
    if(isNaN(num))   return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Lütfen Bonus Olacak Sayı Giriniz.`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))

    const db = new Database("./Servers/" + message.guild.id, "Invites");

    var bonus = (db.add(`invites.${victim.id}.bonus`, num) || 0), total = (db.get(`invites.${victim.id}.total`) || 0);
    message.channel.send(`${victim} Adlı Kişiye ${num} Civarı Bonus Eklendi.`);

    global.onUpdateInvite(victim, message.guild.id, total + bonus);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'davet-ekle',
  description: 'Etiketlediğiniz kişite belirtilen miktarda davet sayısı eklersiniz7',
  usage: 'davet-ekle <kullanıcı>'
};
