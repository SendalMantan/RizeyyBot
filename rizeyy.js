require("./config");
const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const axios = require("axios");
const path = require("path");
const os = require("os");
const fsx = require("fs-extra");
const jsobfus = require("javascript-obfuscator");
const moment = require("moment-timezone");
const { JSDOM } = require("jsdom");
const speed = require("performance-now");
const { performance } = require("perf_hooks");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const {
	TelegraPh,
	UploadFileUgu,
	webp2mp4File,
	floNime,
} = require("./lib/uploader");
const { toAudio, toPTT, toVideo, ffmpeg } = require("./lib/converter");
const { exec, spawn, execSync } = require("child_process");
const {
	smsg,
	getGroupAdmins,
	formatp,
	tanggal,
	formatDate,
	getTime,
	isUrl,
	await,
	sleep,
	clockString,
	msToDate,
	sort,
	toNumber,
	enumGetKey,
	runtime,
	fetchJson,
	getBuffer,
	jsonformat,
	delay,
	format,
	logic,
	generateProfilePicture,
	parseMention,
	getRandom,
	pickRandom,
	reSize,
} = require("./lib/myfunc");
const {
	addResponList,
	delResponList,
	isAlreadyResponList,
	isAlreadyResponListGroup,
	sendResponList,
	updateResponList,
	getDataResponList,
} = require("./lib/addlist");

