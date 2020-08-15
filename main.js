const Discord = require('discord.js');
const client = new Discord.Client();

const cron = require('node-cron')

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
                        "value": "このBotのプレフィックスは「256!」です。\nコマンドは以下のとおりです。\n\n**help**\n  このヘルプを出します。\n**new <掲示板名>**\n  掲示板を建てます。"
                    }
                ]
            }
        });
    } else if (m.startsWith("256!new ")) {
        if (message.channel.id != "744224835906961498") return message.channel.send("ここでは掲示板を建てることができません。");
        const chs = message.guild.channels.cache.size - 4
        const rethr = new RegExp('(.+)' + client.token + '$', "i");
        const chname = chs + "-" + m.slice(8).replace(rethr, "ntk4ndewntq1mduznty0otm5.fuck.is-broccoli-and-loser");
        message.guild.channels.create(chname, { parent: "744224782819786854", topic: `${message.author.tag}(${message.author.id})が掲示板を建てました。` });
        message.delete();
        message.channel.send(`${message.author.tag}(${message.author.id})が掲示板を建てました: ${chname}`);
    }
})

client.login(process.env.pudding);

//認証
//https://discordapp.com/api/webhooks/744242714438140047
const hook = new Discord.WebhookClient('744242714438140047', process.env.webhook);

let codes = { "698395012219666432": "monhu" };
cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', () => {
    codes = { "698395012219666432": "monhu" };
});

var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
var N = 256
client.on('guildMemberAdd', member => {
    if (member.bot) return;
    const code = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
    member.send("256chへようこそ。");
    codes[message.author.id] = code
    member.send("あなたの認証コードは、`256!" + code + "`です。\n5分ごとにリセットされるので、リセットされた場合は`256!getcode`で新しい認証コードを取得してください。");
    hook.send(member.displayname + "さんが参加しました。\n認証コードはDMに送信されました。\m※認証コードを再送信するには`256!getcode`を入力してください。");
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content == "256!getcode") {
        const code = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
        message.author.send("256chへようこそ。");
        codes[message.author.id] = code
        message.author.send("あなたの認証コードは、`256!" + code + "`です。\n5分ごとにリセットされるので、リセットされた場合は`256!getcode`で新しい認証コードを取得してください。");
    } else if (message.content == "256!" + codes[message.author.id]) {
        hook.send(`${message.author.tag}さん、認証に成功しました。\nどうぞ256chをご利用ください。`);
        message.author.roles.add("744221904986177558");
        client.members.cache.get("698395012219666432").send(`${message.author.tag}(${message.author.id})が認証`);
    }
})