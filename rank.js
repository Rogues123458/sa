const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var data = db.get(`invites.${message.member.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setDescription(`<@${message.author.id}> Davet Sayıların \n\n **Toplam:** \`${(data.total || 0) + (data.bonus || 0)}\` \n\n **Düzenli** \`${data.regular || 0}\` \n\n **Bonus:** \`${data.bonus || 0}\` \n\n **Çıkanlar:** \`${data.leave || 0}\` \n\n **Sahte Olanlar:** \`${data.fake || 0}\``)
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi!`)
    .setColor("RANDOM");
    message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rankım","rank"],
  permLevel: 0
};
exports.help = {
  name: 'davetlerim',
  description: 'Sizin Davet Bilgilerinizi Gösterir',
  usage: 'davetim '
};