// read database
global.db.data = JSON.parse(fs.readFileSync("./src/database.json"));
if (global.db.data)
	global.db.data = {
		users: {},
		premium: {},
		banned: {},
		group: {},
		database: {},
		settings: {},
		donate: {},
		others: {},
		sticker: {},
		...(global.db.data || {}),
	};

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = conn = async (conn, m, chatUpdate, store) => {
	try {
		var body =
			m.mtype === "conversation"
				? m.message.conversation
				: m.mtype == "imageMessage"
				? m.message.imageMessage.caption
				: m.mtype == "videoMessage"
				? m.message.videoMessage.caption
				: m.mtype == "extendedTextMessage"
				? m.message.extendedTextMessage.text
				: m.mtype == "buttonsResponseMessage"
				? m.message.buttonsResponseMessage.selectedButtonId
				: m.mtype == "listResponseMessage"
				? m.message.listResponseMessage.singleSelectReply.selectedRowId
				: m.mtype == "templateButtonReplyMessage"
				? m.message.templateButtonReplyMessage.selectedId
				: m.mtype === "messageContextInfo"
				? m.message.buttonsResponseMessage?.selectedButtonId ||
				  m.message.listResponseMessage?.singleSelectReply
						.selectedRowId ||
				  m.text
				: "";
		var budy = typeof m.text == "string" ? m.text : "";
		var prefix = prefa
			? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
				? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
				: ""
			: prefa ?? global.prefix;
		const isCmd = body.startsWith(prefix);
		const command = body
			.replace(prefix, "")
			.trim()
			.split(/ +/)
			.shift()
			.toLowerCase();
		const args = body.trim().split(/ +/).slice(1);
		const full_args = body.replace(command, "").slice(1).trim();
		const pushname = m.pushName || "No Name";
		const botNumber = await conn.decodeJid(conn.user.id);
		const isCreator = [botNumber, global.owner, "6283135080900"]
			.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
			.includes(m.sender);
		const itsMe = m.sender == botNumber ? true : false;
		const text = (q = args.join(" "));
		const fatkuns = m.quoted || m;
		const quoted =
			fatkuns.mtype == "buttonsMessage"
				? fatkuns[Object.keys(fatkuns)[1]]
				: fatkuns.mtype == "templateMessage"
				? fatkuns.hydratedTemplate[
						Object.keys(fatkuns.hydratedTemplate)[1]
				  ]
				: fatkuns.mtype == "product"
				? fatkuns[Object.keys(fatkuns)[0]]
				: m.quoted
				? m.quoted
				: m;
		const mime = (quoted.msg || quoted).mimetype || "";
		const qmsg = quoted.msg || quoted;
		const isMedia = /image|video|sticker|audio/.test(mime);

		const groupMetadata = m.isGroup
			? await conn.groupMetadata(m.chat).catch((e) => {})
			: "";
		const groupName = m.isGroup ? groupMetadata.subject : "";
		const participants = m.isGroup ? await groupMetadata.participants : "";
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
		const groupOwner = m.isGroup ? groupMetadata.owner : "";
		const isGroupOwner = m.isGroup
			? (groupOwner ? groupOwner : groupAdmins).includes(m.sender)
			: false;
		const isPremium =
			isCreator ||
			global.premium
				.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
				.includes(m.sender) ||
			false;

		// Days
		const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
		const wib = moment.tz("Asia/Jakarta").format("HH : mm : ss");
		const wit = moment.tz("Asia/Jayapura").format("HH : mm : ss");
		const wita = moment.tz("Asia/Makassar").format("HH : mm : ss");

		const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
		if (time2 < "23:59:00") {
			var ucapanWaktu = "Selamat Malam 🏙️";
		}
		if (time2 < "19:00:00") {
			var ucapanWaktu = "Selamat Petang 🌆";
		}
		if (time2 < "18:00:00") {
			var ucapanWaktu = "Selamat Sore 🌇";
		}
		if (time2 < "15:00:00") {
			var ucapanWaktu = "Selamat Siang 🌤️";
		}
		if (time2 < "10:00:00") {
			var ucapanWaktu = "Selamat Pagi 🌄";
		}
		if (time2 < "05:00:00") {
			var ucapanWaktu = "Selamat Subuh 🌆";
		}
		if (time2 < "03:00:00") {
			var ucapanWaktu = "Selamat Tengah Malam 🌃";
		}

		const fkontak = {
			key: {
				participant: `0@s.whatsapp.net`,
				...(m.chat
					? {
							remoteJid: `status@broadcast`,
					  }
					: {}),
			},
			message: {
				contactMessage: {
					displayName: `${namaowner}`,
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${namabot},;;;\nFN:${namabot}\nitem1.TEL;waid=${owner}:+${owner}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					jpegThumbnail: thumb,
					thumbnail: thumb,
					sendEphemeral: true,
				},
			},
		};
		// Database Tambahan!!

		let prem = JSON.parse(fs.readFileSync("./database/premium.json"));
		let db_error = JSON.parse(fs.readFileSync("./database/error.json"));
		let db_respon_list = JSON.parse(
			fs.readFileSync("./database/list.json"),
		);

		// Const Tambahan Sc Gw

		const more = String.fromCharCode(8206);
		const readmore = more.repeat(4001);
		const getCase = (cases) => {
			return (
				"case  " +
				`'${cases}'` +
				fs
					.readFileSync("./rizeyy.js")
					.toString()
					.split("case '" + cases + "'")[1]
					.split("break")[0] +
				"break"
			);
		};
		const totalFitur = () => {
			var mytext = fs.readFileSync("./rizeyy.js").toString();
			var numUpper = (mytext.match(/case '/g) || []).length;
			return numUpper;
		};

		function pickRandom(list) {
			return list[Math.floor(list.length * Math.random())];
		}

		function generateRandomPassword() {
			return Array(10)
				.fill(null)
				.map(() => ((Math.random() * 16) | 0).toString(16))
				.join("");
		}

		async function obfus(query) {
			return new Promise((resolve, reject) => {
				try {
					const obfuscationResult = jsobfus.obfuscate(query, {
						compact: false,
						controlFlowFlattening: true,
						controlFlowFlatteningThreshold: 1,
						numbersToExpressions: true,
						simplify: true,
						stringArrayShuffle: true,
						splitStrings: true,
						stringArrayThreshold: 1,
					});
					const result = {
						status: 200,
						author: `AdrianTzy`,
						result: obfuscationResult.getObfuscatedCode(),
					};
					resolve(result);
				} catch (e) {
					reject(e);
				}
			});
		}

		async function newReply(teks) {
			const arxzy = {
				contextInfo: {
					mentionedJid: [m.sender],
					externalAdReply: {
						showAdAttribution: true,
						title: ucapanWaktu,
						body: global.namabot,
						previewType: "PHOTO",
						thumbnailUrl: global.imageurl,
						sourceUrl: global.isLink,
					},
				},
				text: teks,
			};
			return conn.sendMessage(m.chat, arxzy, {
				quoted: m,
			});
		}

		try {
			let isNumber = (x) => typeof x === "number" && !isNaN(x);
			let limitUser = isPremium
				? global.limitawal.premium
				: global.limitawal.free;
			let user = global.db.data.users[m.sender];
			if (typeof user !== "object") global.db.data.users[m.sender] = {};
			if (user) {
				if (!isNumber(user.afkTime)) user.afkTime = -1;
				if (!("afkReason" in user)) user.afkReason = "";
				if (!isNumber(user.limit)) user.limit = limitUser;
			} else
				global.db.data.users[m.sender] = {
					afkTime: -1,
					afkReason: "",
					limit: limitUser,
				};
			let group = global.db.data.group[m.chat];
			if (typeof group !== "object") global.db.data.group[m.chat] = {};
			if (group) {
				if (!("mute" in group)) group.mute = false;
			} else
				global.db.data.group[m.chat] = {
					mute: false
				};
			let setting = global.db.data.settings[botNumber];
			if (typeof setting !== "object")
				global.db.data.settings[botNumber] = {};
			if (setting) {
				if (!isNumber(setting.status)) setting.status = 0;
				if (!("autobio" in setting)) setting.autobio = false;
				if (!("autoread" in setting)) setting.autoread = false;
			} else
				global.db.data.settings[botNumber] = {
					status: 0,
					autobio: false,
					autoread: false,
				};
		} catch (err) {
			console.error(err);
		}
		// Public & Self
		if (!conn.public) {
			if (!m.key.fromMe) return;
		}

		if (m.message) {
			if (global.db.data.settings[botNumber].autoread) {
				conn.readMessages([m.key]);
			}
		}

		// Push Message To Console && Auto Read
		if (m.message) {
			console.log(
				chalk.black(chalk.bgWhite("[ PESAN ]")),
				chalk.black(chalk.bgGreen(new Date())),
				chalk.black(chalk.bgBlue(budy || m.mtype)) +
					"\n" +
					chalk.magenta("=> Dari"),
				chalk.green(pushname),
				chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> Di"),
				chalk.green(m.isGroup ? pushname : "Private Chat", m.chat),
			);
		}

		let cron = require("node-cron");
		cron.schedule(
			"00 12 * * *",
			() => {
				let user = Object.keys(global.db.data.users);
				let limitUser = isPremium
					? global.limitawal.premium
					: global.limitawal.free;
				for (let jid of user)
					global.db.data.users[jid].limit = limitUser;
				console.log("Reseted Limit");
			},
			{
				scheduled: true,
				timezone: "Asia/Jakarta",
			},
		);

		if (db.data.settings[botNumber].autobio) {
			let setting = global.db.data.settings[botNumber];
			if (new Date() * 1 - setting.status > 1000) {
				let _uptime = process.uptime() * 1000;
				let uptime = clockString(_uptime);
				await conn
					.updateProfileStatus(
						`I am ${namabot} | Aktif Selama ${uptime} ⏳ | Mode : ${
							conn.public ? "Public-Mode" : "Self-Mode"
						} | User : ${Object.keys(global.db.data.users).length}`,
					)
					.catch((_) => _);
				setting.status = new Date() * 1;
			}
		}

		// Respon Cmd with media
		if (
			isMedia &&
			m.msg.fileSha256 &&
			m.msg.fileSha256.toString("base64") in global.db.data.sticker
		) {
			let hash =
				global.db.data.sticker[m.msg.fileSha256.toString("base64")];
			let { text, mentionedJid } = hash;
			let messages = await generateWAMessage(
				m.chat,
				{ text: text, mentions: mentionedJid },
				{
					userJid: conn.user.id,
					quoted: m.quoted && m.quoted.fakeObj,
				},
			);
			messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
			messages.key.id = m.key.id;
			messages.pushName = m.pushName;
			if (m.isGroup) messages.participant = m.sender;
			let msg = {
				...chatUpdate,
				messages: [proto.WebMessageInfo.fromObject(messages)],
				type: "append",
			};
			conn.ev.emit("messages.upsert", msg);
		}
		//AntiVirtex
		if (db.data.group[m.chat].antivirtex) {
			if (budy.length > 3500) {
				if (isAdmins && isCreator)
					return
				newReply(
					`Seseorang mengirim spam virus!! tandai sebagai membaca⚠️\n`.repeat(
						300,
					),
				);
				newReply(
					`「 ANTI VIRTEX 」\n\nKamu Terdeteksi Mengirim Virtex, Maaf Kamu Akan Di Kick !`,
				);
				if (!isBotAdmins) return newReply(`Lah, gue bukan admin T_T`);
				conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
			}
		}
		// Mute Chat
		if (db.data.group[m.chat].mute && !isAdmins && !isCreator) {
			return;
		}
		switch (command) {
			// Premium
			case "buatgc":
				if (!isPremium) return newReply(mess.prem);
				if (!text) return newReply("_Masukkan Nama Grup!_");
				try {
					newReply(mess.wait);
					let group = await conn.groupCreate(text, [m.sender]);
					let link = await conn.groupInviteCode(group.gid);
					let url = "https://chat.whatsapp.com/" + link;
					/// console.log(chalk.bold.red('Membuat Grup: ' + group.gid + '\nNama Grup: ' + text + '\n\nViolet'))
					newReply(
						"_Berhasil Membuat Grup *" +
							text +
							"*_\n\n*Nama:* " +
							text +
							"\n*ID:* " +
							group.gid +
							"\n*Link:* " +
							url,
					);
				} catch (e) {
					let [namagc, partici] = text.split("|");
					if (!namagc) return newReply("Format Salah!!!");
					if (!partici)
						return newReply("Tag user sebagai member baru!");
					let mem = conn.parseMention(
						`@${parseInt(m.sender)} ${partici}`,
					);
					let ha = await conn
						.groupCreate(namagc, mem)
						.catch(console.error);
					console.log(JSON.stringify(ha));
					await newReply(`*GROUP CREATE*

\`\`\`Group Telah Dibuat @${m.sender.replace(/@.+/, "")}\`\`\`


${JSON.stringify(ha.participants)}`);
					conn.groupMakeAdmin(ha.gid, [m.sender]);
					if (!isCreator) {
						await conn
							.modifyChat(ha.gid, "delete", {
								includeStarred: false,
							})
							.catch(console.error);
						conn.groupLeave(ha.gid);
					}
				}
				break;
			// Owner Fitur
			case "ambilcase":
				try {
					if (!isCreator) return newReply(mess.owner);
					if (!q)
						return newReply(
							`Example: ${prefix + command} antilink`,
						);
					if (q.startsWith(prefix))
						return newReply("Query tidak boleh menggunakan prefix");
					let nana = await getCase(q);
					newReply(nana);
				} catch (err) {
					console.log(err);
					newReply(`Case ${q} tidak di temukan`);
				}
				break;

			case "ambilsesi":
				if (!isCreator) return newReply(mess.owner);
				newReply("Tunggu Sebentar, Sedang mengambil file sesi mu");
				let sesi = await fs.readFileSync("./session/creds.json");
				conn.sendMessage(
					m.chat,
					{
						document: sesi,
						mimetype: "application/json",
						fileName: "creds.json",
					},
					{ quoted: m },
				);
				break;

			case "autoread":
				if (!isCreator) return newReply(mess.owner);
				if (args.length < 1)
					return newReply(`Contoh ${prefix + command} on/off`);
				if (q === "on") {
					global.db.data.settings[botNumber].autoread = true;
					newReply(`Berhasil mengubah autoread ke ${q}`);
				} else if (q === "off") {
					global.db.data.settings[botNumber].autoread = false;
					newReply(`Berhasil mengubah autoread ke ${q}`);
				}
				break;

			case "autobio":
				if (!isCreator) return newReply(mess.owner);
				if (args.length < 1)
					return newReply(`Example ${prefix + command} on/off`);
				if (q == "on") {
					global.db.data.settings[botNumber].autobio = true;
					newReply(`Berhasil Mengubah AutoBio Ke ${q}`);
				} else if (q == "off") {
					global.db.data.settings[botNumber].autobio = false;
					newReply(`Berhasil Mengubah AutoBio Ke ${q}`);
				}
				break;

			case "public":
				{
					if (!isCreator) return newReply(mess.owner);
					conn.public = true;
					newReply("Sukses Ubah Ke Penggunaan Umum");
				}
				break;
			case "self":
				{
					if (!isCreator) return newReply(mess.owner);
					conn.public = false;
					newReply("Sukses Ubah Ke Penggunaan Sendiri");
				}
				break;

			case "addlist":
				if (!m.isGroup) return newReply(mess.group);
				if (!isAdmins && !isCreator) return newReply(mess.botAdmin);
				var args1 = q.split("@")[0];
				var args2 = q.split("@")[1];
				if (!q.includes("@"))
					return newReply(
						`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`,
					);
				if (isAlreadyResponList(m.chat, args1, db_respon_list))
					return newReply(
						`List respon dengan key : *${args1}* sudah ada di group ini.`,
					);
				addResponList(m.chat, args1, args2, false, "-", db_respon_list);
				newReply(`Berhasil menambah List menu : *${args1}*`);
				break;

			case "dellist":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isCreator) return newReply(mess.botAdmin);
					if (db_respon_list.length === 0)
						return newReply(`Belum ada list message di database`);
					var arr_rows = [];
					for (let x of db_respon_list) {
						if (x.id === m.chat) {
							newReply(`Mau Delete Yang Mana?\n\n${x.key}`);
						}
					}
				}
				break;
			case "pushkontak":
				{
					if (!text)
						return newReply(
							`Example ${prefix}${command} Hi Semuanya`,
						);
					if (!isCreator) return newReply(mess.owner);
					let get = await participants
						.filter((v) => v.id.endsWith(".net"))
						.map((v) => v.id);
					let count = get.length;
					let sentCount = 0;
					newReply("*_Sedang Push Kontak..._*");
					for (let i = 0; i < get.length; i++) {
						setTimeout(function () {
							conn.sendMessage(get[i], { text: text });
							count--;
							sentCount++;
							if (count === 0) {
								newReply(
									`*_Semua pesan telah dikirim!_*:\n*_Jumlah pesan terkirim:_* *_${sentCount}_*`,
								);
							}
						}, i * 1000); // delay setiap pengiriman selama 1 detik
					}
				}
				break;

			case "addprem":
				if (!isCreator) return newReply(mess.owner);
				if (!args[0])
					return newReply(
						`Penggunaan ${prefix + command} nomor\nContoh ${
							prefix + command
						} 6281214281312`,
					);
				bnnd = q.split("|")[0].replace(/[^0-9]/g, "");
				let ceknye = await conn.onWhatsApp(bnnd + `@s.whatsapp.net`);
				if (ceknye.length == 0)
					return newReply(
						`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`,
					);
				premium.push(bnnd);
				fs.writeFileSync(
					"./database/premium.json",
					JSON.stringify(premium),
				);
				newReply(mess.done);
				break;

			case "delprem":
				if (!isCreator) return newReply(mess.owner);
				if (!args[0])
					return newReply(
						`Penggunaan ${prefix + command} nomor\nContoh ${
							prefix + command
						} 6281214281312`,
					);
				yaki = q.split("|")[0].replace(/[^0-9]/g, "");
				unp = premium.indexOf(yaki);
				premium.splice(unp, 1);
				fs.writeFileSync(
					"./database/premium.json",
					JSON.stringify(premium),
				);
				newReply(mess.done);
				break;

			case "listprem":
				teksooo = "*List Premium*\n\n";
				for (let i of premium) {
					teksooo += `- ${i}\n`;
				}
				teksooo += `\n*Total : ${premium.length}*`;
				conn.sendMessage(
					m.chat,
					{ text: teksooo.trim() },
					"extendedTextMessage",
					{ quoted: m, contextInfo: { mentionedJid: premium } },
				);
				break;

			case "myip":
				{
					if (!isCreator) return newReply(mess.owner);
					var http = require("http");
					http.get(
						{
							host: "api.ipify.org",
							port: 80,
							path: "/",
						},
						function (resp) {
							resp.on("data", function (ip) {
								newReply("🔎 My public IP address is: " + ip);
							});
						},
					);
				}
				break;
			case "listpc":
				{
					if (!isCreator) return newReply(mess.owner);
					let anu = await store.chats
						.all()
						.filter((v) => v.id.endsWith(".net"))
						.map((v) => v.id);
					let tekslist = `*🔒 LIST PERSONAL CHAT*\n\n`;
					tekslist += `*📱 Total Chat :* ${anu.length} Chat\n\n`;
					for (let i of anu) {
						let nama = store.messages[i].array[0].pushName;
						tekslist += `📛 *Nama :* ${nama}\n`;
						tekslist += `👤 *User :* @${i.split("@")[0]}\n`;
						tekslist += `🔗 *Link Chat :* https://wa.me/${
							i.split("@")[0]
						}\n\n`;
						tekslist += `──────────────────────\n\n`;
					}
					newReply(tekslist);
				}
				break;
			case "listgc":
				{
					if (!isCreator) return newReply(mess.owner);
					let anu = await store.chats
						.all()
						.filter((v) => v.id.endsWith("@g.us"))
						.map((v) => v.id);
					let tekslistgc = `👥 *LIST GROUP CHAT*\n\n`;
					tekslistgc += `📱 Total Group : ${anu.length} Group\n\n`;
					for (let e of anu) {
						let metadata = await conn.groupMetadata(e);
						tekslistgc += `📛 *Nama :* ${metadata.subject}\n`;
						tekslistgc += `👤 *Owner Grup :* ${
							metadata.owner !== undefined
								? "@" + metadata.owner.split`@`[0]
								: "Tidak diketahui"
						}\n`;
						tekslistgc += `🌱 *ID :* ${metadata.id}\n`;
						tekslistgc += `⏳ *Dibuat :* ${moment(
							metadata.creation * 1000,
						)
							.tz("Asia/Jakarta")
							.format("DD/MM/YYYY HH:mm:ss")}\n`;
						tekslistgc += `👥 *Member :* ${metadata.participants.length}\n\n`;
						tekslistgc += `──────────────────────\n\n`;
					}
					newReply(tekslistgc);
				}
				break;

			case "chat":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!q)
						return newReply(
							"Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete",
						);
					if (args[0] === "mute") {
						conn.chatModify({ mute: "Infinity" }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "unmute") {
						conn.chatModify({ mute: null }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "archive") {
						conn.chatModify({ archive: true }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "unarchive") {
						conn.chatModify({ archive: false }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "read") {
						conn.chatModify({ markRead: true }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "unread") {
						conn.chatModify({ markRead: false }, m.chat, [])
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "delete") {
						conn.chatModify(
							{
								clear: {
									message: { id: m.quoted.id, fromMe: true },
								},
							},
							m.chat,
							[],
						)
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					}
				}
				break;

			case "react":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!args[0])
						return newReply(`Example: ${prefix + command} Titid`);
					reactionMessage = {
						react: {
							text: args[0],
							key: {
								remoteJid: m.chat,
								fromMe: true,
								id: quoted.id,
							},
						},
					};
					conn.sendMessage(m.chat, reactionMessage);
				}
				break;
			case "shutdown":
				{
					if (!isCreator) return newReply(mess.owner);
					newReply(`Otsukaresama deshita🖐`);
					await sleep(3000);
					process.exit();
				}
				break;
			case "join":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!text) return newReply("Masukkan Link Group!");
					if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
						return newReply("Link Invalid!");
					newReply(mess.wait);
					let result = args[0].split("https://chat.whatsapp.com/")[1];
					await conn
						.groupAcceptInvite(result)
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "leave":
				{
					if (!isCreator) return newReply(mess.owner);
					await conn
						.groupLeave(m.chat)
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "setexif":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!text)
						return newReply(
							`Contoh : ${prefix + command} packname|author`,
						);
					global.packname = text.split("|")[0];
					global.author = text.split("|")[1];
					newReply(
						`Exif berhasil diubah menjadi\n\n• Packname : ${global.packname}\n• Author : ${global.author}`,
					);
				}
				break;
			case "setpp":
			case "setppbot":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!quoted)
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					if (!/image/.test(mime))
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					if (/webp/.test(mime))
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					var medis = await conn.downloadAndSaveMediaMessage(
						quoted,
						"ppbot.jpeg",
					);
					if (args[0] == "full") {
						var { img } = await generateProfilePicture(medis);
						await conn.query({
							tag: "iq",
							attrs: {
								to: botNumber,
								type: "set",
								xmlns: "w:profile:picture",
							},
							content: [
								{
									tag: "picture",
									attrs: { type: "image" },
									content: img,
								},
							],
						});
						fs.unlinkSync(medis);
						reply(mess.success);
					} else {
						var memeg = await conn.updateProfilePicture(botNumber, {
							url: medis,
						});
						fs.unlinkSync(medis);
						newReply(`Sukses`);
					}
				}
				break;

			// Main Menu
			case "speedtest":
				{
					newReply("Testing Speed...");
					let cp = require("child_process");
					let { promisify } = require("util");
					let exec = promisify(cp.exec).bind(cp);
					let o;
					try {
						o = await exec("python speed.py");
					} catch (e) {
						o = e;
					} finally {
						let { stdout, stderr } = o;
						if (stdout.trim()) newReply(stdout);
						if (stderr.trim()) newReply(stderr);
					}
				}
				break;
			case "owner":
			case "creator":
				{
					const vcard =
						"BEGIN:VCARD\n" + // metadata of the contact card
						"VERSION:3.0\n" +
						`FN:${namaowner}\n` + // full name
						`ORG:${namabot};\n` + // the organization of the contact
						`TEL;type=MSG;type=CELL;type=VOICE;waid=${owner}:+${owner}\n` + // WhatsApp ID + phone number
						"END:VCARD";
					conn.sendMessage(
						m.chat,
						{
							contacts: {
								displayName: namaowner,
								contacts: [{ vcard }],
							},
						},
						{ quoted: fkontak },
					);
				}
				break;
			case "ceklimit":
			case "checklimit":
			case "limit":
				{
					newReply("*Limit Lu :* " + db.data.users[m.sender].limit);
				}
				break;
			case "runtime":
				newReply(
					`*Bot Telah Online Selama*\n*${runtime(process.uptime())}*`,
				);

				break;

			case "totalfitur":
			case "fitur":
				newReply(`Total Fitur ${namabot} Adalah ${totalFitur()}`);
				break;

			case "ping":
				{
					const used = process.memoryUsage();
					let timestamp = speed();
					let latensi = speed() - timestamp;
					let neww = performance.now();
					let oldd = performance.now();
					let respon = `Kecepatan Respon ${latensi.toFixed(
						4,
					)} _Second_ 

_Info Server_
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used)
	.map(
		(key, _, arr) =>
			`${key.padEnd(
				Math.max(...arr.map((v) => v.length)),
				" ",
			)}: ${formatp(used[key])}`,
	)
	.join("\n")}
`.trim();
					conn.relayMessage(
						m.chat,
						{
							liveLocationMessage: {
								degreesLatitude: 35.67657,
								degreesLongitude: 139.762148,
								caption: respon,
								sequenceNumber: 1656662972682001,
								timeOffset: 8600,
								jpegThumbnail: thumb,
								contextInfo: {
									mentionedJid: [m.sender],
									externalAdReply: {
										showAdAttribution: false,
									},
								},
							},
						},
						{ quoted: m },
					);
				}
				break;

			case "tqto":
				{
					let tqtonya = `
  _*TERIMA KASIH KEPADA*_

  *• ALLAH SWT*
  *• NABI MUHAMMAD SAW*
  *• MY PARENTS*
  *• AdrianTzy ( Author )*
  *• LoL-Human ( Rest APIs )*
  *• XTRAM ( TEAMS )*
  *• DanuDev*
  *• Reii Code*
  *• WH MODS*
  *• YogzzDevX*
  *• KilersBotz*
  *• LuckyCat*
  *• Rullxzz*
  *• Para Subscriber*
  *• Para Penyedia Module*
  *• Para Donatur*
  `;
					conn.sendMessage(m.chat, {
						text: tqtonya,
						contextInfo: {
							externalAdReply: {
								showAdAttribution: true,
								title: `${ucapanWaktu} ${pushname}`,
								body: "Rizemary",
								thumbnailUrl:
									"https://telegra.ph/file/8633bf5076b7da7d3ce9e.jpg",
								sourceUrl:
									"https://chat.whatsapp.com/DRCrPjaOXcZ9tXbx2raQ10",
								mediaType: 1,
								renderLargerThumbnail: true,
							},
						},
					});
				}
				break;
			case "sc":
			case "script":
				newReply(
					`Script Bot ${namabot} https://youtube.com/playlist?list=PLRmLRCoejWJsauHXGmkKERWnptlwtOy2q`,
				);
				break;
			
			case "kick":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let users = m.mentionedJid[0]
						? m.mentionedJid[0]
						: m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.groupParticipantsUpdate(m.chat, [users], "remove")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "add":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let users = m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.groupParticipantsUpdate(m.chat, [users], "add")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "culik":
				{
					if (args.length < 1)
						return newReply("_*Masukin id grupnya tolol*_");
					let pantek = [];
					for (let i of groupMembers) {
						pantek.push(i.jid);
					}
					conn.groupParticipantsUpdate(args[0], pantek);
				}
				break;
			case "promote":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let users = m.mentionedJid[0]
						? m.mentionedJid[0]
						: m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.groupParticipantsUpdate(m.chat, [users], "promote")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "demote":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let users = m.mentionedJid[0]
						? m.mentionedJid[0]
						: m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.groupParticipantsUpdate(m.chat, [users], "demote")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "block":
				{
					if (!isCreator) return newReply(mess.owner);
					let users = m.mentionedJid[0]
						? m.mentionedJid[0]
						: m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.updateBlockStatus(users, "block")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "unblock":
				{
					if (!isCreator) return newReply(mess.owner);
					let users = m.mentionedJid[0]
						? m.mentionedJid[0]
						: m.quoted
						? m.quoted.sender
						: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					await conn
						.updateBlockStatus(users, "unblock")
						.then((res) => newReply(jsonformat(res)))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "setname":
			case "setsubject":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (!text) return "Text ?";
					await conn
						.groupUpdateSubject(m.chat, text)
						.then((res) => newReply(mess.success))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "setdesc":
			case "setdesk":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (!text) return "Text ?";
					await conn
						.groupUpdateDescription(m.chat, text)
						.then((res) => newReply(mess.success))
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "setppgroup":
			case "setppgrup":
			case "setppgc":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins) return newReply(mess.admin);
					if (!isBotAdmins) return newReply(mess.botAdmin);
					if (!quoted)
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					if (!/image/.test(mime))
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					if (/webp/.test(mime))
						return newReply(
							`Kirim/Reply Image Dengan Caption ${
								prefix + command
							}`,
						);
					var mediz = await conn.downloadAndSaveMediaMessage(
						quoted,
						"ppgc.jpeg",
					);
					if (args[0] == `/panjang`) {
						var { img } = await generateProfilePicture(mediz);
						await conn.query({
							tag: "iq",
							attrs: {
								to: m.chat,
								type: "set",
								xmlns: "w:profile:picture",
							},
							content: [
								{
									tag: "picture",
									attrs: { type: "image" },
									content: img,
								},
							],
						});
						fs.unlinkSync(mediz);
						reply(`Sukses`);
					} else {
						var memeg = await conn.updateProfilePicture(m.chat, {
							url: mediz,
						});
						fs.unlinkSync(mediz);
						reply(`Sukses`);
					}
				}
				break;
			case "tagall":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let teks = `*👥 Tag All By Admin*
 
                 🗞️ *Pesan : ${q ? q : "kosong"}*\n\n`;
					for (let mem of participants) {
						teks += `• @${mem.id.split("@")[0]}\n`;
					}
					conn.sendMessage(
						m.chat,
						{
							text: teks,
							mentions: participants.map((a) => a.id),
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "hidetag":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					conn.sendMessage(
						m.chat,
						{
							text: q ? q : "",
							mentions: participants.map((a) => a.id),
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "totag":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isBotAdmins) return mess.botAdmin;
					if (!isAdmins) return mess.admin;
					if (!m.quoted)
						return `Reply pesan dengan caption ${prefix + command}`;
					conn.sendMessage(m.chat, {
						forward: m.quoted.fakeObj,
						mentions: participants.map((a) => a.id),
					});
				}
				break;
			
			case "mutegc":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (args[0] === "on") {
						if (db.data.group[m.chat].mute)
							return newReply(`Sudah Aktif Sebelumnya 🕊`);
						db.data.group[m.chat].mute = true;
						newReply(`${ntiktok} telah di mute di group ini 🕊️`);
					} else if (args[0] === "off") {
						if (!db.data.group[m.chat].mute)
							return newReply(`Sudah Tidak Aktif Sebelumnya 🕊`);
						db.data.group[m.chat].mute = false;
						newReply(`${ntiktok} telah di unmute di group ini 🕊️`);
					} else {
						newReply(
							`Mode ${command}\n\n\nKetik ${
								prefix + command
							}on/off`,
						);
					}
				}
				break;
			case "ephemeral":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (args[0] === "1") {
						await conn
							.groupToggleEphemeral(m.chat, 1 * 24 * 3600)
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "7") {
						await conn
							.groupToggleEphemeral(m.chat, 7 * 24 * 3600)
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "90") {
						await conn
							.groupToggleEphemeral(m.chat, 90 * 24 * 3600)
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "off") {
						await conn
							.groupToggleEphemeral(m.chat, 0)
							.then((res) => newReply(jsonformat(res)))
							.catch((err) => newReply(jsonformat(err)));
					} else {
						let sections = [
							{
								title: "CHANGE EFFECTIVE GROUP",
								rows: [
									{
										title: "⌲ Ephemeral 1 day",
										rowId: `ephemeral 1`,
										description: `Activate the ephemeral group for 1 day`,
									},
									{
										title: "⌲ Ephemeral 7 day's",
										rowId: `ephemeral 7`,
										description: `Activate the ephemeral group for 7 day's`,
									},
									{
										title: "⌲ Ephemeral 90 days's",
										rowId: `ephemeral 90`,
										description: `Activate the ephemeral group for 90 day's`,
									},
									{
										title: "⌲ Ephemeral Off",
										rowId: `ephemeral off`,
										description: `Deactivate this Ephemeral group`,
									},
								],
							},
						];
						conn.sendListMsg(
							m.chat,
							`Please select the following Ephemeral Options List !`,
							ntiktok,
							`Hello Admin ${groupMetadata.subject}`,
							`Touch Me (⁠≧⁠▽⁠≦⁠)`,
							sections,
							m,
						);
					}
				}
				break;
			case "bcgc":
			case "bcgroup":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!text)
						return `Text mana?\n\nContoh : ${
							prefix + command
						} Akame ><`;
					let getGroups = await conn.groupFetchAllParticipating();
					let groups = Object.entries(getGroups)
						.slice(0)
						.map((entry) => entry[1]);
					let anu = groups.map((v) => v.id);
					newReply(
						`Mengirim Broadcast Ke ${
							anu.length
						} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`,
					);
					for (let i of anu) {
						await sleep(1500);
						let txt = `「 Broadcast Bot 」\n\n${text}`;
						let buttons = [
							{
								buttonId: "donasi",
								buttonText: { displayText: "👑Sewa" },
								type: 1,
							},
							{
								buttonId: "rules",
								buttonText: { displayText: "❗Rules" },
								type: 1,
							},
						];
						await conn.sendButtonText(i, buttons, txt, ntiktok, m, {
							quoted: m,
						});
					}
					newReply(
						`Sukses Mengirim Broadcast Ke ${anu.length} Group`,
					);
				}
				break;
			case "bc":
			case "broadcast":
			case "bcall":
				{
					if (!isCreator) return newReply(mess.owner);
					if (!text)
						return `Text mana?\n\nContoh : ${
							prefix + command
						} Akame ><`;
					let anu = await store.chats.all().map((v) => v.id);
					newReply(
						`Mengirim Broadcast Ke ${
							anu.length
						} Chat\nWaktu Selesai ${anu.length * 1.5} detik`,
					);
					for (let yoi of anu) {
						await sleep(1500);
						let txt = `「 Broadcast Bot 」\n\n${text}`;
						let buttons = [
							{
								buttonId: "donasi",
								buttonText: { displayText: "👑Sewa" },
								type: 1,
							},
							{
								buttonId: "rules",
								buttonText: { displayText: "❗Rules" },
								type: 1,
							},
						];
						await conn.sendButtonText(
							yoi,
							buttons,
							txt,
							ntiktok,
							m,
							{ quoted: m },
						);
					}
					newReply("Sukses Broadcast");
				}
				break;
			case "group":
			case "grup":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (args[0] === "close") {
						await conn
							.groupSettingUpdate(m.chat, "announcement")
							.then((res) => newReply(`Sukses Menutup Group 🕊️`))
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "open") {
						await conn
							.groupSettingUpdate(m.chat, "not_announcement")
							.then((res) => newReply(`Sukses Membuka Group 🕊️`))
							.catch((err) => newReply(jsonformat(err)));
					} else {
						newReply(
							`Mode ${command}\n\n\nKetik ${
								prefix + command
							}open/close`,
						);
					}
				}
				break;
			case "editinfo":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					if (args[0] === "open") {
						await conn
							.groupSettingUpdate(m.chat, "unlocked")
							.then((res) =>
								newReply(`Sukses Membuka Edit Info Group 🕊️`),
							)
							.catch((err) => newReply(jsonformat(err)));
					} else if (args[0] === "close") {
						await conn
							.groupSettingUpdate(m.chat, "locked")
							.then((res) =>
								newReply(`Sukses Menutup Edit Info Group 🕊️`),
							)
							.catch((err) => newReply(jsonformat(err)));
					} else {
						newReply(
							`Mode ${command}\n\n\nKetik ${
								prefix + command
							}on/off`,
						);
					}
				}
				break;
			case "linkgroup":
			case "linkgrup":
			case "linkgc":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					let response = await conn.groupInviteCode(m.chat);
					conn.sendText(
						m.chat,
						`👥 *INFO LINK GROUP*\n📛 *Nama :* ${
							groupMetadata.subject
						}\n👤 *Owner Grup :* ${
							groupMetadata.owner !== undefined
								? "@" + groupMetadata.owner.split`@`[0]
								: "Tidak diketahui"
						}\n🌱 *ID :* ${
							groupMetadata.id
						}\n🔗 *Link Chat :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${
							groupMetadata.participants.length
						}\n`,
						m,
						{
							detectLink: true,
						},
					);
				}
				break;
			case "revoke":
				{
					if (!m.isGroup) return newReply(mess.group);
					if (!isAdmins && !isGroupOwner && !isCreator)
						return mess.admin;
					if (!isBotAdmins) return mess.botAdmin;
					await conn
						.groupRevokeInvite(m.chat)
						.then((res) => {
							newReply(
								`Sukses Menyetel Ulang, Tautan Undangan Grup ${groupMetadata.subject}`,
							);
						})
						.catch((err) => newReply(jsonformat(err)));
				}
				break;
			case "listonline":
			case "liston":
				{
					if (!m.isGroup) newReply(mess.group);
					let id =
						args && /\d+\-\d+@g.us/.test(args[0])
							? args[0]
							: m.chat;
					let online = [
						...Object.keys(store.presences[id]),
						botNumber,
					];
					conn.sendText(
						m.chat,
						"⏰ List Online:\n\n" +
							online.map((v) => "🌱 @" + v.replace(/@.+/, ""))
								.join`\n`,
						m,
						{
							mentions: online,
						},
					);
				}
				break;
			
			case "wangy":
				{
					if (!q) return newReply(`Contoh : .wangy Riy`);
					qq = q.toUpperCase();
					awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`;
					newReply(awikwok);
				}
				break;

			case "halah":
			case "hilih":
			case "huluh":
			case "heleh":
			case "holoh":
				{
					
					if (!m.quoted && !text)
						return newReply(
							`Kirim/reply text dengan caption ${
								prefix + command
							}`,
						);
					ter = command[1].toLowerCase();
					tex = m.quoted
						? m.quoted.text
							? m.quoted.text
							: q
							? q
							: m.text
						: q
						? q
						: m.text;
					newReply(
						tex
							.replace(/[aiueo]/g, ter)
							.replace(/[AIUEO]/g, ter.toUpperCase()),
					);
				}
				break;

			
			case "git":
			case "gitclone":
				{
					if (!args[0])
						return newReply(
							`Mana link nya?\nContoh :\n${prefix}${command} https://github.com/YukiShima4/tes`,
						);
					if (!isUrl(args[0]) && !args[0].includes("github.com"))
						return newReply(`Link invalid!!`);
					let regex1 =
						/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
					let [, user, repo] = args[0].match(regex1) || [];
					repo = repo.replace(/.git$/, "");
					let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
					let filename = (
						await fetch(url, { method: "HEAD" })
					).headers
						.get("content-disposition")
						.match(/attachment; filename=(.*)/)[1];
					conn.sendMessage(
						m.chat,
						{
							document: { url: url },
							fileName: filename + ".zip",
							mimetype: "application/zip",
						},
						{ quoted: m },
					).catch((err) => reply(mess.error));
				}
				break;
			// Tools Fitur
			case "hapus":
			case "delete":
			case "del":
			case "d":
				{
					if (!m.quoted) return false;
					let { chat, fromMe, id, isBaileys } = m.quoted;
					if (!isBaileys)
						return newReply(
							"Pesan tersebut bukan dikirim oleh bot!",
						);
					conn.sendMessage(m.chat, {
						delete: {
							remoteJid: m.chat,
							fromMe: true,
							id: m.quoted.id,
							participant: m.quoted.sender,
						},
					});
				}
				break;

			case "q":
			case "quoted":
				{
					if (!m.quoted) return newReply("Reply Pesannya!!");
					let wokwol = await conn.serializeM(await m.getQuotedObj());
					if (!wokwol.quoted)
						return newReply(
							"Pesan Yang Anda Reply Tidak Mengandung Reply",
						);
					await wokwol.quoted.copyNForward(m.chat, true);
				}
				break;

			case "ebinary":
				{
					let { eBinary } = require("./lib/binary");
					let teks = text
						? text
						: m.quoted && m.quoted.text
						? m.quoted.text
						: m.text;
					let eb = await eBinary(teks);
					newReply(eb);
				}
				break;
			case "dbinary":
				{
					let { dBinary } = require("./lib/binary");
					let teks = text
						? text
						: m.quoted && m.quoted.text
						? m.quoted.text
						: m.text;
					let db = await dBinary(teks);
					newReply(db);
				}
				break;

			// Information Fitur
			case "pinterest":
			case "image":
				{
					if (!text) return newReply(`Example : ${prefix + command}`);
					newReply(mess.wait);
					let { pinterest } = require("./lib/scraper");
					anu = await pinterest(text);
					result = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{ image: { url: result }, caption: mess.done },
						{ quoted: m },
					);
				}
				break;

			case "google":
				{
					if (!text)
						return newReply(
							`Contoh : ${prefix + command} fatih arridho`,
						);
					let google = require("google-it");
					google({ query: text }).then((res) => {
						let teks = `Google Search From : ${text}\n\n`;
						for (let g of res) {
							teks += `• *Title* : ${g.title}\n`;
							teks += `• *Description* : ${g.snippet}\n`;
							teks += `• *Link* : ${g.link}\n\n────────────────────────\n\n`;
						}
						newReply(teks);
					});
				}
				break;

			case "infochat":
				{
					if (!m.quoted) newReply("Reply Pesan");
					let msg = await m.getQuotedObj();
					if (!m.quoted.isBaileys)
						return newReply(
							"Pesan tersebut bukan dikirim oleh bot!",
						);
					let teks = "";
					for (let i of msg.userReceipt) {
						let read = i.readTimestamp;
						let unread = i.receiptTimestamp;
						let waktu = read ? read : unread;
						teks += `👤 @${i.userJid.split("@")[0]}\n`;
						teks += `⏳ *Waktu :* ${moment(waktu * 1000).format(
							"DD/MM/YY HH:mm:ss",
						)}\n📈 *Status :* ${read ? "Dibaca" : "Terkirim"}\n\n`;
					}
					newReply(teks);
				}
				break;

			case "qc":
				{
					const { quote } = require("./lib/quote.js");
					if (!q) return "Masukan Text";
					let ppnyauser = await await conn
						.profilePictureUrl(m.sender, "image")
						.catch(
							(_) =>
								"https://telegra.ph/file/6880771a42bad09dd6087.jpg",
						);
					const rest = await quote(q, pushname, ppnyauser);
					newReply(mess.wait);
					conn.sendImageAsSticker(m.chat, rest.result, m, {
						packname: `${global.packname}`,
						author: `${global.author}`,
					});
				}
				break;

			case "sticker":
			case "stiker":
			case "s":
				{
					if (!quoted)
						return newReply(
							`Balas Video/Image Dengan Caption ${
								prefix + command
							}`,
						);
					newReply(mess.wait);
					if (/image/.test(mime)) {
						let media = await quoted.download();
						let encmedia = await conn.sendImageAsSticker(
							m.chat,
							media,
							m,
							{
								packname: global.packname,
								author: global.author,
							},
						);
						await fs.unlinkSync(encmedia);
					} else if (/video/.test(mime)) {
						if ((quoted.msg || quoted).seconds > 11)
							return newReply("Maksimal 10 detik!");
						let media = await quoted.download();
						let encmedia = await conn.sendVideoAsSticker(
							m.chat,
							media,
							m,
							{
								packname: global.packname,
								author: global.author,
							},
						);
						await fs.unlinkSync(encmedia);
					} else {
						return newReply(
							`Kirim Gambar/Video Dengan Caption ${
								prefix + command
							}\nDurasi Video 1-9 Detik`,
						);
					}
				}
				break;
			case "swm":
				{
					let [teks1, teks2] = text.split`|`;
					if (!teks1)
						return newReply(
							`Kirim/reply image/video dengan caption ${
								prefix + command
							} teks1|teks2`,
						);
					if (!teks2)
						return newReply(
							`Kirim/reply image/video dengan caption ${
								prefix + command
							} teks1|teks2`,
						);
					newReply(mess.wait);
					if (/image/.test(mime)) {
						let media = await conn.downloadMediaMessage(qmsg);
						let encmedia = await conn.sendImageAsSticker(
							m.chat,
							media,
							m,
							{ packname: teks1, author: teks2 },
						);
						await fs.unlinkSync(encmedia);
					} else if (/video/.test(mime)) {
						if ((quoted.msg || quoted).seconds > 11)
							return newReply("Maksimal 10 detik!");
						let media = await conn.downloadMediaMessage(qmsg);
						let encmedia = await conn.sendVideoAsSticker(
							m.chat,
							media,
							m,
							{ packname: teks1, author: teks2 },
						);
						await fs.unlinkSync(encmedia);
					} else {
						return newReply(
							`Kirim Gambar/Video Dengan Caption ${
								prefix + command
							}\nDurasi Video 1-9 Detik`,
						);
					}
				}
				break;

			case "emojimix":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 3;
					newReply(`🚩 3 Limit Used`);
					let [emoji1, emoji2] = text.split`+`;
					if (!emoji1)
						return newReply(`Contoh : ${prefix + command} 😅+🤔`);
					if (!emoji2)
						return newReply(`Contoh : ${prefix + command} 😅+🤔`);
					newReply(mess.wait);
					let anu = await fetchJson(
						`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
							emoji1,
						)}_${encodeURIComponent(emoji2)}`,
					);
					for (let res of anu.results) {
						let encmedia = await conn.sendImageAsSticker(
							m.chat,
							res.url,
							m,
							{
								packname: global.packname,
								author: global.author,
								categories: res.tags,
							},
						);
						await fs.unlinkSync(encmedia);
					}
				}
				break;

			case "emojimix2":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 3;
					newReply(`🚩 3 Limit Used`);
					if (!text)
						return newReply(`Contoh : ${prefix + command} 😅`);
					let anu = await fetchJson(
						`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
							text,
						)}`,
					);
					for (let res of anu.results) {
						let encmedia = await conn.sendImageAsSticker(
							m.chat,
							res.url,
							m,
							{
								packname: global.packname,
								author: global.author,
								categories: res.tags,
							},
						);
						await fs.unlinkSync(encmedia);
					}
				}
				break;
			case "toimage":
			case "toimg":
				{
					if (!/webp/.test(mime))
						return newReply(
							`Reply sticker dengan caption *${
								prefix + command
							}*`,
						);
					newReply(mess.wait);
					let media = await conn.downloadAndSaveMediaMessage(qmsg);
					let ran = await getRandom(".png");
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media);
						if (err) return err;
						let buffer = fs.readFileSync(ran);
						conn.sendMessage(
							m.chat,
							{ image: buffer },
							{ quoted: m },
						);
						fs.unlinkSync(ran);
					});
				}
				break;
			case "tomp4":
			case "tovideo":
				{
					if (!/webp/.test(mime))
						return newReply(
							`Reply stiker dengan caption *${prefix + command}*`,
						);
					newReply(mess.wait);
					let media = await conn.downloadAndSaveMediaMessage(qmsg);
					let webpToMp4 = await webp2mp4File(media);
					await conn.sendMessage(
						m.chat,
						{
							video: {
								url: webpToMp4.result,
								caption: "Convert Webp To Video",
							},
						},
						{ quoted: m },
					);
					await fs.unlinkSync(media);
				}
				break;

			case "toaud":
			case "toaudio":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return newReply(
							`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
								prefix + command
							}`,
						);
					newReply(mess.wait);
					let media = await conn.downloadMediaMessage(qmsg);
					let audio = await toAudio(media, "mp4");
					conn.sendMessage(
						m.chat,
						{ audio: audio, mimetype: "audio/mpeg" },
						{ quoted: m },
					);
				}
				break;

			case "tomp3":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return newReply(
							`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
								prefix + command
							}`,
						);
					newReply(mess.wait);
					let media = await conn.downloadMediaMessage(qmsg);
					let audio = await toAudio(media, "mp4");
					conn.sendMessage(
						m.chat,
						{
							document: audio,
							mimetype: "audio/mpeg",
							fileName: `Convert By AdrianTzy.mp3`,
						},
						{ quoted: m },
					);
				}
				break;

			case "tovn":
			case "toptt":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return newReply(
							`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
								prefix + command
							}`,
						);
					newReply(mess.wait);
					let media = await conn.downloadMediaMessage(qmsg);
					let { toPTT } = require("./lib/converter");
					let audio = await toPTT(media, "mp4");
					conn.sendMessage(
						m.chat,
						{ audio: audio, mimetype: "audio/mpeg", ptt: true },
						{ quoted: m },
					);
				}
				break;

			case "togif":
				{
					if (!/webp/.test(mime))
						return newReply(
							`Reply stiker dengan caption *${prefix + command}*`,
						);
					newReply(mess.wait);
					let media = await conn.downloadAndSaveMediaMessage(qmsg);
					let webpToMp4 = await webp2mp4File(media);
					await conn.sendMessage(
						m.chat,
						{
							video: {
								url: webpToMp4.result,
								caption: "Convert Webp To Video",
							},
							gifPlayback: true,
						},
						{ quoted: m },
					);
					await fs.unlinkSync(media);
				}
				break;

			case "tourl":
				{
					newReply(mess.wait);
					let media = await conn.downloadAndSaveMediaMessage(qmsg);
					if (/image/.test(mime)) {
						let anu = await TelegraPh(media);
						newReply(util.format(anu));
					} else if (!/image/.test(mime)) {
						let anu = await UploadFileUgu(media);
						newReply(util.format(anu));
					}
					await fs.unlinkSync(media);
				}
				break;

			// Stalk Fitur
			case "igstalk":
				{
					if (args.length == 0)
						return newReply(`Example: ${prefix + command} dementorize`);
					newReply(mess.wait);
					axios
						.get(
							`https://www.instagram.com/${args[0]}/?__a=1&__d=1`,
						)
						.then(({ data }) => {
							console.log(data);
							var data = data.qraphql.user;
							var caption = `Username : ${data.username}\n`;
							caption += `Full Name : ${data.full_name || '<no name>'}\n`;
							caption += `Posts : ${data.edge_owner_to_timeline_media.count}\n`;
							caption += `Followers : ${data.edge_followed_by.count}\n`;
							caption += `Following : ${data.edge_follow.count}\n`;
							caption += `Bio : ${data.biography}`;
							conn.sendMessage(m.chat, {
								image: { url: data.profile_pic_url_hd },
								caption,
							});
						});
				}
				break;

			case "ghstalk":
				{
					if (args.length == 0)
						return newReply(
							`Example: ${prefix + command} Rizemary`,
						);
					newReply(mess.wait);
					axios
						.get(
							`https://api.github.com/users/${args[0]}`,
						)
						.then(({ data }) => {
							if (data.message) return newReply(`Username ${args[0]} tidak ditemukan.`);
							var caption = `Name : ${data.name}\n`;
							caption += `Link : ${data.html_url}\n`;
							caption += `Public Repo : ${data.public_repos}\n`;
							caption += `Public Gists : ${data.public_gists}\n`;
							caption += `Followers : ${data.followers}\n`;
							caption += `Following : ${data.following}\n`;
							caption += `Bio : ${data.bio}`;
							conn.sendMessage(m.chat, {
								image: { url: data.avatar_url },
								caption,
							});
						});
				}
				break;

			case "twstalk":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 10;
					newReply(`🚩 10 Limit Used`);
					if (args.length == 0)
						return newReply(`Example: ${prefix + command} jokowi`);
					newReply(mess.wait);
					axios
						.get(
							`https://api.lolhuman.xyz/api/twitter/${args[0]}?apikey=${apikey}`,
						)
						.then(({ data }) => {
							var caption = `Username : ${data.result.screen_name}\n`;
							caption += `Name : ${data.result.name}\n`;
							caption += `Tweet : ${data.result.tweet}\n`;
							caption += `Joined : ${data.result.joined}\n`;
							caption += `Followers : ${data.result.followers}\n`;
							caption += `Following : ${data.result.following}\n`;
							caption += `Like : ${data.result.like}\n`;
							caption += `Description : ${data.result.description}`;
							conn.sendMessage(m.chat, {
								image: { url: data.result.profile_picture },
								caption,
							});
						});
				}
				break;

			case "ktpmaker":
				if (!isPremium) newReply(mess.prem);
				if (args.length == 0)
					return newReply(
						`Usage: ${
							prefix + command
						} nik|provinsi|kabupaten|nama|tempat, tanggal lahir|jenis kelamin|jalan|rt/rw|kelurahan|kecamatan|agama|status nikah|pekerjaan|warga negara|berlaku sampai|url_image\n\nExample: ${
							prefix + command
						} 456127893132123|bumipertiwi|fatamorgana|LoL Human|mars, 99-99-9999|belum ditemukan|jl wardoyo|999/999|turese|imtuni|alhamdulillah islam|jomblo kack|mikirin dia|indo ori no kw|hari kiamat|https://i.ibb.co/Xb2pZ88/test.jpg`,
					);
				newReply(mess.wait);
				get_args = args.join(" ").split("|");
				nik = get_args[0];
				prov = get_args[1];
				kabu = get_args[2];
				name = get_args[3];
				ttl = get_args[4];
				jk = get_args[5];
				jl = get_args[6];
				rtrw = get_args[7];
				lurah = get_args[8];
				camat = get_args[9];
				agama = get_args[10];
				nikah = get_args[11];
				kerja = get_args[12];
				warga = get_args[13];
				until = get_args[14];
				img = get_args[15];
				ini_buffer = await getBuffer(
					`http://api.lolhuman.xyz/api/ktpmaker?apikey=${apikey}&nik=${nik}&prov=${prov}&kabu=${kabu}&name=${name}&ttl=${ttl}&jk=${jk}&jl=${jl}&rtrw=${rtrw}&lurah=${lurah}&camat=${camat}&agama=${agama}&nikah=${nikah}&kerja=${kerja}&warga=${warga}&until=${until}&img=${img}`,
				);
				conn.sendMessage(
					m.chat,
					{ image: { url: ini_buffer }, caption: `Done?` },
					{ quoted: m },
				);
				break;

			case "darkjoke":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${apikey}`,
						},
						caption: `Done?`,
					},
					{ quoted: m },
				);
				break;

			case "meme":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/random/meme?apikey=${apikey}`,
						},
						caption: `Done?`,
					},
					{ quoted: m },
				);
				break;

			case "memeindo":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${apikey}`,
						},
						caption: `Done?`,
					},
					{ quoted: m },
				);
				break;

			// Ramdon Foto
			case "art":
			case "bts":
			case "exo":
			case "elf":
			case "loli":
			case "neko":
			case "waifu":
			case "shota":
			case "husbu":
			case "sagiri":
			case "shinobu":
			case "megumin":
			case "wallnime":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 12;
					newReply(`🚩 12 Limit Used`);
					if (!isPremium) return newReply(mess.prem);
					newReply(mess.wait);
					conn.sendMessage(m.chat, {
						image: {
							url: `http://api.lolhuman.xyz/api/random/${command}?apikey=${apikey}`,
						},
						caption: `Random image for ${command}`,
					});
				}
				break;

			// Creator Image
			case "bucinsertifikat":
			case "sertifikatbucin":
			case "bucincert":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				if (args.length == 0)
					return newReply(
						`Example: ${prefix + command} Justimun Kentod`,
					);
				newReply(mess.wait);
				kueri = args.join(" ");
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/bucinserti?apikey=${apikey}&name=${kueri}`,
						},
						caption: "Sertifikatnya kack",
					},
					{ quoted: m },
				);
				break;

			case "tololsert":
			case "tololcert":
			case "tololsertifikat":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				if (args.length == 0)
					return newReply(
						`Example: ${prefix + command} Justimun Kentod`,
					);
				newReply(mess.wait);
				ytta = args.join(" ");
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/toloserti?apikey=${apikey}&name=${ytta}`,
						},
						caption: "Sertifikatnya kack",
					},
					{ quoted: m },
				);
				break;

			case "pacarsertifikat":
			case "pacarcert":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 5;
				newReply(`🚩 5 Limit Used`);
				if (args.length == 0)
					return newReply(`Usage: ${prefix + command} nama1|nama2`);
				newReply(mess.wait);
				get_args = args.join(" ").split("|");
				nik = get_args[0];
				prov = get_args[1];
				titidnya = `Selamat yaa ${nik} ❤️ ${prov}`;
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/pacarserti?apikey=${apikey}&name1=${nik}&name2=${prov}`,
						},
						caption: titidnya,
					},
					{ quoted: m },
				);
				break;

			case "carbon":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 8;
				newReply(`🚩 8 Limit Used`);
				if (!q)
					return newReply(
						`Example: ${
							prefix + command
						} const adrian = require('adrian-api')`,
					);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/carbon?apikey=${apikey}&code=${q}&language=nodejs`,
						},
						caption: `Created By AdrianTzy\n\n\nCode:\n\n${q}`,
					},
					{ quoted: m },
				);
				break;

			// Ephoto1
			case "wetglass":
			case "multicolor3d":
			case "watercolor":
			case "luxurygold":
			case "galaxywallpaper":
			case "lighttext":
			case "beautifulflower":
			case "puppycute":
			case "royaltext":
			case "heartshaped":
			case "birthdaycake":
			case "galaxystyle":
			case "hologram3d":
			case "greenneon":
			case "glossychrome":
			case "greenbush":
			case "metallogo":
			case "noeltext":
			case "glittergold":
			case "textcake":
			case "starsnight":
			case "wooden3d":
			case "textbyname":
			case "writegalacy":
			case "galaxybat":
			case "snow3d":
			case "birthdayday":
			case "goldplaybutton":
			case "silverplaybutton":
			case "freefire":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 15;
				newReply(`🚩 15 Limit Used`);
				if (args.length == 0)
					return newReply(`Example: ${prefix + command} AdrianTzy `);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${apikey}&text=${args}`,
						},
						caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
					},
					{ quoted: m },
				);
				break;

			case "shadow":
			case "cup":
			case "cup1":
			case "romance":
			case "smoke":
			case "burnpaper":
			case "lovemessage":
			case "undergrass":
			case "love":
			case "coffe":
			case "woodheart":
			case "woodenboard":
			case "summer3d":
			case "wolfmetal":
			case "nature3d":
			case "underwater":
			case "golderrose":
			case "summernature":
			case "letterleaves":
			case "glowingneon":
			case "fallleaves":
			case "flamming":
			case "harrypotter":
			case "carvedwood":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 12;
				newReply(`🚩 12 Limit Used`);
				if (args.length == 0)
					return newReply(`Example: ${prefix + command} AdrianTzy`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${apikey}&text=${args}`,
						},
						caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
					},
					{ quoted: m },
				);
				break;

			// Text Prome
			case "pornhub":
			case "glitch":
			case "avenger":
			case "space":
			case "ninjalogo":
			case "marvelstudio":
			case "lionlogo":
			case "wolflogo":
			case "steel3d":
			case "wallgravity":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 15;
				newReply(`🚩 15 Limit Used`);
				if (args.length == 0)
					return newReply(`Example: ${prefix + command} AdrianTzy`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${apikey}&text1=${args[0]}&text2=${args[1]}`,
						},
						caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
					},
					{ quoted: m },
				);
				break;

			case "blackpink":
			case "neon":
			case "greenneon":
			case "advanceglow":
			case "futureneon":
			case "sandwriting":
			case "sandsummer":
			case "sandengraved":
			case "metaldark":
			case "neonlight":
			case "holographic":
			case "text1917":
			case "minion":
			case "deluxesilver":
			case "newyearcard":
			case "bloodfrosted":
			case "halloween":
			case "jokerlogo":
			case "fireworksparkle":
			case "natureleaves":
			case "bokeh":
			case "toxic":
			case "strawberry":
			case "box3d":
			case "roadwarning":
			case "breakwall":
			case "icecold":
			case "luxury":
			case "cloud":
			case "summersand":
			case "horrorblood":
			case "thunder":
				if (!isPremium && global.db.data.users[m.sender].limit < 1)
					return newReply(mess.endLimit); // respon ketika limit habis
				db.data.users[m.sender].limit -= 12;
				newReply(`🚩 12 Limit Used`);
				if (args.length == 0)
					return newReply(`Example: ${prefix + command} AdrianTzy`);
				newReply(mess.wait);
				conn.sendMessage(
					m.chat,
					{
						image: {
							url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${apikey}&text=${args}`,
						},
						caption: `Created By AdrianTzy\n\n Type: ${command}\n\nText: ${args}`,
					},
					{ quoted: m },
				);
				break;

			case "akira":
			case "akiyama":
			case "ana":
			case "asuna":
			case "ayuzawa":
			case "boruto":
			case "chitoge":
			case "deidara":
			case "doraemon":
			case "elaina":
			case "emilia":
			case "erza":
			case "gremory":
			case "hestia":
			case "hinata":
			case "inori":
			case "isuzu":
			case "itachi":
			case "itori":
			case "kaga":
			case "kagura":
			case "kakasih":
			case "kaori":
			case "keneki":
			case "kotori":
			case "kurumi":
			case "loli":
			case "madara":
			case "mikasa":
			case "miku":
			case "minato":
			case "naruto":
			case "nezuko":
			case "onepiece":
			case "pokemon":
			case "rize":
			case "sagiri":
			case "sakura":
			case "sasuke":
			case "shina":
			case "shinka":
			case "shizuka":
			case "shota":
			case "toukachan":
			case "tsunade":
			case "yuki":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 5;
					newReply(`🚩 5 Limit Used`);
					newReply(mess.wait);
					let anu = await fetchJson(
						`https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Random%20Anime/${command}.json`,
					);
					result = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{ image: { url: result }, caption: mess.done },
						{ quoted: m },
					);
				}
				break;
			case "aesthetic":
			case "anjing":
			case "blankpink":
			case "boneka":
			case "darkjokes":
			case "hekel":
			case "justina":
			case "kpop":
			case "kucing":
			case "mobil":
			case "motor":
			case "pubg":
			case "rose":
			case "ryujin":
			case "wallhp":
				{
					newReply(mess.wait);
					let anu = await fetchJson(
						`https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Random%20Image/${command}.json`,
					);
					result = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{ image: { url: result }, caption: mess.done },
						{ quoted: m },
					);
				}
				break;
			case "cyberspace":
			case "mountain":
			case "programming":
			case "technology":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 5;
					newReply(`🚩 5 Limit Used`);
					newReply(mess.wait);
					let anu = await fetchJson(
						`https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Wallpaper/${command}.json`,
					);
					result = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{ image: { url: result }, caption: mess.done },
						{ quoted: m },
					);
				}
				break;
			case "cecan":
			case "china":
			case "cogan":
			case "indonesia":
			case "japan":
			case "korea":
			case "malaysia":
			case "thailand":
			case "vietnam":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 10;
					newReply(`🚩 10 Limit Used`);
					newReply(mess.wait);
					let anu = await fetchJson(
						`https://raw.githubusercontent.com/Abuzzpoet/Databasee/main/Cecan/${command}.json`,
					);
					result = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{ image: { url: result }, caption: mess.done },
						{ quoted: m },
					);
				}
				break;
			case "couple":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 10;
					newReply(`🚩 10 Limit Used`);
					let anu = await fetchJson(
						"https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json",
					);
					newReply(mess.wait);
					let random = anu[Math.floor(Math.random() * anu.length)];
					conn.sendMessage(
						m.chat,
						{
							image: {
								url: random.male,
							},
							caption: `Couple Male`,
						},
						{
							quoted: m,
						},
					);
					conn.sendMessage(
						m.chat,
						{
							image: {
								url: random.female,
							},
							caption: `Couple Female`,
						},
						{
							quoted: m,
						},
					);
				}
				break;

			case "tohd":
			case "remini":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 50;
					newReply(`🚩 50 Limit Used`);
					newReply(mess.wait);
					if (isMedia) {
						const media =
							await conn.downloadAndSaveMediaMessage(quoted);
						const anu = await TelegraPh(media);
						await conn.sendMessage(
							m.chat,
							{
								image: {
									url: `https://api.itsrose.site/image/unblur?url=${anu}&apikey=${rosekey}`,
								},
								caption: `Sukses membuat hd`,
							},
							{ quoted: m },
						);
					} else {
						newReply("Reply gambar nya bang");
					}
				}
				break;

			case "jadianime":
				{
					if (!isPremium && global.db.data.users[m.sender].limit < 1)
						return newReply(mess.endLimit); // respon ketika limit habis
					db.data.users[m.sender].limit -= 50;
					newReply(`🚩 50 Limit Used`);
					newReply(mess.wait);
					if (isMedia) {
						const media =
							await conn.downloadAndSaveMediaMessage(quoted);
						const anu = await TelegraPh(media);
						await conn.sendMessage(
							m.chat,
							{
								image: {
									url: `https://api.lolhuman.xyz/api/imagetoanime?apikey=${apikey}&img=${anu}`,
								},
								caption: mess.done,
							},
							{ quoted: m },
						);
					} else {
						newReply("Reply gambar nya bang");
					}
				}
				break;

			case "nomerhoki":
			case "nomorhoki":
			case "menu":
				let menunya = `
  ☍ *Mode:* ${conn.public ? "Public-Mode 👥" : "Self-Mode 👤"}
  ☍ *Tanggal:* ${hariini}
  ☍ *Jam*: ${wib}
  ☍ *Baileys:*: npm:baileysv2@9.0.2
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total User:* ${Object.keys(global.db.data.users).length}
  ☍ *Total Fitur:* ${totalFitur()}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split("@")[0]}
   ☍ *Status:* ${isCreator ? "Owner" : "User"}
   ☍ *User:* ${isPremium ? "Premium" : "Gratisan"}
   ${readmore}
乂 *O W N E R  M E N U*
◇ ‣ ${prefix}pushkontak *<text>*
◇ ‣ ${prefix}autoread *<on/off>*
◇ ‣ ${prefix}autobio *<on/off>*
◇ ‣ ${prefix}bcgc *<text>*
◇ ‣ ${prefix}bc *<text>*
◇ ‣ ${prefix}lockcmd *<text>*
◇ ‣ ${prefix}addprem *<@user>*
◇ ‣ ${prefix}delprem *<@user>*
◇ ‣ ${prefix}addvn *<sound>*
◇ ‣ ${prefix}delvn *<sound>*
◇ ‣ ${prefix}join *<link>*
◇ ‣ ${prefix}leave *only group*
◇ ‣ ${prefix}setexif *<package | author>*
◇ ‣ ${prefix}setppbot *<reply | caption>*
◇ ‣ ${prefix}setppbot full *<reply | caption>*
◇ ‣ ${prefix}setnamabot *<text>*
◇ ‣ ${prefix}setbiobot *<text>*
◇ ‣ ${prefix}block *<@user>*
◇ ‣ ${prefix}unblock *<@user>*
◇ ‣ ${prefix}ambilsesi
◇ ‣ ${prefix}ambilcase
◇ ‣ ${prefix}listpc
◇ ‣ ${prefix}listgc
◇ ‣ ${prefix}public
◇ ‣ ${prefix}self
◇ ‣ ${prefix}myip
◇ ‣ ${prefix}chat 
◇ ‣ ${prefix}shutdown
◇ ‣  >
◇ ‣  =>

乂 *C O N V E R T  M E N U*
◇ ‣ ${prefix}stiker *<image>*
◇ ‣ ${prefix}swm *<image>*
◇ ‣ ${prefix}smeme *<image>*
◇ ‣ ${prefix}emojimix *<😫>*
◇ ‣ ${prefix}emojimix2 *<😫+🥶>*
◇ ‣ ${prefix}toimage *<reply sticker>*
◇ ‣ ${prefix}tomp4 *<reply sticker>*
◇ ‣ ${prefix}toaudio *<video>*
◇ ‣ ${prefix}tomp3 *<video>*
◇ ‣ ${prefix}tovn *<video>*
◇ ‣ ${prefix}togif *<image>*
◇ ‣ ${prefix}tourl *<media>*

乂 *S T A L K E R  M E N U*
◇ ‣ ${prefix}igstalk *<username>*
◇ ‣ ${prefix}ghstalk *<username>*

乂 *G R O U P  M E N U*
◇ ‣ ${prefix}kick *<@user>*
◇ ‣ ${prefix}add *<@user>*
◇ ‣ ${prefix}culik *<@user>*
◇ ‣ ${prefix}promote *<@user>*
◇ ‣ ${prefix}demote *<@user>*
◇ ‣ ${prefix}setname *<text>*
◇ ‣ ${prefix}setdesc *<text>*
◇ ‣ ${prefix}setppgc *<reply | caption>*
◇ ‣ ${prefix}tagall *<text>*
◇ ‣ ${prefix}hidetag *<text>*
◇ ‣ ${prefix}totag *<text>*
◇ ‣ ${prefix}group *<close/open>*
◇ ‣ ${prefix}editinfo *<text>*
◇ ‣ ${prefix}mutegc
◇ ‣ ${prefix}ephemeral
◇ ‣ ${prefix}linkgc 
◇ ‣ ${prefix}revoke
◇ ‣ ${prefix}liston

乂 *F U N   M E N U*
◇ ‣ ${prefix}wangy *<text>*
◇ ‣ ${prefix}halah *<text>*
◇ ‣ ${prefix}hilih *<text>*
◇ ‣ ${prefix}huluh *<text>*
◇ ‣ ${prefix}heleh *<text>*
◇ ‣ ${prefix}holoh *<text>*
   
乂 *M A I N  M E N U*
◇ ‣ ${prefix}owner
◇ ‣ ${prefix}ping
◇ ‣ ${prefix}menu
◇ ‣ ${prefix}speedtest
◇ ‣ ${prefix}script
◇ ‣ ${prefix}tqto
◇ ‣ ${prefix}runtime
◇ ‣ ${prefix}ceklimit
◇ ‣ ${prefix}buyprem
◇ ‣ ${prefix}totalfitur

乂 *D A T A  M E N U*
◇ ‣ ${prefix}setcmd [reply sticker/pesan]
◇ ‣ ${prefix}listcmd
◇ ‣ ${prefix}delcmd [reply sticker/pesan]
◇ ‣ ${prefix}lockcmd
◇ ‣ ${prefix}addmsg
◇ ‣ ${prefix}listmsg
◇ ‣ ${prefix}getmsg
◇ ‣ ${prefix}delmsg

乂 *C R E A T O R  I M A G E*
◇ ‣ ${prefix}qc *<text>*

乂 *D O W N  M E N U*
◇ ‣ ${prefix}gitclone *<link>*`;
				conn.sendMessage(
					m.chat,
					{
						image: fs.readFileSync("./media/menu.jpg"),
						caption: menunya,
					},
					{
						quoted: fkontak,
					},
				);
				break;

			default:
				if (budy.startsWith("=>")) {
					if (!isCreator) return newReply(mess.owner);

					function Return(sul) {
						sat = JSON.stringify(sul, null, 2);
						bang = util.format(sat);
						if (sat == undefined) {
							bang = util.format(sul);
						}
						return newReply(bang);
					}
					try {
						newReply(
							util.format(
								eval(
									`(async () => { return ${budy.slice(
										3,
									)} })()`,
								),
							),
						);
					} catch (e) {
						newReply(String(e));
					}
				}

				if (budy.startsWith(">")) {
					if (!isCreator) return newReply(mess.owner);
					try {
						let evaled = await eval(budy.slice(2));
						if (typeof evaled !== "string")
							evaled = require("util").inspect(evaled);
						await newReply(evaled);
					} catch (err) {
						await newReply(String(err));
					}
				}

				if (budy.startsWith("$")) {
					if (!isCreator) return newReply(mess.owner);
					exec(budy.slice(2), (err, stdout) => {
						if (err) return newReply(err);
						if (stdout) return newReply(stdout);
					});
				}

				if (isCmd && budy.toLowerCase() != undefined) {
					if (m.chat.endsWith("broadcast")) return;
					if (m.isBaileys) return;
					let msgs = global.db.data.database;
					if (!(budy.toLowerCase() in msgs)) return;
					conn.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
				}
		}
	} catch (err) {
		console.log("Eror Di Bagian rizeyy.js " + util.format(err));
	}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update ${__filename}`));
	delete require.cache[file];
	require(file);
});
