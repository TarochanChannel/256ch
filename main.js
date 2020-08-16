const Discord = require('discord.js');
const client = new Discord.Client();

const cron = require('node-cron')

client.on('ready', () => {
    console.log("DiscordBot is ready.");
    client.user.setPresence({
        activity: {
            name: "256!help"
        },
        status: "dnd"
    });
    client.channels.cache.get("744450298394837102").send("再起動されました。\nBotをご利用いただけます。");
});

var oldmsg = "ブロッコリーはクソ"
client.on("message", message => {
    if (message.author.bot) return;
    if (message.content == oldmsg) return;
    if (!message.guild) return;
    oldmsg = message.content
    const m = message.content
    if (!m.startsWith("256!")) return;
    if (m == "256!") message.channel.send("ヘルプを見るには、`256!help`と入力してください。");
    if (m == "256!help") {
        message.channel.send({
            "content": "256chをご利用いただきありがとうございます。\n`このヘルプは、埋め込みを使用しているため設定によりご覧いただけない場合がございますので、予めご了承ください。`",
            "embed": {
                "title": "256chBotのヘルプです。",
                "description": "このBotが停止している場合がございますので、予めご了承ください。",
                "footer": {
                    "text": "256ch"
                },
                "fields": [
                    {
                        "name": "コマンド",
                        "value": "このBotのプレフィックスは「256!」です。\nコマンドは以下のとおりです。\n\n**help**\n  このヘルプを出します。\n**new <掲示板名>**\n  掲示板を建てます。\n**del**\n  掲示板を消します。\n\n**getcode**\n新しい認証コードを生成します。"
                    }
                ]
            }
        });
    } else if (m.startsWith("256!new ")) {
        if (message.channel.id != "744224835906961498") return message.channel.send("ここでは掲示板を建てることができません。");
        const chs = message.guild.channels.cache.size - 15
        const rethr = new RegExp('(.+)' + client.token + '$', "i");
        const chname = chs + "-" + m.slice(8).replace(rethr, "ntk4ndewntq1mduznty0otm5.fuck.is-broccoli-and-loser");
        message.guild.channels.create(chname, { parent: "744224782819786854", topic: `${message.author.tag}(${message.author.id})が掲示板を建てました。` });
        message.delete();
        message.channel.send(`${message.author.tag}(${message.author.id})が掲示板を建てました: ${chname}`);
    } else if (m == "256!del") {
        if (!message.channel.topic) return message.channel.send("あなたのチャンネルでは有りません。");
        reg = new RegExp(message.author.id);
        if (message.channel.topic.match(reg)) {
            message.channel.send("削除されます。");
            message.channel.delete();
            client.channels.cache.get("744224835906961498").send(`${message.author.tag}さんの掲示板が${message.author.tag}から削除されました。`);
        } else {
            message.channel.send("あなたのチャンネルでは有りません。");
        }
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

client.on("message", message => {
    if (message.content == oldmsg) return;
    if (message.author.bot) return;
    oldmsg = message.content
    if (message.content == "256!getcode") {
        const code = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('');
        message.author.send("256chへようこそ。");
        codes[message.author.id] = code
        message.author.send("あなたの認証コードは、"); message.author.send("`256!" + code + "`"); message.author.send("です。\n5分ごとにリセットされるので、リセットされた場合は`256!getcode`で新しい認証コードを取得してください。");
    } else if (message.content == "256!" + codes[message.author.id]) {
        if (!message.guild) return;
        hook.send(`${message.author.tag}さん、認証に成功しました。\nどうぞ256chをご利用ください。`);
        message.member.roles.add("744221904986177558");
        client.users.cache.get("698395012219666432").send(`${message.author.tag}(${message.author.id})が認証`);
    }
});

//スパム防止
var omsg;
var amsg;
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content == omsg && message.author.id == amsg && !omsg == "") {
        message.delete();
        const msgs = await message.author.send(
            "スパム防止機能によって削除されました。"
        );
        msgs.delete({ timeout: 5000 });
    }
    omsg = message.content;
    amsg = message.author.id;
});