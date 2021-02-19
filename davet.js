const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {


  
    var victim = message.mentions.members.size > 0 ? message.mentions.members.first().id : args.length > 0 ? args[0] : undefined;
  
    if(!victim) return message.channel.send(new Discord.MessageEmbed().setColor('#00ff51').setDescription(`Davetini Görmek İstediğiniz Kişiyi Etiketlemelisiniz!`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))
    victim = message.guild.member(victim);
    if(!victim) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Aradığınız Kullanıcı Sunucuda Bulunmamaktadır!`).setTimestamp().setFooter(`${message.author.tag} Tarafından Kullanıldı!`)).then(msg => msg.delete({timeout: 3500}))

     

    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
    .setThumbnail(`https://cdn.discordapp.com/avatars/770679040100532264/c95ce39379569ca3b94234c4e29b3137.png?size=1024`)
    .setDescription(`${victim} Adlı Kişinin Davetleri Sayıları \n\n **Toplam:** \`${(data.total || 0) + (data.bonus || 0)}\` \n\n **Düzenli** \`${data.regular || 0}\` \n\n **Bonus:** \`${data.bonus || 0}\` \n\n **Çıkanlar:** \`${data.leave || 0}\` \n\n **Sahte Olanlar:** \`${data.fake || 0}\``)
    .setColor("RANDOM");
    message.channel.send(embed);
};  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rank"],
  permLevel: 0
};
exports.help = {
  name: 'davet',
  description: 'Etiketlediğiniz kişinin davet bilgilerini görürsünüz',
  usage: 'davet <Kullanıcı>'
};
