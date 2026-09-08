const tmi = require ('tmi.js');
const express2 = require ('express');
const express = require ('express');
const app2 = express2();
const server = require ('http').createServer(app2);
const io = require ('socket.io')(server);



const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: "USERNAME"
        password: "PASSWORD"
       
    },
    channels: ['dixis333']
};

const client = new tmi.client(options);

io.on('connection', ioClient => handleSocketConnection(ioClient));

app2.use(express2.static('public'));

server.listen(1337);

require('dotenv').config();
const fetch = require('node-fetch');
const accessToken = "HIER ACCESS TOKEN EINFÜGEN";
const clientId = "HIER CLIENT ID EINFÜGEN";
const crypto = require('crypto');

const ngrok = require('ngrok');

const app = express();

// Globale Config
let config = {};

// Blacklist für Spam-Erkennung
const blacklist = ['buy-followers.com', 'cheap-views.net', 'bit.ly/', 'streamboo .live', 'freebits.xyz', 'streamboo .com', 'boostglobal.ru', 'boostmap.online', 'streamboo .net', 'streamboo .com', '(remove the space)' ];

// User-ID anhand von Username abrufen
async function getUserId(username) {
    const res = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-ID': clientId
        }
    });

    const data = await res.json();
    return data.data?.[0]?.id || null;
}

// Setup für IDs und Twitch-Verbindung
async function setupConfig() {
    const broadcasterId = await getUserId('dixis333');
    const moderatorId = await getUserId('dix33bot');

    config = {
        accessToken,
        clientId,
        broadcasterId,
        moderatorId
    };
    console.log('🧾 Broadcaster-ID:', broadcasterId);
    console.log('🧾 Moderator-ID:', moderatorId);
}

setupConfig();

