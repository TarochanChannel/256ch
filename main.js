const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("DiscordBot is ready.");
});

var oldmsg = "ブロッコリーはクソ"
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content == oldmsg) return;
    if (!message.guild) return;
    const m = message.content
    if (!m.startsWith("256!")) return;
    if (m == "256!") message.channel.send("ヘルプを見るには、`256!help`と入力してください。");
    if (m == "256!help") {
        message.channel.send({
            "content": "256chをご利用いただきありがとうございます。\n`このヘルプは、埋め込みを使用しているため設定によりご覧いただけない場合がございますので、予めご了承ください。``",
            "embed": {
                "title": "256chBotのヘルプです。",
                "description": "このBotが停止している場合がございますので、予めご了承ください。",
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                    "text": "footer text"
                },
                "fields": [
                    {
                        "name": "コマンド",
                        "value": "このBotのプレフィックスは「256!」です。\nコマンドは以下のとおりです。\n\n**help**\n  このヘルプを出します。\n**new <掲示板名>**\n  掲示板を作成します。"
                    }
                ]
            }
        });
    } else if (m.startsWith("256!new ")) {
        if (message.channel.id != "744224835906961498") return message.channel.send("ここでは掲示板を作成できません。");
        const chs = message.guild.channels.cache.size - 4
        const rethr = new RegExp('(.+)' + client.token + '$', "i");
        const chname = chs + "-" + m.slice(8).replace(rethr, "ntk4ndewntq1mduznty0otm5.fuck.is-broccoli-and-loser");
        message.guild.channels.create(chname, { parent: "744224782819786854" });
        message.delete();
        message.channel.send("掲示板を作成しました: " + chname);
    }
})

client.login(process.env.pudding);