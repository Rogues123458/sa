const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
  let acebots = ayarlar.prefix
    const db = new Database("./Servers/" + message.guild.id, "Rewards");
    var data = db.get(`rewards`) || {};

    var list = data.sort((x, y) => y.targetInvite - x.targetInvite);
      if(list.length === 0){
        var yok = new Discord.MessageEmbed()
        .setColor("RED")
           .setDescription(`Ayarlamak İçin ${acebots}-ekle @rol <davet-miktarı>`);
            return message.channel.send(yok);
        }

    var embed = new Discord.MessageEmbed()
        .addField("Davetler", `
    ** **${list.splice(0, 10).map((item, index) => `\`${index + 1}.\` <@&${item.Id}>: \`${item.Invite} Davete\``).join("\n")}`);

    message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ranks"],
  permLevel: 0
};
exports.help = {
  name: 'davetler',
  description: 'Kaç davete hangi rolü alacağınızı gösterir',
  usage: 'davetler '
};