// Ban-API aufrufen
async function banUserByUsername(targetUsername) {
    try {
        const userId = await getUserId(targetUsername);
        if (!userId) {
            console.error(`❌ User-ID nicht gefunden für "${targetUsername}"`);
            return;
        }

        const res = await fetch(`https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${config.broadcasterId}&moderator_id=${config.moderatorId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-ID': clientId,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    user_id: userId,
                    reason: 'Automatischer Bann durch Bot wegen Spam.'
                }
            })
        });

        if (res.ok) {
            console.log(`✅ ${targetUsername} wurde gebannt.`);
        } else {
            const err = await res.json();
            console.error(`❌ Fehler beim Bannen:`, err);
        }
    } catch (err) {
        console.error('❌ Fehler bei banUserByUsername():', err);
    }
}

function randomNumber(x)
{
    return Math.floor(Math.random()*x)+1;
}


client.connect();

client.on('connected', (adress, port) => {
    client.action('dixis333', 'is back to the Dönerhof! What is up guys?!');
});





client.on('message', async (channel, tags, message, self) => {
    if (self) return;

    const username = tags.username?.toLowerCase();
    const lowerMsg = message.toLowerCase();

    const isSpam = blacklist.some(entry => lowerMsg.includes(entry));
    if (isSpam) {
        console.log(`🚨 Spam erkannt von ${username}: "${message}"`);
        await banUserByUsername(username);
    }
});



// thisArg - context in which to call the function; 'this' in the function's body
// fn - function to execute on a cooldown
// timeout - number of milliseconds to wait before allowing fn to be called again
var cooldown = function (thisArg, fn, timeout) {
    var onCooldown = false;

    // return a function that can be called the same way as the wrapped function
    return function (/* args */) {

        // only call the original function if it is not on cooldown
        if (!onCooldown) {

            // not on cooldown, so call the function with the correct context
            // and the arguments with which this wrapper was called
            fn.apply(thisArg, arguments);

            // set the cooldown flag so subsequent calls will not execute the function
            onCooldown = true;

            // wait <timeout> milliseconds before allowing the function to be called again
            setTimeout(function () {
                onCooldown = false;
            }, timeout);
        }
    }
}

//RED PANDA PROGRAMMING BEGINNING
function handleSocketConnection(ioClient) {
    console.log("Foxy, the Red Panda, connected!")
}

client.on('message', (channel, tags, message, self) => {
    io.emit('message', { user: tags.username, message });
});

//RED PANDA PROGRAMMING END

//TWITCH-ZITATE
client.on('chat', (channel, user, message, self) => {

    if (message === '!döner') {

        const quotes = [
            'Ich vergas! - AJ',
            'Der Hibiskus ist auch ein Kürbis! - AJ',
            'Annani, Wehlse, Kokonaten... KÜRBEEN! - Dixis',
            `First, let's greet him... Do you have a Penis? - Dixis`,
            `Jesus! - Dixis`,
            'Was viele nicht wissen, Döner wurden in Berlin erfunden! Ist für uns also Hausmannskost! - Dixis',
            'Immer die Milch zuerst! - Niko',
            'Ich berufe mich auf mein Recht der Verwirrung! - Dixis',
            'Simon, 26, Experte darin, Geister zu Tode zu nerven. - Chili',
            'Zero und Zero ergibt Zero! Das weiß doch jeder! - Niko',
            'Can you write in this book?? - Dixis (Phasmophobia)',
            'IIIIIHHHH!! IIIIHHHHH!! *spuckt auf den Boden* - Niko',
            'Weil das Weiß weißer ist als bei dem anderen Weiß! - Dixis',
            `Ich denke mal, wir war'n im gleichen Loch. - Dixis`,
            'Es ist pink. Wie schlimm kann es sein? - Chili',
            'Weil ich ein Fisch bin. - Aljosha',
            'Zeldas Loch ist eine Fairy Fountain. - Aljosha',
            '...Warum? - Dixis',
            'Die Japaner können kein asiatisch? - Aljosha',
            'Ich bin jetzt unsichtbar! ... so halb. - Dixis',
            'Ich bin doch kein Kind, ich lauf die ganze Zeit als Erwachsener rum!! - Dixis',
            'Sascha lacht wie Hintergrundgeräusche. - Weber',
            'aasbhgfvbwbasdfgeghsdab! - Niko',
            'Die Sub-Preise sind günstiger, also auf nach Subway! - Weber',
            'Und Organe sind kein Obst... - Aljosha',
            'Der Name von denen war total einprägsam. Aber ich hab ihn vergessen. - Chili',
            'Die Schuhe machen nur Blumen, aber sie machen Gras nicht zu Gras. - Dzachiel',
            'Man muss Bomben haben, um was mit Bomben machen zu können! - Dixis',
            'Ich will auch eine Karte ziehen! ... Death. *AJ stirbt* - Aljosha',
            'Ich empfehle dir: Sterben. Hilft dir dein Inventar aufzuräumen. - Dixis',
            'Wir brauchen noch 500 rupees für die Naske der Macht! - Aljosha',
            'Da ist ein Krokodil direkt neben unserem Haus! ... Ach, ne, das ist ein Baumstamm. - Dixis',
            'Der Welthunger ist vorbei... Dixis hat Nudelsalat gemacht. - Sebi',
            'Das Wort des Tages: Purmen. Es hat keine Bedeutung. - Dixis',
            'Entweder bin ich Pedophil oder ich ergebe keinen Sinn! - Xenia',
            'Der Typ hier wird executed. Und darum kümmerst du dich direkt, sonst stirbt der nämlich! - Dixis',
            'Keine Sorge ich glaube ganz fest an die Xenia! ... Wir speichern vielleicht vorher lieber mal. - Dixis',
            'Der Cheat ist Random! - Aljosha',
            'Kidney. Lung. Heart. - Dixis',
            'Wachsen Gräser in Jabu-Jabu? - Dixis',
            'Weil ich es gesagt habe, wirst du es so schneiden als hätte ich es gesagt! - AJ',
            'Und in der Kupfermine ist anscheinend ganz viel Kupfer. - Dixis',
            'AJ: "Bei dir kommt auch alles in die Zitateliste!" Dixis: "Das ist ein Zitat!"',
            'Jetzt reicht`s! - Dixis',
            'Ich kann das erklären! - AJ',
            'AJ ist schon wieder zu weit rechts! - Dixis',
            'Dixis ist mein geheimer Lover, aber er weiß es noch nicht! - AJ',
            '@Dixis, Du hast nun 7 Döner! - MEE6-Bot',
            'Nur weil man sich hasst, heißt es nicht, dass man sich nicht mögen muss! - Dixis',
            'Ich bin schon wieder ein weißer Mann! - Xenia'
        ];

        const quote = quotes[randomNumber(quotes.length) - 1];

        client.action('dixis333', quote);
    }
});


