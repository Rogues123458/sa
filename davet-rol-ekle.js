const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`)).then(msg => msg.delete({timeout: 5000}))

    
    var roleId = message.mentions.roles.first(), targetInvite = Number(args[1]);
    if(isNaN(targetInvite)) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Bir Sayı Belirtmeyi Unuttun!`)).then(msg => msg.delete({timeout: 5000}))


    const db = new Database("./Servers/" + message.guild.id, "Rewards");

    var rewards = db.get("rewards") || [];
    rewards.push({
        Id: roleId.id,
        Invite: targetInvite
    });

    db.set("rewards", rewards);
const embed = new Discord.MessageEmbed()
.setDescription(`**<@${roleId}> Rolünü Ulaşabilmek İçin Toplam **\`${targetInvite}\`** Davet Yapmaları Gerekmektedir.**`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rütbe-ekle',
  description: 'Kaç davete ne permi verceğinizi ayarlarsınız',
  usage: 'rütbe-ekle <Davet Sayısı> <@rol>'
};
