module.exports.config = {
  name: "krishna",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "KRISHNA BABU",
  description: "Krishna dp",
  usePrefix: true,
  commandCategory: "Random-IMG",
  usages: "krishna babu",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg","https://i.postimg.cc/85TTPv2P/PROFILE.jpg",
     ];
     var callback = () => api.sendMessage({body:`┏━━━━━┓\n     KRISHNA-BABU                    ✧═══•❁😛❁•═══✧\n┗━━━━━┛\n\nDEKH LO MARA BOSS KRISHNA BABU KO SABSE ALAG MASOOM SA CHEHRA BHOLE SE SURAT AANKH ME PYAR DIL ME BUKHAR ♥️`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   }