client.on('chat', (channel, user, message, self) => {

    if (message === '!playlist') {
        client.action('dixis333', 'Find my Songs on Soundcloud or Bandcamp! https://scyren.bandcamp.com https://soundcloud.com/scyren-production');
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message === '!lurk') {
        client.action('dixis333', `${user['display-name']} is now lurking in the shadows. If you want to support Dixis' Dönerhof make sure to set the stream audio super low rather than muting the stream or your browser, as Twitch does not count you as a view in the latter case.` );
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message === '!youtube') {
        client.action('dixis333', 'Find Highlights and more on my YouTube-Channel! https://www.youtube.com/user/Dixis33/');
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message.includes('!8ball')){

        const answers = [
            'It is certain',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don`t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
            'Bananenbrot.'
        ];

        const n = answers[randomNumber(21) - 1];

        client.action('dixis333', n);
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message === '!discord') {
        client.action('dixis333', 'Tritt dem offiziellen Dönerhof-Discord bei! https://discord.gg/eGk8jgmCFW');
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message === '!love') {
        client.action('dixis333', `<3 <3 <3 ${user['display-name']} wants to spread love all around! <3 <3 <3 Fill the Chat with love for ${user['display-name']} <3 <3 <3`);
    }
});

const res = require('express');
const storage = require('node-persist');

var WdS = false
var WdSCooldown = cooldown(client, client.say, 10000)
var WdSCD = false;


client.on('chat', (channel, user, message, self) => {

    if (
        message === '!WortDerStunde' ||
        message === '!wortderstunde' ||
        message === '!WortderStunde' ||
        message === '!wds' ||
        message === '!WdS'
    ) {

        var timeout = 3600000;

        if (!WdS) {

            const words = [
                'Purmen',
                'Döner',
                'Wort3',
                'Fanta',
                'Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunternehmenbeamtengesellschaft ...Gesundheit!',
                'Mampfen',
                'Reisebüro',
                'Paket',
                'Koala',
                'Schublade',
                'Reife',
                'Botschafter',
                'England',
                'Erektion',
                'Batterien',
                'Silber',
                'Cyanid',
                'Geschenk',
                'Hamster',
                'beachten',
                'Orange',
                'Passage',
                'Motorrad',
                'Nostalgie',
                'Hinweis',
                'Physik',
                'Schrei',
                'platzen',
                'springen',
                'Kirche',
                'Blut',
                'Held',
                'schön',
                'schmerzen',
                'Deodorant',
                'gekocht',
                'Ford',
                'Marken',
                'dunkel',
                'rollen',
                'kopieren',
                'Erweiterung',
                'Laserstrahl',
                'Kettensäge',
                'Gondeln',
                'abfangen',
                'Mexiko',
                'Sauna',
                'Bewegung',
                'Schmelze',
                'Kotstulle',
                'Rieseneinlauf',
                'Barrelroll',
                'schlafen',
                'Supercalifragilisticexpialigetisch - ein Hoch auf diejenigen, die es kennen!',
                'Gehirn',
                'Muffel (das Tier)'
            ];

            WdS = words[randomNumber(words.length) - 1];

            WdSCooldown('dixis333', `Das Wort der Stunde lautet: ${WdS}`);

            setTimeout(function () {
                WdS = false;
            }, timeout);

        }
        else {

            WdSCooldown(
                'dixis333',
                `Das Wort der Stunde wurde bereits genannt. Es lautet: ${WdS}`
            );

        }

    }

});


var Niko = 0;
var NikoCooldown = cooldown(client, client.say, 10000)
var NikoCD = false;

// var app = express();

client.on('chat', (channel, user, message, self) => {


    if (message === '!niko') {
        if (!NikoCD) {
            var timeout = 10000
            Niko++;
            NikoCD = true
            setTimeout(function () {
                NikoCD = false;
            }, timeout);
        }
        NikoCooldown('dixis333', `Niko hat ${Niko} mal RUMGESCHRIEN!!1!`);
        storage.setItem("counter", Niko).then(() => {
            res.json(Niko);
        });
    }
});



client.on('chat', (channel, user, message, self) => {

    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;

    if (isModUp) {

        if (message === '!-niko') {
            Niko--;
            client.action('dixis333', `War wohl doch nur ein Nieser... Neuer Niko-Schrei-Stand: ${Niko}`);
            storage.setItem("counter", Niko).then(() => {
                res.json(Niko);
            });
        }
    }
});

storage.init().then(() => storage.getItem("counter")).then((value) => {

    if (value > 0) {
        Niko = value;
    } else {
        Niko = 0;
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message.includes('!flipacoin')) {

        const results = [
            'Heads.',
            'Tails.'
        ];

        const result = results[randomNumber(results.length) - 1];

        client.action('dixis333', result);
    }
});




client.on('chat', (channel, user, message, self) => {
    const str = message
    const words = str.split(' ');

    if (message === '!hotness')
        client.action('dixis333', `${user['display-name']} on a scale of 1 to 10, you're like a ${eval(randomNumber(10))}`)

   else if (message.startsWith('!hotness')) {
        client.action('dixis333', `${words[1]} on a scale of 1 to 10, you're like a ${eval(randomNumber(10))}`)
    }

});


client.on('chat', (channel, user, message, self) => {
    const str = message
    const words = str.split(' ');

    if (message === '!ban')
        client.action('dixis333', `Type the name of the person you want to ban after the command.`)

    else if (message.startsWith('!ban'))
        client.action('dixis333', `is pretending to ban ${words[1]}. It's not real, but it makes ${user['display-name']} feel better.`)

});




client.on('chat', (channel, user, message, self) => {

    if (message === '!commands') {
        client.action('dixis333', `Find a full list of the commands for this channel here:  https://pastebin.com/uUw7u6Z7`);
    }
});

var ytrCD = false;


client.on('chat', (channel, user, message, self) => {

    setInterval(function() {
            if (!ytrCD) {
                ytrCD = true;
                function func1() {
                    client.action('dixis333', `Vergesst nicht Dixis' YouTube-Channel einen Besuch abzustatten für Stream-Highlights und mehr Horror-Content: https://www.youtube.com/@Dixis33`);
                }

                function func2() {
                    client.action('dixis333', `Kein Horror-Fan? Dann schaut bei Dixis' Side-Channel vorbei, für entspannten Content, wie Stardew-Valley, Simulator-Games und mehr! https://www.youtube.com/@HappyDixis`);
                }

                function func3() {
                    client.action('dixis333', `Habt ihr einen Stream verpasst oder wollt euch die Highlights erneut ansehen? Dann schaut auf Dixis' YouTube-Channels vorbei! Die Links findet ihr unten in den Infos!`);
                }

                function execute()
                {
                    var y = randomNumber(3);
                    eval('func'+y+'()');
                }

                execute();
                setTimeout(function () {
                    ytrCD = false;
                }, 1800000);
            }
    }, 1000);


});

client.on('chat', (channel, user, message, self) => {

    const str = message
    const words = str.split(' ');

    if (message === '!hello')
        client.action('dixis333', `Hello ${user['display-name']}! Welcome to the Stream!`)

    else if (message.startsWith('!hello')) {
        client.action('dixis333', `Hello ${words[1]}! Welcome to the Stream!`);
    }
});


client.on('chat', (channel, user, message, self) => {

    const str = message
    const words = str.split(' ');

    if (message === '!lost')
        client.action('dixis333', `From ${user['display-name']}'s point of view the Jedi are evil! (!IDontGetIt for those who don't get it...)`)

    else if (message.startsWith('!lost')) {
        client.action('dixis333', `From ${words[1]}'s point of view the Jedi are evil! (!IDontGetIt for those who dont get it...)`);
    }
});

client.on('chat', (channel, user, message, self) => {

    if (message === '!IDontGetIt' || message === '!idontgetit' || message === '!IDONTGETIT' || message === '!idgi') {
        client.action('dixis333', `${user['display-name']} does not get the reference of !lost. Everybody laugh at ${user['display-name']} for their lack of Movie-Quote-Knowledge! And here is the reference: https://www.youtube.com/watch?v=KirbH3WDKhk`);
    }
});



client.on('chat', (channel, user, message, self) => {

    if (message === '!uptime') {

        fetch('https://decapi.me/twitch/uptime?channel=dixis333')
            .then(res => res.text())
            .then(body => client.action('dixis333', `Dixis333 has been live for ${body}`));

    }

});

client.on('chat', (channel, user, message, self) => {

    if (message === '!game') {

        fetch('https://decapi.me/twitch/game?channel=dixis333')
            .then(res => res.text())
            .then(body => client.action('dixis333', `Dixis333 is currently playing ${body}`));

    }

});


client.on('chat', (channel, user, message, self) => {

    const str = message
    const words = str.split(' ');

    if (message === '!insult') {

        fetch('https://insult.mattbas.org/api/insult')
            .then(res => res.text())
            .then(body => client.action('dixis333', `${user['display-name']}, ${body}`));

    }

    else if (message.startsWith('!insult')) {

        fetch('https://insult.mattbas.org/api/insult')
            .then(res => res.text())
            .then(body => client.action('dixis333', `${words[1]}, ${body}`));

    }


});


//                  DAS DÖNERGELIUM                   //

client.on('chat', (channel, user, message, self) => {

    if (message === '!advice'){

        function func1() {
            client.action('dixis333', 'Und Dixis sprach: "Lasset den Döner kommen zur Abendstund, auf dass er euch fülle den Magen und Mund." - Zwiebel 3, Vers 5');
        }

        function func2() {
            client.action('dixis333', 'Und so kam Dixis zum Dönermann und ließ verkünden: "So backe mir ein Brot aus Fladen und du sollest es füllen mit reichlich Gut. Von der Zwiebel, über die Tomaten, bis hin zum Fleisch und scharfer Sauce." Und der Dönermann antwortete: "Döner mit alles?" "Ja, Döner mit alles." - neues Dönergelium');
        }

        function func3() {
            client.action('dixis333', '"Lasset den Döner nicht verkommen, sei er doch einmal pro Woche zu dir genommen." - Kebab 12, Vers 15');
        }
        function func4() {
            client.action('dixis333', 'Das erste Gebot des Dönergeliums: Döner mit alles.');
        }

        function func5() {
            client.action('dixis333', 'Das zweite Gebot des Dönergeliums: Du sollst keinen Döner verschwenden.');
        }

        function func6() {
            client.action('dixis333', 'Das dritte Gebot des Dönergeliums: Du sollst den Dönertag heiligen (Hooray auf den Döner-Discount).');
        }
        function func7() {
            client.action('dixis333', 'Das vierte Gebot des Dönergeliums: Du sollst die Freuden des Döners teilen.');
        }

        function func8() {
            client.action('dixis333', 'Das fünfte Gebot des Dönergeliums: Du sollst das Angebot einer Dönereinladung nicht ausschlagen.');
        }

        function func9() {
            client.action('dixis333', 'Das sechste Gebot des Dönergeliums: Du sollst den Hungernden den Döner nicht verwehren.');
        }

        function func10() {
            client.action('dixis333', 'Das siebte Gebot des Dönergeliums: Du sollst keinen Döner schlecht reden (Die Skala der Döner-Beschreibung beginnt bei "Okay" und "in Ordnung").');
        }

        function func11() {
            client.action('dixis333', 'Das achte Gebot des Dönergeliums: Du sollst keine Döner stehlen, auch wenn der Wert des Döners nicht mit Geld gemessen werden kann.');
        }

        function func12() {
            client.action('dixis333', 'Das neunte Gebot des Dönergeliums: Du sollst nicht begehren deines Nächsten Döner (hol dir lieber selbst einen).');
        }

        function func13() {
            client.action('dixis333', 'Das zehnte Gebot des Dönergeliums: Der Döner ist das heiligste aller Gerichte. Glaube an den Döner. Erlange Erlösung durch den Döner, auf dass deine Seele durch seine Erhabenheit Reinheit erlangt.');
        }

        function func14() {
            client.action('dixis333', 'Folge dem Pfad des Gerechten, so dass du dem Döner gerecht werden kannst. - Falafel 9, Vers 1');
        }

        function func15() {
            client.action('dixis333', `Rezept für Döner:`)
            client.action('dixis333', `
Für die Marinade:
½ Knolle/n\tKnoblauch
2 ½\tZwiebel(n)
2 ½ Stängel\tMinze
5 Stängel\tKoriander
2 ½ TL\tPaprikapulver, edelsüß
2 ½ TL\tKreuzkümmelpulver
1 ¼ TL\tThymian
1 ¼ TL\tSalz
½ TL\tPfeffer
15 EL\tOlivenöl
Außerdem: (Brot und Füllung)
15 kleine\tFladenbrot(e), türkische, alternativ 4 große
¼ Kopf\tWeißkohl
¼ Kopf\tRotkohl
½ Kopf\tEisbergsalat
1 große\tZwiebel(n), rot
4\tTomate(n)
1\tGurke(n)
300 g\tFeta-Käse (Weißkäse), türkischer (aus Schaf- oder Kohmilch)
n. B.\tPul Biber optional, zum Nachschärfen
Für die Sauce: (orange Sauce)
300 g\tJoghurt, türkischer oder griechischer
250 ml\tAyran
300 g\tSalatmayonnaise
80 ml\tKetchup
1 Zehe/n\tKnoblauch
4 TL\tZucker
2 EL\tZitronensaft
4 TL\tPaprikapulver, edelsüß
1 TL\tPaprikapulver, rosenscharf
¼ TL\tSalz
½ TL\tKorianderpulver
½ TL\tKreuzkümmelpulver
20 g\tDill
10 g\tPetersilie, glatte
1 TL\tPul Biber
Für die Sauce: (weiße Sauce)
500 g\tJoghurt, türkischer oder griechischer
250 ml\tAyran
125 g\tCrème fraîche
2 Zehe/n\tKnoblauch
½ Pck.\tKräuter, gemischt (TK 8-Kräuter-Mischung)
Salz und Pfeffer`)

            client.action('dixis333', `
Zubereitung

Arbeitszeit ca. 2 Stunden

Ruhezeit ca. 12 Stunden

Koch-/Backzeit ca. 1 Stunde 30 Minuten

Gesamtzeit ca. 15 Stunden 30 Minuten
Fleisch vorbereiten:
Das Fleisch in rund 1-2 cm dicke Streifen schneiden. Wenn möglich, direkt beim Fleischer schneiden lassen, spart sehr viel Arbeit! In der Regel müssen die Scheiben noch halbiert werden, damit sie halbwegs rund/quadratisch sind.
Tipp: Nach Größe sortieren, erleichtert das spätere Schichten!`)

            client.action('dixis333', `
Marinade:
Alle Marinade-Zutaten klein schneiden und das Olivenöl dazugeben. Mit einem Pürierstab zu einer dickflüßigen Masse verarbeiten.

Marinieren:
Die Fleischscheiben mit der Marinade bestreichen und in einem geschlossenen Gefäß für mindestens 12 h in den Kühlschrank stellen (es bietet sich daher an, am Vorabend zu marinieren).

Schichten:
Die Fleischscheiben auf den Drehspieß schichten. Die Fleischscheiben sollten von unten nach oben größer werden. Übrig gebliebene Marinade am geschichteten Spieß verteilen.
Da der fertig geschichtete Spieß in der Regel schlecht in den Kühlschrank passt, empfehle ich, diesen erst kurz vorher fertig zu machen. Wer ihn jedoch vorbereiten will: in Frischhaltefolie einpacken und in den Kühlschrank stellen. Achtung: Es könnte etwas tropfen.

Soßen:
Die Soßenzutaten zerkleinern und vermengen. Am besten schmecken die Soßen, wenn diese ebenfalls über Nacht im Kühlschrank ziehen können.

Füllung:
Die Füllung sollte hingegen erst am Dönertag vorbereitet werden.
Alle Zutaten in getrennte Behälter geben, damit jeder seinen individuellen Döner basteln kann.
Weißkohl, Rotkohl und den Weißkäse in dünne Streifen hobeln. Den Eisbergsalat in dünne Streifen schneiden. Die roten Zwiebeln in dünne (Halb-)Ringe schneiden. Gurke würfeln. Bei den Tomaten das Innenleben entfernen und ebenfalls würfeln.`)


            client.action('dixis333', `
Allgemeine Hinweise:
Einen Dönergrill kann man sich entweder leihen, oder für 70 € bei Pearl kaufen (bitte keine Top-Qualität erwarten; pers. Empfehlung: Schaschlik-Spieße dazubestellen für die Bodenplatte). Professionelle Geräte gehen natürlich auch, sind aber deutlich teurer.
Mein Dönergrill (Pearl,"Rosenstein & Söhne") hat nur 2000 Watt, weshalb nicht alle gleichzeitig essen können. Es dauert jeweils etwa 5-10 Minuten, bis die nächste Ladung Fleisch abgeschnitten werden kann.
Falls der Spieß nicht alle wird, dennoch zu Ende grillen und nach und nach das restliche Fleisch abschneiden. Die Reste kann man am nächsten Tag gut in der Pfanne warm machen.

Ich persönliche finde es am besten, wenn die Dönertasche horizontal mit Fleisch und Gemüse gefüllt wird - so hat man bei jedem Bissen alles dabei. Viele Dönerbuden stapeln leider anders, sodass der letzte Biss nur noch aus Fleisch besteht.

Unbedingt ein scharfes Messer verwenden (die Dönerbuden machen das ständige Messerschärfen ja auch nicht zum Spaß)!
Wer es besonders authentisch mag: Die Döner-Papier-Tütchen bekommt man beim Dönerverkäufer um die Ecke oder online.

Gefunden auf: https://www.chefkoch.de/rezepte/3120461465149366/Doener-Kebab-mit-Fuellung-und-Sossen.html`);

        }

        function func16() {
            client.action('dixis333', 'Lobe den Tag nicht vor dem Dönermahl! - Fleischspieß 7, Vers 13');
        }

        function func17() {
            client.action('dixis333', 'Oh, großer Döner vom Dönerhof! Gib mir den Appetit alle Döner zu essen, die ich essen kann, das Geld die Döner zu kaufen, die ich mir nicht leisten kann, und die Magengröße, beide miteinander zu vereinen.');
        }

        function func18() {
            client.action('dixis333', 'Mit einem Döner im Leben, hat man es leichter.');
        }

        function func19() {
            client.action('dixis333', 'Wo ist`s schön und niemals doof? Na klar, auf dem Dönerhof!');
        }

        function func20() {
            client.action('dixis333', 'Döner am Morgen, vertreibt Kummer und Sorgen!');
        }
        function func21() {
            client.action('dixis333', 'Denn Döner macht schö... Ne, Moment, das ist wo anders her...');
        }

        function func22() {
            client.action('dixis333', 'Den Döner, den du heute kannst besorgen, den verschiebe nicht auf morgen!');
        }

        function execute()
        {
            var y = randomNumber(22);
            eval('func'+y+'()');
        }
        execute();
    }
});





client.on('chat', (channel, user, message, self) => {

    const compliments = [
        'You are as beautiful as the glint of the morning dew, reflecting the first sun rays in the morning.',
        'You are the most important, most beautiful, most magnifiscent person to someone out there, even if he or she doesn\'t know it yet.',
        'You are great, just like you are! Don\'t let anyone tell you otherwise. They are just jealous of your greatness!',
        'Your voice sounds like an orchestra of birds, waking one up with the loveliest sound on a beautiful morning.',
        'Your looks exceed everything I have ever seen before. Their beauty surpasses the sparkling stars on a moonlit summernight, shining down onto the oh so unworthy earth.',
        'You are one of the loveliest beings, that this universe has blessed us with.',
        'Your beauty shines so bright, like the dawn of a thousand suns, withering away every last piece of the darkest night.',
        'If you were a flower, blooming on a sunny day, the sun would shine oh so long, just for you to never go away.',
        'If you were a bird, flying through a windy sky, remember: the wind blows through your feathers, just to touch your beauty, lifting it up so high.',
        'From the highest mountain to the deepest sea: Nobody exceeds your kind, noble and charming persona.'
    ];

    if (message === '!compliment') {

        const name = user['display-name'];
        const compliment = compliments[randomNumber(compliments.length) - 1];

        client.action('dixis333', `${name}, ${compliment}`);
    }

    else if (message.startsWith('!compliment ')) {

        const words = message.split(' ');
        const name = words[1];
        const compliment = compliments[randomNumber(compliments.length) - 1];

        client.action('dixis333', `${name}, ${compliment}`);
    }
});



var IceCooldown = cooldown(client, client.say, 10000)
var Ice = 0
var IceCD = false

client.on('chat', (channel, user, message, self) => {

    if (message === '!ice') {
        if (!IceCD) {
            var timeout = 10000
            Ice++;
            IceCD = true
            setTimeout(function () {
                IceCD = false;
            }, timeout);
        }
        IceCooldown('dixis333', `Dixis wurde ${Ice} mal aufs Glatteis gelegt!`);
        storage.setItem("counter2", Ice).then(() => {
            res.json(Ice);
        });
    }
});



client.on('chat', (channel, user, message, self) => {

    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;


    if (isModUp) {

        if (message === '!-ice') {
            Ice--;
            client.action('dixis333', `Dixis wurde doch nicht auf Eis gelegt! Neuer Stand: ${Ice} mal.`);
            storage.setItem("counter2", Ice).then(() => {
                res.json(Ice);
            });
        }
    }
});



client.on('chat', (channel, user, message, self) => {


    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;

    if (isModUp) {

        if (message === '!icereset') {
            Ice = 0;
            client.action('dixis333', `Eiscounter resettet! Viel Glück bei der nächsten Runde! Neuer Stand: ${Ice}`);
            storage.setItem("counter2", Ice).then(() => {
                res.json(Ice);
            });
        }
    }
});

storage.init().then(() => storage.getItem("counter2")).then((value) => {

    if (value > 0) {
        Ice = value;
    } else {
        Ice = 0;
    }
});


var DeathCooldown = cooldown(client, client.say, 10000)
var Death = 0
var DeathCD = false

client.on('chat', (channel, user, message, self) => {

    if (message === '!dead') {
        if (!DeathCD) {
            var timeout = 10000
            Death++;
            DeathCD = true
            setTimeout(function () {
                DeathCD = false;
            }, timeout);
        }
        DeathCooldown('dixis333', `Dixis und Tritos sind bereits ${Death} mal gestorben! Strengt euch mal mehr an! ... Fricking Noobs!`);
        storage.setItem("counter3", Death).then(() => {
            res.json(Death);
        });
    }
});



client.on('chat', (channel, user, message, self) => {

    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;


    if (isModUp) {

        if (message === '!-dead') {
            Death--;
            client.action('dixis333', `Wait, that one didn't count! Neuer Todes-Stand: ${Death}.`);
            storage.setItem("counter3", Death).then(() => {
                res.json(Death);
            });
        }
    }
});



client.on('chat', (channel, user, message, self) => {


    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;

    if (isModUp) {

        if (message === '!deadreset') {
            Death = 0;
            client.action('dixis333', `Deathcounter resettet! Viel Glück bei der nächsten Runde! Neuer Stand: ${Death}`);
            storage.setItem("counter3", Death).then(() => {
                res.json(Death);
            });
        }
    }
});

storage.init().then(() => storage.getItem("counter3")).then((value) => {

    if (value > 0) {
        Death = value;
    } else {
        Death = 0;
    }
});



client.on('chat', (channel, user, message, self) => {

    const str = message
    const words = str.split(' ');

    let isMod = user.mod || user['user-type'] === 'mod';
    let isBroadcaster = channel.slice(1) === user.username;
    let isModUp = isMod || isBroadcaster;

    if (isModUp) {
        if (message.startsWith('!shoutout')) {
            client.action('dixis333', `Shoutout to: www.twitch.tv/${words[1]}`);
        }
    }
});



client.on('chat', (channel, user, message, self) => {
    if (message === '!FC') {
        client.action('dixis333', `Foxy currently responds to:`);
        client.action('dixis333', `- A lot of greetings`);
        client.action('dixis333', `- Curse-Words (Don't use them!)`);
    }
});


// COMMAND FOR DUAL STREAM!!!
client.on('chat', (channel, user, message, self) => {
// COMMAND FOR DUAL STREAM!!!
    if (message === '!rando') {
        client.action('dixis333', `Watch all of the streamers' perspectives by going to: https://www.multitwitch.tv/NONAME/dixis333/`);
    }
});
// COMMAND FOR DUAL STREAM!!!


client.on('chat', (channel, user, message, self) => {
    if (message === '!RNJesus' || message === '!rnjesus') {
        client.action('dixis333', `Get RNJesus here:`);
        client.action('dixis333', `https://github.com/Scyren/RNJesus`);
    }
});


// DIXIS DISCUSSIONS THEMA
client.on('chat', (channel, user, message, self) => {
    if (message === '!discussion') {
        client.action('dixis333', `Das Thema dieser Woche lautet "Das Fermi-Paradoxon"! Die heutigen Gäste und eifrigen Diskussionsteilnehmer sind: Niko & Steffen`);
    }
});


