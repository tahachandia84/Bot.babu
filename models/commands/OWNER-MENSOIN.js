module.exports.config = {
  name: "ADMIN",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "THIS BOT WAS MADE BY MR ARIF BABU",
  commandCategory: "ADMIN MENTION",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100085636015827") {
];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["taha babu busy ha 🙄", "meri jan taha apk pass ha"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
