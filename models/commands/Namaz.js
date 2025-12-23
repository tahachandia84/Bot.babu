const fs = require("fs-extra");

module.exports.config = {
  name: "namaztime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Auto Namaz Time Reminder",
  usePrefix: false,
  commandCategory: "Islamic",
  cooldowns: 5
};

// ===== IMAGES =====
const quranPics = [
  'https://i.ibb.co/8gWzFpqV/bbc9bf12376e.jpg',
  'https://i.ibb.co/DgGmLMTL/2a27f2cecc80.jpg',
  'https://i.ibb.co/Kz8CBZBD/db27a4756c35.jpg',
  'https://i.ibb.co/zTKnLMq9/c52345ec3639.jpg',
  'https://i.ibb.co/8gfGBHDr/8e3226ab3861.jpg',
  'https://i.ibb.co/WNK2Dbbq/ffed087e09a5.jpg',
  'https://i.ibb.co/hRVXMQhz/fe5e09877fa8.jpg'
];

const namazPics = [
  'https://i.ibb.co/sp39k0CY/e2630b0f2713.jpg',
  'https://i.ibb.co/BKdttjgN/8cd831a43211.jpg',
  'https://i.ibb.co/Q3hVDVMr/c0de33430ba4.jpg',
  'https://i.ibb.co/7td1kK7W/6d713bbe5418.jpg'
];

// ===== AYATS =====
const quranAyats = [
  { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", urdu: "بے شک مشکل کے ساتھ آسانی ہے", surah: "Ash-Sharh: 6" },
  { arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ", urdu: "تم مجھے یاد کرو میں تمہیں یاد کروں گا", surah: "Al-Baqarah: 152" },
  { arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", urdu: "اللہ ہمیں کافی ہے", surah: "Al-Imran: 173" },
  { arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا", urdu: "اے رب میرے علم میں اضافہ فرما", surah: "Ta-Ha: 114" }
];

// ===== NAMAZ TIMES =====
const namazTimes = {
  fajr: { time: '05:43', name: 'Fajr' },
  dhuhr: { time: '12:23', name: 'Dhuhr' },
  asr: { time: '16:07', name: 'Asr' },
  maghrib: { time: '17:43', name: 'Maghrib' },
  isha: { time: '19:04', name: 'Isha' }
};

// ===== AUTO SYSTEM =====
module.exports.onLoad = async function ({ api }) {
  setInterval(async () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    for (const key in namazTimes) {
      if (namazTimes[key].time === currentTime) {

        const ayat = quranAyats[Math.floor(Math.random() * quranAyats.length)];
        const image = namazPics[Math.floor(Math.random() * namazPics.length)];

        const msg = 
`🕌 NAMAZ TIME 🕌

🕰 ${namazTimes[key].name}
📖 ${ayat.surah}

${ayat.arabic}
${ayat.urdu}

🤲 Allah hume namaz ka paband banaye 🤍`;

        const threads = await api.getThreadList(100, null, ["INBOX", "GROUP"]);

        for (const thread of threads) {
          api.sendMessage(
            {
              body: msg,
              attachment: await global.utils.getStreamFromURL(image)
            },
            thread.threadID
          );
        }
      }
    }
  }, 60000); // 1 minute check
};

// ===== MANUAL CHECK COMMAND =====
module.exports.run = async function ({ api, event }) {
  api.sendMessage("🕰 Namaz Time System Active Hai 🤍", event.threadID);
};
