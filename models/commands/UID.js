module.exports.config = {
	name: "uid",
	version: "1.0.0",
	permission: 0,
	credits: "Aaryan (Fixed by ChatGPT)",
	usePrefix: false,
	description: "Get user ID from mention, reply, link, or yourself.",
	commandCategory: "without prefix",
	cooldowns: 5
};

module.exports.run = async function({ event, api, args, Users }) {
	const fs = global.nodemodule["fs-extra"];
	const request = global.nodemodule["request"];
	const axios = global.nodemodule["axios"];
	const cachePath = __dirname + "/cache/1.png";
	const accessToken = "6628568379|c1e620fa708a1d5696fb991c1bde5662";

	async function sendUID(uid, name, threadID, messageID) {
		const callback = () => {
			api.sendMessage({
				body: `=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n[➤]➜ 𝗡𝗔𝗠𝗘:${name}\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ 𝗜𝗗: ${uid}\n[ ▶️]➜ 𝗜𝗕: m.me/${uid}\n[ ▶️]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`,
				attachment: fs.createReadStream(cachePath)
			}, threadID, () => fs.unlinkSync(cachePath), messageID);
		};

		request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=${accessToken}`))
			.pipe(fs.createWriteStream(cachePath))
			.on("close", () => callback());
	}

	try {
		// Case 1: Reply to message
		if (event.type === "message_reply") {
			const uid = event.messageReply.senderID;
			await sendUID(uid, await Users.getNameUser(uid), event.threadID, event.messageID);
			return;
		}

		// Case 2: No arguments - use senderID
		if (!args[0]) {
			const uid = event.senderID;
			await sendUID(uid, await Users.getNameUser(uid), event.threadID, event.messageID);
			return;
		}

		// Case 3: Facebook profile link
		if (args[0].includes(".com/")) {
			const res_ID = await api.getUID(args[0]);
			const data = await api.getUserInfoV2(res_ID);
			await sendUID(res_ID, data.name, event.threadID, event.messageID);
			return;
		}

		// Case 4: Mention
		if (args.join(" ").includes("@")) {
			const mentionIDs = Object.keys(event.mentions);
			if (mentionIDs.length > 0) {
				const uid = mentionIDs[0];
				await sendUID(uid, await Users.getNameUser(uid), event.threadID, event.messageID);
				return;
			}
		}

		// Fallback - invalid usage
		api.sendMessage("Please reply to a message, tag a user, or input a valid Facebook profile link.", event.threadID, event.messageID);

	} catch (error) {
		console.error(error);
		api.sendMessage("An error occurred while fetching the UID. Please try again later.", event.threadID, event.messageID);
	}
};
